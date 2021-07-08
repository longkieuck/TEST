import axios from 'axios'
import { BASE_URL, InitAccount, AccountConstant } from '../../configs/constants'
const state = {
    accounts: [],
    account: {...InitAccount },
    accountFormMode: AccountConstant.IS_CLOSE,
    parentIdList: [],
    totalRecords: 0,
    parentAccount: []
}
const actions = {
    getAccounts(context) {
        context.dispatch("getParentIdList")
        context.dispatch("getTotalRecord")
        axios.get(BASE_URL + "Accounts/All")
            .then(res => {
                context.commit("getAccounts", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    getParentIdList(context) {
        axios.get(BASE_URL + "Accounts/ParentIdList")
            .then(res => {
                context.commit("getParentIdList", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    getTotalRecord(context) {
        axios.get(BASE_URL + "Accounts/TotalRecord")
            .then(res => {
                context.commit("getTotalRecord", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    getParentAccount(context) {
        axios.get(BASE_URL + "Accounts")
            .then(res => {
                context.commit("getParentAccount", res.data)
            })
            .catch(() => alert("Connection failure!"))
    },
    showFormAdd(context) {
        context.dispatch("getParentAccount")
        context.commit("showFormAdd")
    },
    showFormEdit(context, account) {
        context.commit("showFormEdit", account)
    },
    closeForm({ commit }) {
        commit("closeForm")
    },
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
        state.accountFormMode = AccountConstant.IS_ADD
    },
    showFormEdit: (state, account) => {
        state.account = {...account }
        state.accountFormMode = AccountConstant.IS_EDIT
    },
    closeForm: (state) => {
        state.accountFormMode = AccountConstant.IS_CLOSE
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}