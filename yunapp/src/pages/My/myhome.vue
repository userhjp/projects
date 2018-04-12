<template>
  <div class="myhome iconfont">
      <div class="bg"></div>
      <div class="main">
          <img :src="Uinfo.headimg||dftimg" alt="">
          <div class="nickname" v-text="Uinfo.nickname"></div><span v-text="'Lv.'+Uinfo.grade"></span>
          <p class="summary" v-text="Uinfo.signature||'这个人很懒什么都没有留下。'"></p>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Uinfo: {},
      dftimg: require('../../assets/images/head.jpg')
    }
  },
  created () {
    var Userinfo = this.User.getUserInfo();
    if(Userinfo && Userinfo._id ){
        this.Uinfo = Userinfo;
    }else{
      this.tooltip.Toast.Error("请先登录",800);
      return this.$router.replace({path:"/login"});
    }
  },
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>
.bg{
    width: 100%;
    height: 6rem;
    background:url(../../assets/images/bg.jpg) center center no-repeat;
    background-size: cover;
}
.main{
    position: relative;
    background-color: #fff;
    padding-bottom: 1rem;
    padding-top: 1.6rem;
    text-align: center;
    img{
        border-radius: 50%;
        width: 2.8rem;
        height: 2.8rem;
        border: .1rem solid transparent;
        box-shadow: 0 0 0.1rem rgba(0,0,0,.3);
        box-sizing: border-box;
        position: absolute;
        left: 3.666666rem;
        top: -1.4rem;
    }
    .nickname{
        font-size: .6rem;
        line-height: 1.6rem;
        display: inline;
    }
    .summary{
        font-size: .4rem;
        color: #999;
    }
    span{
        font-size: .4rem;
        color: #fff;
        padding: .08rem;
        margin-left: .1rem;
        background-color: #03A9F4;
        border-radius: .1rem;
        vertical-align: middle;
    }
}
</style>
