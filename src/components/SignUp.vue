<template>
  <div class="hero">
    <p style="font-size: 30px">Let's create a new account !</p>
    <br/>
    <input type="text" v-model="username" placeholder="Username"><br>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button class="button" @click="signUp">Sign Up</button>
    <br/>
    <span style="font-size: 20px">or go back to <router-link to="/login">login</router-link>.</span>
  </div>
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
        methods: {
          signUp: function () {
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
  .sign-up {
    margin-top: 40px;
  }
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
  .button {
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
  .button:hover {
    background: #5599FF;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
