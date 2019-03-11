<template>
  <div class="hero">
    <h3 style="font-size: 30px">Join Us Here!</h3>
    <br/>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button class="login-button" @click="login">Login</button>
    <br/>
    <p>{{message}}</p>
    <p style="font-size: 20px">You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>

  import firebase from 'firebase'

  export default {
      name: "Login",
      data () {
        return {
          email: '',
          password: '',
          message: ''
        }
      },
    created () {
      this.checkLogin()
    },
    methods: {
      login: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            console.log(firebase.auth().currentUser.email);
            this.$router.replace('userprofile')
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
.hero {
  height: 100vh;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
.login-button {
  width: 170px;
  height: 40px;
  border-width: 0px;
  border-radius: 3px;
  background: #1E90FF;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 17px;
}
.login-button:hover {
  background: #5599FF;
}

p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
