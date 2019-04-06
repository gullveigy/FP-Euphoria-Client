<template>
<div>
  <h3 stylr="color: black">{{this.$route.params.uname}}</h3>
</div>

</template>

<script>
  export default {
    name: "ProfileCard",
    data() {
      return {
        currentusername: '',
        uname: ''
      }
    },
    created() {
      this.test();
    },
    methods: {
      test: function() {

        console.log(this.$router.params.uanme)
      }
    }
  }



</script>

<style scoped>


</style>
