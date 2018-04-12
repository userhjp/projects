<template>
  <div class="publish iconfont">
    <div class="text">
      <textarea placeholder="写点什么吧Ծ‸ Ծ"></textarea>
    </div>
    <div class="attach">
      <div class="upload">
        <i class="remove">&#xe70a;</i>
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
      </div>
      <div class="upload">
         <i class="remove">&#xe70a;</i>
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
      </div>
      <div class="upload">
        <i class="remove">&#xe70a;</i>
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
      </div>
      <div class="upload">
        <i class="remove">&#xe70a;</i>
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1078566541,986112677&fm=27&gp=0.jpg" alt="">
      </div>
      <div class="upload">
        <div>
          <i>&#xe791;</i><p>添加图片</p>
           <input type="file" name="img" multiple="multiple" accept="image/*">
        </div>
      </div>
      <div class="upload">
        <div>
          <i>&#xe600;</i><p>添加视频</p>
          <input type="file" name="video" multiple="multiple" accept="video/*">
        </div>
      </div>
    </div>
    <div class="submit">
      <a href="">确认发布</a>
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
.publish{
  background-color: #fff;
  text-align: center;
}
.text{
  textarea{
    width: 93%;
    padding: .42rem 4%;
    border: none;
    font-size: .48rem;
    line-height: 1.6;
    height: 3rem;
    font-family: "Microsoft YaHei",Tahoma,SimSun;
  }
}
.attach{
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  padding: .4rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #e7e7e7;
  .upload{
    position: relative;
    background: #f3f5f9;
    width: 2.8rem;
    height: 2.8rem;
    margin: .1rem;
    color: #9e9e9e;
    div{
      padding-top: .6rem;
      position: relative;
      input{
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 2.8rem;
        height: 2.8rem;
        opacity: 0;
        cursor: pointer;
      }
    }
    i{
      font-size: .8rem;
    }
    img{
      max-width: 100%;
      max-height: 100%;
    }
    .remove{
      position: absolute;
      color: #F44336;
      right: 0;
    }
  }
}
.submit{
  padding-bottom: .4rem;
  a{
      height: 1.3rem;
      background-color: #00BCD4;
      display: block;
      margin: .4rem;
      color: #fff;
      font-size: .5rem;
      line-height: 1.3rem;
  }
}
</style>
