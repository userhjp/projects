<template>
  <div class="iconfont">
    <div class="menu">
      <a href=""><i>&#xe644; </i>赞我的</a>
      <a href=""><i>&#xe7d2; </i>评论我的</a>
      <a href=""><i>&#xe671; </i>打赏我的</a>
    </div>
    <div class="menu">
      <a href=""><i>&#xe673;</i>关注公众号</a>
      <a href=""><i>&#xe607; </i>关于我们</a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '开发中'
    }
  }
}
</script>

<style lang="scss" scoped>
.menu{
  background-color: #fff;
  margin-top: .3rem;
    a{
    display: block;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: .45rem;
    color: #333;
    padding-left: .4rem;
    padding-right: 2rem;
    position: relative;
  }
  a:before {
      content: "\e61f";
      position: absolute;
      font-size: .4rem;
      font-size: .5rem;
      right: .3rem;
      color: #999;
    }
  a:not(:last-child):after {
      content: "";
      position: absolute;
      height: 1px;
      background-color: #eee;
      bottom: 0;
      left: .26rem;
      right: 0;
  }
}
</style>
