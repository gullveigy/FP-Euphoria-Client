<template>
  <div class="hello">
    <div id="home">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>

    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    </div>
    <div id="footer">
    <dfooter></dfooter>
    </div>
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

h1 {
  margin-top:80px;
  font-weight: normal;
}

h2 {
  margin-top:30px;
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 40px 50px;
  font-size: 15pt;
}
a {
  color: #42b983;
}
  #footer {
    background: rgba(105, 128, 117, 0.85);
  }

  #footer ul {
    size: 9px;
  }
</style>
