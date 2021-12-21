import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/requests/:id',
    name: 'Responses',
    component: () => import('@/components/Responses.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/donors',
    name: 'Donors',
    component: () => import('../views/Donors.vue')
  },
  {
    path: '/requests',
    name: 'Requests',
    component: () => import('../views/Requests.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/track',
    name: 'Track',
    component: () => import('../views/Track.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
