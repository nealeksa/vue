import Vue from 'vue'
import VueRouter from 'vue-router'
import Orderlist from '../views/OrderList.vue'
import Order from '../views/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Orderlist',
    component: Orderlist
  },
  {
    path: '/order/:Pid',
    name: 'order',
    component: Order
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
