<template>
  <div class="iconfont">
    <div class="info">
      <i></i>
      <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
      <div>
        <div class="uname"><span v-text="Userinfo.loginid">淡定的蛋蛋</span><small>Lv.5</small></div>
        <div class="price">经验值 <span>38</span>&nbsp;&nbsp; 升级还需 <span>46</span></div>
        <div class="progress">
          <div class="bar" style="width:20%"></div>
        </div>
      </div>
    </div>
    <div class="number">
      <a href=""><div class="num">0.00</div><div class="txt">金币</div></a>
      <a href=""><div class="num">0</div><div class="txt">小鱼干</div></a>
      <a href=""><div class="num">0</div><div class="txt">粉丝</div></a>
    </div>
    <div class="menu">
      <a href=""><i>&#xe66c; </i>我的主页</a>
    </div>
    <div class="menu">
      <a href=""><i>&#xe61e; </i>我发表的</a>
      <a href=""><i>&#xe7d2; </i>我的评论</a>
      <a href=""><i>&#xe644; </i>我赞过的</a>
    </div>
    <div class="logout"><a @click="logout">退出登录</a></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Userinfo: {}
    }
  },
  created(){
    this.Userinfo = this.User.getUserInfo();
    if(this.Userinfo.length<1){
        this.tooltip.Toast.Error("请先登录",800);
        return this.$router.replace({path:"/login"});
    }
  },
  methods: {
    logout () {
      var ths = this;
      ths.tooltip.Confirm("您确定要退出登录吗？",()=>{
        ths.$http.post('/users/logout',{},function (data) {
            console.log(data)
            ths.Stor.remove("info");
            ths.$router.push({path:"/Home"});
        },function (error) {
            console.log(error)
        })
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  position: relative;
  padding: .4rem;
  background-color: #ffffff;
  img{
    width: 2.4rem;
    border-radius: 50%;
  }
  >div{
    display: inline-block;
    padding-left: .4rem;
    vertical-align: top;
    padding-top: .5rem;
    .uname{
      font-size: .45rem;
      color: #333;
      padding-bottom: .14rem;
      small{
        color: #fff;
        padding: .1rem;
        margin-left: .1rem;
        background-color: #03A9F4;
      }
    }
    .price{
      color: #999;
      margin-bottom: .1rem;
    }
    .progress{
      background-color: #f0f0f0;
      height: .18rem;
      position: relative;
      overflow: hidden;
      border-radius: .12rem;
      width: 5.58rem;
      >.bar{
        background-color: #f33;
        height: .18rem;
        border-radius: .1rem;
        background-image: -webkit-gradient(linear,0 0,100% 100%,color-stop(.25,rgba(255,255,255,.2)),color-stop(.25,transparent),color-stop(.5,transparent),color-stop(.5,rgba(255,255,255,.2)),color-stop(.75,rgba(255,255,255,.2)),color-stop(.75,transparent),to(transparent));
        background-size: .12rem .12rem;
      }
    }
  }
}
.number{
  background-color: #fff;
  display: flex;
  text-align: center;
  padding: .26rem 0;
  a{
    flex: 1;
    color: #333;
    .txt{
      color: #999;
    }
  }
}
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
.logout{
  background-color: #00BCD4;
  height: 1.2rem;
  margin-top: .4rem;
  text-align: center;
  font-size: .5rem;
  line-height: 1.2rem;
  a{
    color: #fff;
  }
}
</style>
