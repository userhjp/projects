<template>
  <div class="footer iconfont">
    <div class="pub">
        <router-link to="/put" class="publish"><i></i><div>发猫</div></router-link>
    </div>
    <router-link to="/home" class="home"><i></i><div>首页</div></router-link>
    <router-link to="/fight" class="mall"><i></i><div>萌斗场</div></router-link>
    <router-link to="/put" class="publish"><i></i><div>发猫</div></router-link>
    <router-link to="/msg" class="msg"><i></i><div>发现</div></router-link>
    <router-link to="/my" class="my"><i></i><div>我的</div></router-link>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer{
    background-color: #fff;
    position: fixed;
    z-index: 9;
    box-shadow: 0 0 0.04rem rgba(0,0,0,.25);
    height: 1.6rem;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    display:flex;
    a{
        flex:1;
        text-align:center;
        color: #353535;
        i{
            font-size: .666666rem;
            margin-bottom: .1rem;
            display: block;
            padding-top: .2rem;
        }
    }
    .pub{
        position: absolute;
        left: 50%;
        margin-left: -.8rem;
        top: -.58rem;
        background-color: #fff;
        padding: .1rem;
        border-radius: 1rem;
        i{
            background-color: #FFEB3B;
            font-size: 1rem;
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 50%;
        }
    }
    .home i::before {
        content: "\e638";
    }
    .mall i::before {
        content: "\e7b2";
    }
    .publish i::before {
        content: "\e61e";
    }
    .msg i::before {
        content: "\e60d";
    }
    .my i::before {
        content: "\e621";
    }
    .router-link-active{
    color: #03A9F4;
    }
}
</style>
