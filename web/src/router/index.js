import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Login from '../views/Login/Login'
import Register from '../views/Register/Register'
import Dashboard from '../views/Dashboard/Dashboard'
import Trainings from '../views/Trainings/Trainings'
import Account from '../views/Account/Account'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/trainings',
    name: 'trainings',
    component: Trainings,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '*',
    redirect: '/dashboard',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  store.dispatch('getUser')
  if (
    to.name !== 'login' &&
    to.name !== 'register' &&
    !store.state.user.token
  ) {
    next({ name: 'login' })
  } else next()
})

export default router
