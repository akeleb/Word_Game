import Vue from 'vue'
import VueRouter from 'vue-router'
import start from '../components/start'
import gamePage from '../components/gamePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: start
  },

  {
    path: '/gameStarted',
    name: 'gamePage',
    component: gamePage
  },


]

const router = new VueRouter({
  routes
})

export default router
