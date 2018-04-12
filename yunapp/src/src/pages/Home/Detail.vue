<template>
  <div class="footer iconfont">
    <headers set-titel="详情"></headers>
    {{msg}}
  </div>
</template>
<script>
import headers from '../../components/head'
export default {
  data () {
    return {
      msg: '详情页'
    }
  },
  components: {
    headers
  }
}
</script>

<style lang="scss" scoped>
</style>
