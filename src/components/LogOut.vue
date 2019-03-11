<template>
  <div class="hero">
    <button class="button" @click="Logout">Log Out Here!</button>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'LogOut',
    methods: {
      Logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
</script>

<style scoped>
  .hero {
    height: 100vh;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
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
    background: gray;
  }
</style>
