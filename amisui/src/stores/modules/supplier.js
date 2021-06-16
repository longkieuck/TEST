import axios from 'axios'
import { BASE_URL, InitSupplier, SupplierConstant } from '../../configs/constants'
const state = {
    suppliers: [],
    supplier: {...InitSupplier },
    supplierFormMode: SupplierConstant.IS_CLOSE
}
const actions = {
    getSuppliers({ commit }) {
        axios.get(BASE_URL + 'Suppliers')
            .then(res => {
                commit("getSuppliers", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    postSupplier(context) {
        axios.post(BASE_URL + 'Suppliers', context.state.supplier)
            .then(() => {
                alert("Thêm thành công!")
                context.dispatch('getSuppliers')
                context.commit("closeForm")
            })
            .catch(() => {
                alert("Thêm thất bại!")
                context.commit("closeForm")
            })
    },
    putSupplier(context) {
        axios.put(BASE_URL + 'Suppliers', context.state.supplier)
            .then(() => {
                alert("Sửa thành công!")
                context.commit("closeForm")
            })
            .catch(() => {
                alert("Sửa thất bại!")
                context.commit("closeForm")
            })
    },
    deleteSupplier(context, supplier_id) {
        axios.delete(BASE_URL + 'Suppliers/' + supplier_id)
            .then(() => {
                alert("Xoá thành công!")
                context.dispatch('getSuppliers')
            })
            .catch(() => {
                this.getSuppliers()
                alert("Xoá thất bại!")
            })
    },
    showFormAdd({ commit }) {
        commit("showFormAdd")
    },
    showFormEdit({ commit }, supplier) {
        commit("showFormEdit", supplier)
    },
    closeForm({ commit }) {
        commit("closeForm")
    }
}
const mutations = {
    getSuppliers: (state, data) => {
        state.suppliers = data
    },
    showFormAdd: (state) => {
        state.supplierFormMode = SupplierConstant.IS_ADD
    },
    showFormEdit: (state, supplier) => {
        state.supplier = supplier
        state.supplierFormMode = SupplierConstant.IS_EDIT
    },
    closeForm: (state) => {
        state.supplierFormMode = SupplierConstant.IS_CLOSE
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}