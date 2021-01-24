import Vue from 'vue'
import VueRouter from 'vue-router'
import SplashPage from '@/views/SplashPage.vue'

Vue.use(VueRouter)

// lazy load components when route is visited
const onLoad = C => () => import(`@/views/${C}`)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/',     name: 'Home', component: SplashPage },
    { path: '/docs', name: 'Docs', component: onLoad('Overviews.vue') },
    { path: '/dash', name: 'Dash', component: onLoad('Dashboard.vue') }
  ]
})
