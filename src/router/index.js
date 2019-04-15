import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import LogOut from '@/components/LogOut'
import UserProfile from '@/components/UserProfile'
import Postings from '@/components/Postings'
import Booklist from '@/components/Booklist'
import Posts from '@/components/Posts'
import AddPost from '@/components/AddPost'
import Contact from '@/components/Contact'
import OtherProfile from '@/components/OtherProfile'
import Booksearch from '@/components/Booksearch'
import Bookpreview from '@/components/Bookpreview'
import ContactMessage from '@/components/ContactMessage'
import blog from '@/components/blog'
import OrderManage from '@/components/OrderManage'
import OrderBag from '@/components/OrderBag'
import $ from 'jquery'


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
      path: '/otherprofile',
      name: 'OtherProfile',
      component: OtherProfile
    },

    {
      path: '/douban',
      name: 'Postings',
      component: Postings
    },
    {
      path: '/addpost',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/postcontent',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/booklist',
      name: 'Booklist',
      component: Booklist
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/contactmessage',
      name: 'ContactMessage',
      component: ContactMessage
    },
    {
		  path: '/books',
		  name: 'Booksearch',
		  component: Booksearch
		},
		{
		  path: '/bookPreview',
		  name: 'Bookpreview',
		  component: Bookpreview
		},
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/ordermanage',
      name: 'OrderManage',
      component: OrderManage
    },
    {
      path: '/orderbag',
      name: 'OrderBag',
      component: OrderBag
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

