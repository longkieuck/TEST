import axios from 'axios'
import { BASE_URL, InitPayment, PaymentConstant } from '../../configs/constants'
const state = {
    payments: [],
    suppliers: [],
    payment: {...InitPayment },
    pageIndex: 1,
    pageSize: 20,
    filter: "",
    totalPages: 0,
    totalRecords: 0,
    totalMoney: 0,
    account: [],
    paymentFormMode: PaymentConstant.IS_CLOSE,
}
const actions = {
    getPayments(context) {
        axios.get(BASE_URL +
                'Payments/Filter?page_index=' + context.state.pageIndex +
                '&page_size=' + context.state.pageSize +
                '&fil=' + context.state.filter)
            .then(res => {
                context.dispatch("getTotalMoney")
                context.commit("getPayments", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    getNewPaymentCode({ commit }) {
        axios.get(BASE_URL + 'Payments/NewPaymentCode')
            .then(res => {
                commit("getNewPaymentCode", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    getPaymentById({ commit }, payment_id) {
        axios.get(BASE_URL + 'Payments/' + payment_id)
            .then(res => {
                commit("getPaymentById", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    getSuppliers(context) {
        axios.get(BASE_URL + "Suppliers")
            .then(res => {
                context.commit("getSuppliers", res.data)

            })
            .catch(() => alert("Connection failure!"))
    },
    getTotalMoney(context) {
        axios.get(BASE_URL +
                'Payments/TotalMoney?page_index=' + context.state.pageIndex +
                '&page_size=' + context.state.pageSize +
                '&fil=' + context.state.filter)
            .then(res => {
                context.state.totalMoney = res.data
            })
            .catch(() => alert("Connection failure!"))
    },
    changePageIndex(context, value) {
        context.state.pageIndex = value
        context.dispatch('getPayments')
    },
    changePageSize(context, value) {
        context.state.pageSize = value
        context.dispatch('getPayments')
    },
    changeFilter(context, value) {
        context.state.filter = value
        context.state.pageSize = 20
        context.state.pageIndex = 1
        context.dispatch('getPayments')
    },
    getAccount(context) {
        axios.get(BASE_URL + "Accounts")
            .then(res => {
                context.commit("getAccount", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    showFormAdd(context) {
        context.commit("showFormAdd")
    },
    showFormEdit(context) {
        context.commit("showFormEdit")
    },
    showFormReadOnly(context) {
        context.commit("showFormReadOnly")
    },
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
    deletePayment(context, payload) {
        axios.delete(BASE_URL + 'Payments/' + payload.payment_id)
            .then(() => {
                context.dispatch('getPayments')
                payload.callbackSuccess()
            })
            .catch(() => {
                this.getPayments()
                payload.callbackFail()
            })
    },
    changeFormMode(context) {
        context.commit("changeFormMode")
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