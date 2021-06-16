import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//Router
import VueRouter from 'vue-router'
import router from './router'
//Vue-x
import store from './stores/index'
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueRouter)
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')