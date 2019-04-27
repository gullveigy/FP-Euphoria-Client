<template>
  <div id="app" @mousemove="mouseMove">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Euphoria</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/books"><i class="fa fa-list" style="padding: 5px"> Books</i></b-nav-item>
          <b-nav-item to="/douban"><i class="fa fa-money" style="padding: 5px"> Forum</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/ordermanage"
            v-if="userInfo && userInfo.usertype === 'admin'" 
          >
            <i class="fa fa-file-text" style="padding: 5px"> OrderManage</i>
          </b-nav-item>
          <b-nav-item to="/contactmessage"
            v-if="userInfo && userInfo.usertype === 'admin'" 
          >
            <i class="fa fa-commenting" style="padding: 5px"> ContactMessage</i>
          </b-nav-item>
          <b-nav-item to="/purchased"><i class="fa fa-shopping-cart" style="padding: 5px"> Purchased</i></b-nav-item>
          <b-nav-item to="/orderbag"><i class="fa fa-shopping-cart" style="padding: 5px"> OrderBag</i></b-nav-item>
          <b-nav-item to="/userprofile"><i class="fa fa-info" style="padding: 5px"> Personal</i></b-nav-item>
          <b-nav-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item><i class="fa fa-sign-out" style="padding: 5px" @click="Logout"> Logout </i></b-nav-item>
          <img v-if="userInfo && userInfo.avatar" class="avatar" :src="avatarBaseUrl + '/images/' + userInfo.avatar" alt="Ash">
          <i v-else class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>

import firebase from 'firebase'
import userservice from "@/services/userservice";
import { baseUrl } from './components/utils/config.js'

export default {
  name: 'App',
  data() {
    return {
      timmer: null,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    avatarBaseUrl() {
      return baseUrl
    }
  },
  mounted() {
    this.showUserInfo()
  },
  methods: {
    mouseMove(){
      let path = ['/login']
      if(!path.includes(this.$route.path)) { 
        clearTimeout(this.timmer);
        this.setTimmer();
      }
    },
 
    setTimmer(){
      let vm = this
      this.timmer=setTimeout(()=>{
        this.$notify.error({
          title: 'Login Timeout',
          message: 'Login Again Please'
        });
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
        vm.$store.commit("SET_USERINFO", '');
        vm.$router.push({
          path: "/login",
        });
 
      },30*60*1000);
    },

    showUserInfo() {
      if(firebase.auth().currentUser) {
        let useremail = firebase.auth().currentUser.email;

        userservice.fetchOneUser(useremail).then(response => {
          if (response) {
            this.$store.commit("SET_USERINFO", response.data[0]);
          }
        });
      }

    },

    Logout: function () {
      if (firebase.auth().currentUser) {
        this.$swal({
          title: 'Log Out?',
          text: 'Are You Sure to Leave?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Log Out',
          cancelButtonText: 'No, Wait',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          if (result.value === true) {
            firebase.auth().signOut().then(() => {
              this.$router.replace('login')
            })
            this.$store.commit("SET_USERINFO", '');

          } else this.$router.replace('/')
        })
      }else {
        this.$swal({
          title: 'You need to login first!',
          text: 'You can\'t do this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK, Go login',
          cancelButtonText: 'No, thx',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          if (result.value === true) {
            this.$router.replace('login')
          } else this.$router.replace('/userprofile')
        })
      }


    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: White;
  margin-top: 0px;

  background-size: auto 100%;
}
.avatar {
  display: block;
  margin-top: 5px;
  width: 30px;
  height: 30px;
}
</style>
