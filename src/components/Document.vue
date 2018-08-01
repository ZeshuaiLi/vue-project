<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">核心文档</a></li>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">当前demo文档</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <br>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <h2>自定义路由 push append replace </h2>
    <ul>
      <router-link :to="{ name: 'Hello' }" tag="li">
        Hello
      </router-link>
      <router-link :to="{ name: 'Home' }" tag="li" replace>
        Home
      </router-link>
      <router-link :to="{ name: 'Me' }" tag="li">
        Me
      </router-link>
      <router-link :to="{ name: 'Cart' }" tag="li">
        Cart
      </router-link>
      <router-link :to="{ name: 'Explorer', params: {id: 1} }" tag="li">
        Explorer
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Document',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
