<template>
  <body id="LoginForm">
  <div class="container">
    <h1 class="form-heading" style="font-size: 30px; margin-top: 20px; margin-bottom: 40px">Welcome Back To Euphoria!</h1>
    <div class="login-form">
      <div class="main-div">
        <div class="panel">
          <h2 style="font-size: 25px">Login Here</h2>
          <p>Please enter your email and password</p>
        </div>
        <form id="Login">

          <div class="form-group">


            <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Email Address">

          </div>

          <div class="form-group">

            <input type="password"  v-model="password" class="form-control" id="inputPassword" placeholder="Password">

          </div>
          <div class="signup">

            <a href="#/sign-up">Create a New Account?</a>

          </div>

          <div class="forgot">

            <a href="/#">Forgot password?</a>

          </div>

          <button type="submit" class="btn btn-primary" @click="login">Login</button>

        </form>
      </div>
      <h6
        style="color: rgba(255,255,255,0); font-size: 5pt; margin-bottom: 0px; margin-top: 15px; text-align: center"
      >-----Euphoria-----</h6>
    </div>
  </div>


  </body>
</template>

<script>
  import firebase from 'firebase'
  import userservice from '@/services/userservice'

  export default {
    name: "Login",
    data () {
      return {
        email: '',
        password: '',
        message: '',
        info: [],
        usertype: ''
      }
    },

    created () {
      this.checkLogin()
    },
    methods: {
      login: function () {
        let vm = this

        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {

            userservice.fetchOneUser(this.email)
              .then(response => {
                if (response) {
                  console.log( 'userinfo',response )
                  vm.$store.commit("SET_USERINFO", response.data[0]);

                  this.info = response.data;
                  this.usertype = this.info[0].usertype;
                  console.log(this.usertype);

                  if (this.usertype !== 'admin') {
                    console.log("Not an Admin");
                    this.$router.replace('userprofile')
                  } else{
                    console.log("An Admin!");
                    this.$router.replace('/ordermanage')
                  }
                }
              });

          },
          (err) => {
            alert('Oops. ' + err.message);
            this.message = err.message
          }
        )
      },
      checkLogin: function () {
        if (firebase.auth().currentUser) {
          this.$router.replace('userprofile')
        }
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
body#LoginForm
{ background-image:url("https://hdwallsource.com/img/2014/9/blur-26347-27038-hd-wallpapers.jpg");
  background-repeat:no-repeat;
  background-position:center;
  background-size:cover;
  height: 680px;
  padding:10px;}

.form-heading { color:#fff; font-size:23px;}
.panel h2{ color:#444444; font-size:18px; margin:0 0 8px 0;}
.panel p { color:#777777; font-size:14px; margin-bottom:30px; line-height:24px;}
.login-form .form-control {
  background: #f7f7f7 none repeat scroll 0 0;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.main-div {
  background: #ffffff none repeat scroll 0 0;
  border-radius: 2px;
  margin: 10px auto 30px;
  max-width: 38%;
  padding: 50px 70px 70px 71px;
}

.login-form .form-group {
  margin-bottom:10px;
}
.login-form{ text-align:center;}
.forgot a {
  color: #777777;
  font-size: 14px;
  text-decoration: underline;
}
.login-form  .btn.btn-primary {
  background: #f0ad4e none repeat scroll 0 0;
  border-color: #f0ad4e;
  color: #ffffff;
  font-size: 14px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.forgot {
  text-align: left;
  margin-bottom:30px;
}
.signup {
  text-align: left;
  margin-bottom:5px;
  margin-top: 25px;
}
.botto-text {
  color: #ffffff;
  font-size: 14px;
  margin: auto;
}
.login-form .btn.btn-primary.reset {
  background: #ff9900 none repeat scroll 0 0;
}
.back { text-align: left; margin-top:10px;}
.back a {color: #444444; font-size: 13px;text-decoration: none;}

</style>
