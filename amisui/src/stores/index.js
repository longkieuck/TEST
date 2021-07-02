import Vue from "vue";
import Vuex from "vuex";
import supplier from './modules/supplier'
import account from './modules/account'
import payment from './modules/payment'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        supplier,
        account,
        payment
    }
});