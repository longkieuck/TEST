import axios from 'axios'
import { BASE_URL, InitPayment, PaymentConstant } from '../../configs/constants'
const state = {
    payments: [], //Danh sách phiếu chi đang hiển thị
    suppliers: [], //Danh sách nhà cung cấp cho cbb đối tượng
    payment: {...InitPayment }, //Phiếu chi đang được lựa chọn
    pageIndex: 1, //Trang hiện tại
    pageSize: 20, //Số bản ghi/trang
    filter: "", //Điều kiện lọc
    totalPages: 0, //Tổng số trang
    totalRecords: 0, //Tổng số bản ghi
    totalMoney: 0, //Tổng tiền
    account: [], //Danh sách tài khoản
    paymentFormMode: PaymentConstant.IS_CLOSE, //FormMode
}
const actions = {
    /**
     * Lấy dữ liệu hiển thị
     * CreatedBy KDLong 01/07/2021
     */
    getPayments(context) {
        axios.get(BASE_URL +
                'Payments/Filter?page_index=' + context.state.pageIndex +
                '&page_size=' + context.state.pageSize +
                '&fil=' + context.state.filter)
            .then(res => {
                context.dispatch("getTotalMoney")
                context.commit("getPayments", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy mã phiếu chi mới
     * CreatedBy KDLong 01/07/2021
     */
    getNewPaymentCode({ commit }) {

        axios.get(BASE_URL + 'Payments/NewPaymentCode')
            .then(res => {
                commit("getNewPaymentCode", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy phiếu chi theo id
     * CreatedBy KDLong 01/07/2021
     */
    getPaymentById({ commit }, payload) {
        axios.get(BASE_URL + 'Payments/' + payload.payment_id)
            .then(res => {
                commit("getPaymentById", res.data)
                payload.callbackSuccess()
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy danh sách đối tượng
     * CreatedBy KDLong 01/07/2021
     */
    getSuppliers(context) {
        axios.get(BASE_URL + "Suppliers")
            .then(res => {
                context.commit("getSuppliers", res.data)

            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy tổng tiền theo filter
     * CreatedBy KDLong 01/07/2021
     */
    getTotalMoney(context) {
        axios.get(BASE_URL +
                'Payments/TotalMoney?page_index=' + context.state.pageIndex +
                '&page_size=' + context.state.pageSize +
                '&fil=' + context.state.filter)
            .then(res => {
                context.state.totalMoney = res.data
            })
            .catch(() => console.log("error"))
    },
    /**
     * Thay đổi trang
     * CreatedBy KDLong 01/07/2021
     */
    changePageIndex(context, value) {
        context.state.pageIndex = value
        context.dispatch('getPayments')
    },
    /**
     * Thay đổi số bản ghi/trang
     * CreatedBy KDLong 01/07/2021
     */
    changePageSize(context, value) {
        context.state.pageSize = value
        context.state.pageIndex = 1
        context.dispatch('getPayments')
    },
    /**
     * Thay đổi điều kiện lọc
     * CreatedBy KDLong 01/07/2021
     */
    changeFilter(context, value) {
        context.state.filter = value
        context.state.pageSize = 20
        context.state.pageIndex = 1
        context.dispatch('getPayments')
    },
    /**
     * Lấy danh sách tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    getAccount(context) {
        axios.get(BASE_URL + "Accounts")
            .then(res => {
                context.commit("getAccount", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * show form thêm
     * CreatedBy KDLong 01/07/2021
     */
    showFormAdd(context) {
        context.commit("showFormAdd")
    },
    /**
     * show form sửa
     * CreatedBy KDLong 01/07/2021
     */
    showFormEdit(context) {
        context.commit("showFormEdit")
    },
    /**
     * show form xem
     * CreatedBy KDLong 01/07/2021
     */
    showFormReadOnly(context) {
        context.commit("showFormReadOnly")
    },
    /**
     * show form nhân bản
     * CreatedBy KDLong 01/07/2021
     */
    showFormClone(context) {
        context.state.paymentFormMode = PaymentConstant.IS_CLONE
    },
    /**
     * lấy mã phiếu chi mới cho sự kiện nhân bản
     * CreatedBy KDLong 01/07/2021
     */
    getNewPaymentCodeForClone(context) {
        axios.get(BASE_URL + 'Payments/NewPaymentCode')
            .then(res => {
                context.state.payment.payment_code = res.data
            })
            .catch(() => console.log("error"))
    },
    /**
     * Thêm phiếu chi
     * CreatedBy KDLong 01/07/2021
     */
    postPayment(context, payload) {
        axios.post(BASE_URL + 'Payments', context.state.payment)
            .then(() => {
                context.dispatch('getPayments')
                    // context.commit("closeForm")
                payload.callbackSuccess()
            })
            .catch(() => {

                // context.commit("closeForm")
                payload.callbackFail()
            })
    },
    /**
     * Sửa phiếu chi
     * CreatedBy KDLong 01/07/2021
     */
    putPayment(context, payload) {
        axios.put(BASE_URL + 'Payments', context.state.payment)
            .then(() => {
                context.dispatch('getPayments')
                    // context.commit("closeForm")
                payload.callbackSuccess()
            })
            .catch(() => {

                // context.commit("closeForm")
                payload.callbackFail()
            })
    },
    /**
     * Xoá phiếu chi
     * CreatedBy KDLong 01/07/2021
     */
    deletePayment(context, payload) {
        axios.delete(BASE_URL + 'Payments/' + payload.payment_id)
            .then(() => {
                if (context.state.payments.length == 1) {
                    context.state.pageIndex = context.state.pageIndex - 1
                    context.dispatch('getPayments')
                    payload.callbackSuccess()
                } else {
                    context.dispatch('getPayments')
                    payload.callbackSuccess()
                }
            })
            .catch(() => {
                this.getPayments()
                payload.callbackFail()
            })
    },
    /**
     * Chuyển từ frm xem thanh sửa
     * CreatedBy KDLong 01/07/2021
     */
    changeFormMode(context) {

        context.commit("changeFormMode")
    },
    /**
     * Lấy mã mới chi sự kiện mã trùng
     * CreatedBy KDLong 01/07/2021
     */
    getNewPaymentCodeForCodeExist(context, callback) {
        axios.get(BASE_URL + 'Payments/NewPaymentCode')
            .then(res => {
                context.state.payment.payment_code = res.data
                callback()
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy id đối tượng vừa thêm phục vụ cho chuyển form mode
     * CreatedBy KDLong 07/07/2021
     */
    getPaymentIdByCode(context, callback) {
        axios.get(BASE_URL + 'Payments/PaymentIdByCode?payment_code=' + context.state.payment.payment_code)
            .then(res => {
                context.state.payment.payment_id = res.data
                callback(res.data)
            })
            .catch(() => console.log("error"))
    }
}
const mutations = {
    getPayments: (state, data) => {
        if (data == "") {
            state.payments = []
            state.totalRecords = 0
            state.totalPages = 0
        } else {
            state.payments = data.data
            state.totalRecords = data.totalRecords
            state.totalPages = data.totalPages
        }
    },
    getNewPaymentCode: (state, data) => {
        state.payment = {...InitPayment }
        state.payment.payment_code = data
    },
    getSuppliers: (state, data) => {
        state.suppliers = []
        data.forEach(e => {
            state.suppliers.push({
                supplier_id: e.supplier_id,
                supplier_type: e.supplier_type,
                legal_representative: e.legal_representative,
                supplier_code: e.supplier_code,
                supplier_name: e.supplier_name,
                tax_code: e.tax_code,
                address: e.address,
                phone_number: e.phone_number
            })
        });
    },
    getPaymentById: (state, data) => {
        state.payment = data
    },
    getAccount: (state, data) => {
        state.account = []
        data.forEach(e => {
            state.account.push({
                account_id: e.account_id,
                account_code: e.account_code,
                account_name: e.account_name
            })
        });
    },
    showFormAdd: (state) => {
        state.paymentFormMode = PaymentConstant.IS_ADD
    },
    showFormEdit: (state) => {
        state.paymentFormMode = PaymentConstant.IS_EDIT
    },
    showFormReadOnly: (state) => {
        state.paymentFormMode = PaymentConstant.IS_READ_ONLY
    },
    changeFormMode: (state) => {
        state.paymentFormMode = PaymentConstant.IS_EDIT
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}