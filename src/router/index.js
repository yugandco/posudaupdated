import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Registr from '../views/Registr.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/registr',
    name: 'Registr',
    component: Registr
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue')
  },
  {
    path: '/going-to-cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/add-new-item',
    name: 'AddProduct',
    component: () => import('../views/AddProduct.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
