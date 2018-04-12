<template>
  <div class="home iconfont">
    <div class="tab">
        <a href="" class="on">最新</a>
        <a href="">赞最多</a>
        <a href="">评论最多</a>
    </div>
    <div class="scroll">
      <ul>
        <li v-for="item in dataList">
          <div class="feed"><span>0</span> <i>&#xe671;</i></div>
          <div class="uinfo clearfix">
            <div class="u-head fl">
              <img :src="item.uid.headimg||'https://wx2.sinaimg.cn/thumb180/63e5c1e1ly1folw4fq5k9g20dc0dc1l1.gif?imageView2/0/interlace/1/ignore-error/1/w/180/h/100/format/pnghttps://wx1.sinaimg.cn/thumb180/63e5c1e1ly1folw7g9pncg20dc0dc4qt.gif'" alt="">
              <div class="u-name"><p v-text="item.uid.nickname"></p><p class="time">{{item.creattime | fromdate}}</p></div>
            </div>
            <div class="cont">
              <div v-if="item.img.length" v-bind:class="{ 'image-1': item.img.length<2 ,'image': item.img.length>1}">
                  <img v-for="img in item.img" :src="'http://localhost:3000/'+img" alt="">
              </div>
              <p v-text="item.content"></p>
            </div>
            <div class="but">
              <a href=""><i>&#xe655; </i> 分享 <span v-text="item.share"></span></a>
              <a href=""><i>&#xe7d2; </i> 评论 <span v-text="item.comments"></span></a>
              <a @click=""><i>&#xe644; </i>点赞 <span v-text="item.like"></span></a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: []
    }
  },
  created () {
    this.getdata();
  },
  methods: {
    getdata(){
      var params = {
        uid: this.userid,
        videourl: this.videourl,
        img: this.img,
        content: this.content
      }
       this.$http.post('/article/getAllList',params,(data) =>{
            if(data.code === "0"){
              this.dataList = data.data;
            }else{
              this.tooltip.Toast.Error(data.message);
            }
        }, (error)=> {
          this.tooltip.Toast.Error(error);
            console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab{
  background-color: #fafafa;
  font-size: .466666rem;
  width: 100%;
  height: 1.2rem;
  position: fixed;
  top: 0;
  display: flex;
  z-index: 9;
  a{
    flex: 1;
    color: #999;
    line-height: 1.2rem;
    text-align: center;
  }
  .on{
    border-bottom: .04rem solid #e8853b;
    color: #e8853b;
  }
}
.scroll{
    margin-top: 1.2rem;
  li{
    margin: 0 0 .4rem 0;
    padding: .42rem .24rem 0;
    position: relative;
    background-color: #ffffff;
  }
  .uinfo{
    text-align:initial;
    .u-name{
      position: relative;
      left: 0.3rem;
      width: 7rem;
      display: inline-block;
      p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .time{
      padding-top: .14rem;
      color: #9e9e9e;
    }
    .cont{
      padding-top: .4rem;
      div{
          margin-bottom: .4rem;
      }
      .image{
        display: flex;
        flex-wrap: wrap;
       // justify-content: space-between;
        img{
          height: 2.966666rem;
          margin: 0.1rem .1rem;
          width: 2.966666rem;
          background: #fafafa url(../../assets/images/img.png) center center no-repeat;
        }

      }
      .image-1{
          max-height: 4.6rem;
          height: 4rem;
          overflow: hidden;
          padding: 0.1rem .1rem;
          background: #fafafa url(../../assets/images/img.png) center center no-repeat;
        img{
          max-width: 100%;
        }
      }
     p{
          padding: 0 .1rem;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
      }
    }
    .but{
    margin-top: .3rem;
    border-top: 1px solid #e8e8e8;
    display: flex;
    a{
      text-align: center;
      flex: 1;
      color: #9e9e9e;
      padding: .3rem 0;
    }
  }
  }
  .u-head{
    padding-left: .1rem;
    img{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
  }
  .feed{
    position: absolute;
    right: .2rem;
    top: .2rem;
    line-height: .5rem;
    height: .6rem;
    color: #607D8B;
    padding-top: .1rem;
    padding-right: .1rem;
  }
}
</style>
