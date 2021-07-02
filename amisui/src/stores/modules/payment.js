import axios from 'axios'
import { BASE_URL, InitPayment } from '../../configs/constants'
const state = {
    payments: [],
    payment: {...InitPayment },
    pageIndex: 1,
    pageSize: 20,
    filter: "",
    totalPages: 0,
    totalRecords: 0,
    totalMoney: 0
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
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}