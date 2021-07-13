import axios from 'axios'
import { BASE_URL, InitSupplier, SupplierConstant } from '../../configs/constants'
const state = {
    suppliers: [], //Danh sách nhà cung cấp
    supplier: {...InitSupplier }, //Nhà cung cấp đang lựa chọn
    supplierFormMode: SupplierConstant.IS_CLOSE, //FormMode
    pageIndex: 1, //Trang hiện tại
    pageSize: 20, //Số bản ghi/trang
    filter: "", //Điều kiện lọc
    totalPages: 0, //Tổng số trang
    totalRecords: 0 //Tổng số bản ghi
}
const actions = {
    /**
     * Lấy dữ liệu hiển thị
     * CreatedBy KDLong 01/07/2021
     */
    getSuppliers(context) {
        axios.get(BASE_URL +
                'Suppliers/Filter?page_index=' + context.state.pageIndex +
                '&page_size=' + context.state.pageSize +
                '&fil=' + context.state.filter)
            .then(res => {
                context.commit("getSuppliers", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy mã ncc mới
     * CreatedBy KDLong 01/07/2021
     */
    getNewSupplierCode({ commit }) {
        axios.get(BASE_URL + 'Suppliers/NewSupplierCode')
            .then(res => {
                commit("getNewSupplierCode", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * Thêm ncc
     * CreatedBy KDLong 01/07/2021
     */
    postSupplier(context, payload) {
        axios.post(BASE_URL + 'Suppliers', context.state.supplier)
            .then(() => {
                context.dispatch('getSuppliers')
                context.dispatch("closeForm")
                payload.callbackSuccess()
            })
            .catch(() => {
                payload.callbackFail()
            })
    },
    /**
     * Sửa ncc
     * CreatedBy KDLong 01/07/2021
     */
    putSupplier(context, payload) {
        axios.put(BASE_URL + 'Suppliers', context.state.supplier)
            .then(() => {
                context.dispatch('getSuppliers')
                context.dispatch("closeForm")
                payload.callbackSuccess()
            })
            .catch(() => {
                payload.callbackFail()
            })
    },
    /**
     * Xoá ncc
     * CreatedBy KDLong 01/07/2021
     */
    deleteSupplier(context, payload) {
        axios.delete(BASE_URL + 'Suppliers/' + payload.supplier_id)
            .then(() => {
                if (context.state.suppliers.length == 1) {
                    context.state.pageIndex = context.state.pageIndex - 1
                    context.dispatch('getSuppliers')
                    payload.callbackSuccess()
                } else {
                    context.dispatch('getSuppliers')
                    payload.callbackSuccess()
                }

            })
            .catch(() => {
                this.getSuppliers()
                payload.callbackFail()
            })
    },
    /**
     * show form thêm
     * CreatedBy KDLong 01/07/2021
     */
    showFormAdd(context) {
        context.state.supplier = {...InitSupplier }
        context.dispatch('getNewSupplierCode')
        context.commit("showFormAdd")
    },
    /**
     * show form sửa
     * CreatedBy KDLong 01/07/2021
     */
    showFormEdit({ commit }, supplier) {
        commit("showFormEdit", supplier)
    },
    /**
     * show form xem
     * CreatedBy KDLong 01/07/2021
     */
    showFormReadOnly({ commit }, supplier) {
        commit("showFormReadOnly", supplier)
    },
    /**
     * đóng form detail
     * CreatedBy KDLong 01/07/2021
     */
    closeForm({ commit }) {
        commit("closeForm")
    },
    /**
     * thay đổi trang hiện tại
     * CreatedBy KDLong 01/07/2021
     */
    changePageIndex(context, value) {
        context.state.pageIndex = value
        context.dispatch('getSuppliers')
    },
    /**
     * thay đổi số bản ghi/trang
     * CreatedBy KDLong 01/07/2021
     */
    changePageSize(context, value) {
        context.state.pageSize = value
        context.state.pageIndex = 1
        context.dispatch('getSuppliers')
    },
    /**
     * thay đổi điều kiện lọc
     * CreatedBy KDLong 01/07/2021
     */
    changeFilter(context, value) {
        context.state.filter = value
        context.state.pageSize = 20
        context.state.pageIndex = 1
        context.dispatch('getSuppliers')
    },
    /**
     * thay đổi chế độ từ xem => sửa
     * CreatedBy KDLong 01/07/2021
     */
    changeFormMode(context, callback) {
        context.state.supplierFormMode = SupplierConstant.IS_EDIT
        callback()
    }
}
const mutations = {
    getSuppliers: (state, data) => {
        if (data == "") {
            state.suppliers = []
            state.totalRecords = 0
            state.totalPages = 0
        } else {
            state.suppliers = data.data
            state.totalRecords = data.totalRecords
            state.totalPages = data.totalPages
        }
    },
    getNewSupplierCode: (state, data) => {
        state.supplier = {...InitSupplier }
        state.supplier.supplier_code = data
    },
    showFormAdd: (state) => {
        state.supplierFormMode = SupplierConstant.IS_ADD
    },
    showFormEdit: (state, supplier) => {
        state.supplier = {...supplier }
        state.supplierFormMode = SupplierConstant.IS_EDIT
    },
    showFormReadOnly: (state, supplier) => {
        state.supplier = {...supplier }
        state.supplierFormMode = SupplierConstant.IS_READ_ONLY
    },
    closeForm: (state) => {
        state.supplierFormMode = SupplierConstant.IS_CLOSE
        state.supplier = {...InitSupplier }
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}