import Vue from 'vue'
import VueRouter from 'vue-router'
import CryptoList from '@/components/CryptoList'
import NotFound from '@/components/NotFound'
import CryptoDetail from '@/components/CryptoDetail'
Vue.use(VueRouter)

const routes = [
    {path:'/', component: CryptoList},
    {path:'/:slug', component: CryptoDetail, props:true},
    {path:'*', component: NotFound},
]

export default new VueRouter({
    mode: 'history',
    routes
})