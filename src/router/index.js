import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
		component: () => import(/* webpackChunkName: 'home' */ '../views/Home.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import(/* webpackChunkName: 'blogs' */ '../views/Blogs.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
		component: () => import(/* webpackChunkName: 'blogs' */ '../views/Blog.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
