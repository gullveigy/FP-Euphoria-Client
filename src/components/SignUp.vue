<template>
  <body id="LoginForm">
  <div class="container">
    <h1 class="form-heading" style="font-size: 30px; margin-top: 20px; margin-bottom: 40px">Welcome To Euphoria!</h1>
    <div class="login-form">
      <div class="main-div">
        <div class="panel">
          <h2 style="font-size: 25px">Sign Up</h2>
          <p>Please enter your username and email and password</p>
        </div>
        <form id="Login">

          <div class="form-group">


            <input type="text" v-model="username" class="form-control" id="inputUsername" placeholder="Username">

          </div>

          <div class="form-group">


            <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Email Address">

          </div>

          <div class="form-group">

            <input type="password"  v-model="password" class="form-control" id="inputPassword" placeholder="Password">

          </div>
          <div class="signup">

            <a href="#/login">Already Have a Account?  Go to Login!</a>

          </div>

          <button type="submit" class="btn btn-primary" @click="signUp">Sign Up</button>

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
  import userserivce from '@/services/userservice'

  export default {
    name: "SignUp",
    data () {
      return {
        email: '',
        password: '',
        username: '',
        usertype: ''
      }
    },
    watch: {
      email(val) {
        if(/[A-Z]/.test(val)) {
          this.$message({
            message: 'E-mail address cannot contain capital letters',
            type: 'warning',
            duration: 1000
          })
        }
      }
    },
    methods: {

      signUp: function () {

        if(/[A-Z]/.test(this.email)) {
          this.$message({
            message: 'E-mail address cannot contain capital letters',
            type: 'warning'
          })
          return
        }

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            var newuser = {
              username: this.username,
              email: this.email,
              password: this.password,
              usertype: 'common',
              signature: 'Did not write anything'
            };

            userserivce.addUser(newuser);
            this.$router.replace('/')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      }
    }
  }
</script>

<style scoped>
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
  .signup {
    text-align: left;
    margin-bottom:25px;
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

