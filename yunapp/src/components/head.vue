<template>
  <div class="herd iconfont">
      <a href="javascript:history.back()">&#xe605;</a>
      <h1>{{tites}}</h1>
  </div>
</template>
<script>
export default {
  props: [
    'setTitel'
  ],
  computed: {
    tites: function () {
      return this.setTitel
    }
  }
}
</script>

<style lang="scss" scoped>
    .herd{
        background-color: #d6d6d6;
        color: #fff;
        font-size: .566666rem;
        width: 100%;
        height: 1.2rem;
        position: fixed;
        z-index: 9;
        top: 0;
        a{
            position: absolute;
            color: #fff;
            left: .333333rem;
            line-height: 1.2rem;
        }
        h1{
            display: block;
            text-align: center;
            line-height: 1.2rem;
        }
    }
</style>
