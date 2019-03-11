import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import LogOut from '@/components/LogOut'
import UserProfile from '@/components/UserProfile'
import Postings from '@/components/Postings'
import Booklist from '@/components/Booklist'

import firebase from 'firebase'

Vue.use(Router);


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/logout',
      name: 'LogOut',
      component: LogOut,
      meta: {
        requireAuth: true
      }
      },
    {
      path: '/userprofile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/douban',
      name: 'Postings',
      component: Postings
    },
    {
      path: '/booklist',
      name: 'Booklist',
      component: Booklist
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.requireAuth)
  if (requireAuth && !currentUser) next('login')
  else next()
})
export default router

