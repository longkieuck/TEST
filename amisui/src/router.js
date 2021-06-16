import AccountList from "../src/views/AccountList"
import PaymentList from "../src/views/PaymentList"
import SupplierList from "../src/views/SupplierList"
import Home from "../src/views/Home"
import PaymentInfo from "../src/components/dialogs/PaymentInfo"
import VueRouter from "vue-router"

const routes = [
    { path: '/account', component: AccountList },
    {
        path: '/payment',
        component: PaymentList,
        children: [
            { path: 'paymentinfo/:id?', component: PaymentInfo },
        ]
    },
    { path: '/supplier', component: SupplierList },
    { path: '/', component: Home }
]
export default new VueRouter({
    routes
})