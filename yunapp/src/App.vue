<template>
  <div id="app" class="iconfont">
    <router-view/>
    <footers></footers>
  </div>
</template>

<script>
import headers from './components/head'
import footers from './components/footer'
export default {
  name: 'App',
  components: {
    footers,
    headers
  }
}
</script>

<style>
#app {
  /* @import "./style/style";可以单独写css引入 */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 3rem;
}
html{
    background-color: #f3f5f9;
}
</style>
