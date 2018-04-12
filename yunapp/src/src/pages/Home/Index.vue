<template>
  <div class="home iconfont">
    <div class="tab">
        <a href="" class="on">最新</a>
        <a href="">赞最多</a>
        <a href="">评论最多</a>
    </div>
    <div class="scroll">
      <ul>
        <li>
          <div class="feed"><span>0</span> <i>&#xe671;</i></div>
          <div class="uinfo clearfix">
            <div class="u-head fl">
              <img src="https://wx2.sinaimg.cn/thumb180/63e5c1e1ly1folw4fq5k9g20dc0dc1l1.gif?imageView2/0/interlace/1/ignore-error/1/w/180/h/100/format/pnghttps://wx1.sinaimg.cn/thumb180/63e5c1e1ly1folw7g9pncg20dc0dc4qt.gif" alt="">
              <div class="u-name"><p>淡定的蛋蛋</p><p class="time">2天前</p></div>
            </div>
            <div class="cont">
              <div class="image">
                  <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
                  <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
                  <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
                  <img src="https://wx2.sinaimg.cn/thumb180/63e5c1e1ly1folw4fq5k9g20dc0dc1l1.gif?imageView2/0/interlace/1/ignore-error/1/w/180/h/100/format/pnghttps://wx1.sinaimg.cn/thumb180/63e5c1e1ly1folw7g9pncg20dc0dc4qt.gif" alt="">
              </div>
              <p>猫星人大战汪星人</p>
            </div>
            <div class="but">
              <a href=""><i>&#xe655; </i>分享 <span>0</span></a>
              <a href=""><i>&#xe7d2; </i> 评论 <span>0</span></a>
              <a @click="postData()"><i>&#xe644; </i>点赞 <span>0</span></a>
            </div>
          </div>
        </li>
         <li>
          <div class="feed"><span>0</span> <i>&#xe671;</i></div>
          <div class="uinfo clearfix">
            <div class="u-head fl">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
              <div class="u-name"><p>淡定的蛋蛋</p><p class="time">2天前</p></div>
            </div>
            <div class="cont">
               <div class="image-1">
                  <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
              </div>
              <p>猫星人大战汪星人</p>
            </div>
            <div class="but">
              <a href=""><i>&#xe655; </i>分享 <span>0</span></a>
              <a href=""><i>&#xe7d2; </i> 评论 <span>0</span></a>
              <a href=""><i>&#xe644; </i>点赞 <span>0</span></a>
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
      msg: '详情页'
    }
  },
  created () {
    console.log("created钩子--组件加载完成后执行");
  },
  methods: {
   
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
    margin-bottom: 2.6rem;
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
        justify-content: space-between;
        img{
          height: 2.966666rem;
          margin: 0.1rem .1rem;
        }

      }
      .image-1{
          max-height: 4.6rem;
          overflow: hidden;
          padding: 0.1rem .1rem;
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
