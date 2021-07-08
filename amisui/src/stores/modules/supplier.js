import axios from 'axios'
import { BASE_URL, InitSupplier, SupplierConstant } from '../../configs/constants'
const state = {
    suppliers: [],
    supplier: {...InitSupplier },
    supplierFormMode: SupplierConstant.IS_CLOSE,
    pageIndex: 1,
    pageSize: 20,
    filter: "",
    totalPages: 0,
    totalRecords: 0
}
const actions = {
    getSuppliers(context) {
        axios.get(BASE_URL +
                'Suppliers/Filter?page_index=' + context.state.pageIndex +
                '&page_size=' + context.state.pageSize +
                '&fil=' + context.state.filter)
            .then(res => {
                context.commit("getSuppliers", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    getNewSupplierCode({ commit }) {
        axios.get(BASE_URL + 'Suppliers/NewSupplierCode')
            .then(res => {
                commit("getNewSupplierCode", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
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
    deleteSupplier(context, payload) {
        axios.delete(BASE_URL + 'Suppliers/' + payload.supplier_id)
            .then(() => {
                context.dispatch('getSuppliers')
                payload.callbackSuccess()
            })
            .catch(() => {
                this.getSuppliers()
                payload.callbackFail()
            })
    },
    showFormAdd(context) {
        context.state.supplier = {...InitSupplier }
        context.dispatch('getNewSupplierCode')
        context.commit("showFormAdd")
    },
    showFormEdit({ commit }, supplier) {
        commit("showFormEdit", supplier)
    },
    showFormReadOnly({ commit }, supplier) {
        commit("showFormReadOnly", supplier)
    },
    closeForm({ commit }) {
        commit("closeForm")
    },
    changePageIndex(context, value) {
        context.state.pageIndex = value
        context.dispatch('getSuppliers')
    },
    changePageSize(context, value) {
        context.state.pageSize = value
        context.dispatch('getSuppliers')
    },
    changeFilter(context, value) {
        context.state.filter = value
        context.state.pageSize = 20
        context.state.pageIndex = 1
        context.dispatch('getSuppliers')
    },
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