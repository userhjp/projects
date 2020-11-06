<template>
  <div class="iconfont">
    <div class="title" v-text="islogin?'用户登录':'用户注册'"></div>
    <div class="from">
        <div class="item">
            <input type="text" placeholder="请输入用户名" v-model.trim ="username" maxlength="15"><i></i><i @click="username=''" v-if="username">&#xe65c;</i>
        </div>
        <div class="item">
            <input type="text" placeholder="请输入密码" v-model.trim ="password" maxlength="20" v-if="isShow">
            <input type="password" placeholder="请输入密码" v-model.trim ="password" maxlength="20" v-else><span v-if="password"><i @click="password=''">&#xe65c;</i><span class="pwd"><i @click="isShow=!isShow" v-if="isShow">&#xe6b1;</i><i @click="isShow=!isShow" v-else>&#xe6a2;</i></span></span>
        </div>
        <div class="subm" v-bind:class="{ 'j-subm': username.length<4||password.length<6 }" @click="postData" v-text="islogin?'登录':'注册'">
        </div>
        <div class="cut" v-text="islogin?'我要注册':'我要登录'" @click="islogin = !islogin">
        </div>
        <div class="myauth">
            <a class="wx" href=""><i>&#xe63f;</i></a>
            <a class="qq" href=""><i>&#xe629;</i></a>
            <a class="xlwb" href=""><i>&#xe631;</i></a>
            <a class="bd" href=""><i>&#xe650;</i></a>
        </div>
    </div>
  </div>
</template>
<script>
import headers from '../../components/head'
export default {
  data () {
    return {
      islogin: true,
      isShow: false,
      username: '',
      password: '',
    }
  },
  created() {

  },
  components: {
     
  },
  methods: {
    postData () {
      if(this.username.length<4){
          if(this.username.length<1){
              return this.tooltip.ToastMsg("用户名不能为空");
          }
          return this.tooltip.ToastMsg("用户名不能少于4位");

      }else if(this.password.length<6){
          if(this.password.length<1){
              return this.tooltip.ToastMsg("密码不能为空");
          }
          return this.tooltip.ToastMsg("密码不能少于6位");
      }
      var params = {
        loginid: this.username,
        password: this.password
      }
      var thi = this;
      if(this.islogin){
        thi.tooltip.Loading.start("正在登录");
        this.$http.post('/users/login',params,function (data) {
            console.log(data)
            if(data.code === "0"){
                thi.Stor.setStor("info",data.data)
                setTimeout(()=>{
                    thi.tooltip.Loading.end();
                    thi.$router.replace({path:"/my"})
                },500);
            }else{
                thi.tooltip.Loading.end();
                thi.tooltip.Toast.Error(data.message);
            }
        },function (error) {
            console.log(error)
            thi.tooltip.Loading.end();
        })
       
      }else{
        thi.tooltip.Loading.start("正在注册");
        this.$http.post('/users/register',params,function (data) {
            console.log(data)
            if(data.code === "0"){
                thi.Stor.setStor("info",data.data)
                setTimeout(() => {
                    thi.tooltip.Loading.end();
                    thi.tooltip.Toast.Success(data.message,800);
                    setTimeout(() => {
                        thi.$router.replace({path:"/my"})
                    }, 800);
                }, 1000);
            }else{
                thi.tooltip.Loading.end();
                thi.tooltip.Toast.Error(data.message);
            }
        },function (error) {
            thi.tooltip.Loading.end();
            console.log(error)
            
        })
      }
    }
  },
  watch:{
        username:function(){
            this.username=this.username.replace(/[\W]/g,'');
        },
        password:function(){
            this.password=this.password.replace(/[\W]/g,'');
        }
    }
}
</script>

<style lang="scss" scoped>
.title{
    background-color: #fff;
    width: 100%;
    height: 1.2rem;
    font-size: .54rem;
    line-height: 1.2rem;
    text-align: center;
    color: #333;
    border-bottom: .02rem solid #e0dfdf;
}
.from{
    margin: .4rem;
    .item{
        width: 100%;
        margin-bottom: .4rem;
        background-color: #fff;
        input{
            width: 93%;
            border: none;
            height: 1.1rem;
            font-size: .4rem;
            padding: 0 .3rem;
            padding-right: .8rem;
        }
        i{
            font-size: .4rem;
        }
        span{
            position: relative;
        }
        .pwd{
            position: absolute;
            right: .5rem;
            bottom: -.14rem;
            i{
                font-size: .6rem;
            }
        }
    }
    .subm{
        color: #fff;
        font-size: .4rem;
        text-align: center;
        padding: .3rem;
        background-color:#e8853b;
    }
    .j-subm{
        background-color: #b0b0b0;
    }
    .cut{
        height: 1.2rem;
        margin-top: 1rem;
        color: #16adf1;
        text-align: right;
        font-size: .4rem;
        padding-right: .1rem;
    }
    .myauth{
        display: flex;
        justify-content: center;
        a{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: .2rem;
            margin: 0 .16rem;
            text-align: center;
            i{
                color: #fff;
                font-size: .8rem;
                line-height: 1.2rem;
            }
        }
        .wx{
            background-color: #09bb07;
        }
        .qq{
            background-color: #439fd9;;
        }
        .xlwb{
            background-color: #c21021;
        }
        .bd{
            background-color: #2226d8;
        }
        
    }
}
</style>
