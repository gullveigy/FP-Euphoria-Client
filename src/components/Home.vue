<template>
  <div class="hero" style="background-image: url(https://cewe-photoworld.com/wp-content/uploads/2018/05/Edit1a.jpg)">
    <div class="hero__content">
      <h1 style="width: 200px; text-align: left; color: black">Euphoria,</h1>
      <h1 style="width: 700px; text-align: left; color: black">Find the Same Soul</h1>
      <a class="btn" href="#/books" style="width: 200px">Get Started</a>
    </div>

    <dfooter style="background: rgba(28, 34, 31, 0.95)"></dfooter>

  </div>
</template>

<script>

  import Footer from '@/components/Footer'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Record Books & Find The Same Thing'
      }
    },
    components: {
      'dfooter': Footer
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  body {
    margin: 0;
  }

  .hero {
    background-size: 150%;
    background-repeat: no-repeat;
    background-position: left;
    -webkit-animation: slide 40s ease;
    transform: translate3d(0,0,0);
    height: 100vh;
  }


  .hero__content {
    z-index: 101;
    position: relative;
  }

  @-webkit-keyframes slide {
    0%   { background-position: left; }
    50%   { background-position: right; }
    100% { background-position: left; }
  }

  .hero h1 {
    font-size: 50px;
    font-weight: 100;
    color: white;
    margin: 0;
  }

  .hero__content {
    padding: 200px 100px;
    max-width: 310px;
  }

  .btn {
    background: #4C384B;
    color: white;
    text-decoration: none;
    padding: 10px 40px;
    margin: 20px 0;
    display: inline-block;
    border-radius: 3px;
    font-size: 20px;
  }

  #footer {
    background: rgba(28, 34, 31, 0.91);
  }

  #footer ul {
    size: 9px;
  }
</style>

