import axios from 'axios'
import { BASE_URL, InitAccount, AccountConstant } from '../../configs/constants'
const state = {
    accounts: [], //Danh sách tài khoản hiển thị
    account: {...InitAccount }, //Tài khoản được chọn
    accountFormMode: AccountConstant.IS_CLOSE, //FormMode
    parentIdList: [], //Danh sách id của các tài khoản cha
    totalRecords: 0, //Tổng số bản ghi
    parentAccount: [], //Tài khoản tổng hợp
    parentIdSelected: null //Id của tài khoản tổng hợp
}
const actions = {
    /**
     * Lấy data để hiển thị
     * CreatedBy KDLong 01/07/2021
     */
    getAccounts(context) {
        context.dispatch("getParentIdList")
        context.dispatch("getTotalRecord")
        axios.get(BASE_URL + "Accounts/All")
            .then(res => {
                context.commit("getAccounts", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy danh sách tài khoản có con
     * CreatedBy KDLong 01/07/2021
     */
    getParentIdList(context) {
        axios.get(BASE_URL + "Accounts/ParentIdList")
            .then(res => {
                context.commit("getParentIdList", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy tổng số bản ghi
     * CreatedBy KDLong 01/07/2021
     */
    getTotalRecord(context) {
        axios.get(BASE_URL + "Accounts/TotalRecord")
            .then(res => {
                context.commit("getTotalRecord", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * Lấy danh sách tài khoản tổng hợp
     * CreatedBy KDLong 01/07/2021
     */
    getParentAccount(context) {
        axios.get(BASE_URL + "Accounts")
            .then(res => {
                context.commit("getParentAccount", res.data)
            })
            .catch(() => console.log("error"))
    },
    /**
     * show form thêm tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    showFormAdd(context) {
        context.dispatch("getParentAccount")
        context.commit("showFormAdd")
    },
    /**
     * show form sửa tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    showFormEdit(context, account) {
        context.commit("showFormEdit", account)
    },
    /**
     * đóng form chi tiết
     * CreatedBy KDLong 01/07/2021
     */
    closeForm({ commit }) {
        commit("closeForm")
    },
    /**
     * thêm tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    postAccount(context, payload) {
        axios.post(BASE_URL + 'Accounts', context.state.account)
            .then(() => {
                context.dispatch('getAccounts')
                context.commit("closeForm")
                payload.callbackSuccess()
            })
            .catch(() => {
                // context.commit("closeForm")
                payload.callbackFail()
            })
    },
    /**
     * sửa tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    putAccount(context, payload) {
        axios.put(BASE_URL + 'Accounts', context.state.account)
            .then(() => {
                context.dispatch('getAccounts')
                context.commit("closeForm")
                payload.callbackSuccess()
            })
            .catch(() => {

                // context.commit("closeForm")
                payload.callbackFail()
            })
    },
    /**
     * Xoá tài khoản
     * CreatedBy KDLong 01/07/2021
     */
    deleteAccount(context, payload) {
        axios.delete(BASE_URL + 'Accounts/' + payload.account_id)
            .then(() => {
                context.dispatch('getAccounts')
                payload.callbackSuccess()
            })
            .catch(() => {
                this.getAccounts()
                payload.callbackFail()
            })
    },
    /**
     * Click lựa chọn tài khoản tổng hợp bên form list
     * CreatedBy KDLong 01/07/2021
     */
    selectParentId(context, parentId) {
        // alert(parentId)
        context.state.parentIdSelected = parentId
    }

}
const mutations = {
    getAccounts: (state, data) => {
        state.accounts = data
    },
    getParentIdList: (state, data) => {
        state.parentIdList = data
    },
    getTotalRecord: (state, data) => {
        state.totalRecords = data
    },
    getParentAccount: (state, data) => {
        state.parentAccount = []
        data.forEach(e => {
            state.parentAccount.push({
                account_id: e.account_id,
                account_code: e.account_code,
                account_name: e.account_name
            })
        });
    },
    showFormAdd: (state) => {
        state.account = {...InitAccount }
        state.account.parent_account_id = state.parentIdSelected
        state.accountFormMode = AccountConstant.IS_ADD
    },
    showFormEdit: (state, account) => {
        state.account = {...account }
        state.accountFormMode = AccountConstant.IS_EDIT
    },
    closeForm: (state) => {
        state.accountFormMode = AccountConstant.IS_CLOSE
        state.parentIdSelected = null
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}