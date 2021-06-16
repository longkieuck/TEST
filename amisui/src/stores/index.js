import Vue from "vue";
import Vuex from "vuex";
import supplier from './modules/supplier'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        supplier
    }
});