<template>
  <div class="publish iconfont">
    <div class="text">
      <textarea ref="textarea" placeholder="写点什么吧 Ծ‸ Ծ" v-model="content"></textarea>
    </div>
    <upload-file @setimgUrl="setimgUrl"></upload-file>
    <div class="submit">
      <a @click="submit">确认发布</a>
    </div>
  </div>
</template>
<script>
import uploadFile from '../../components/upload'
export default {
  data () {
    return {
      axios: require('axios'),
      content: "",
      img:[],
      videourl: "",
      userid: "",
      file: [] 
    }
  },
  components: {
    uploadFile
  },
  created(){
    var Userinfo = this.User.getUserInfo();
    this.Userinfo = Userinfo;
    if(Userinfo && Userinfo._id ){
        this.userid = Userinfo._id;
    }else{
      this.tooltip.Toast.Error("请先登录",800);
      return this.$router.replace({path:"/login"});
    }
  },
  methods: {
    setimgUrl(urlList){//获取组件的url链接
      this.img = urlList;
    },
    submit(){
      if(this.content == ""){
        this.tooltip.ToastMsg("写点什么吧 Ծ‸ Ծ");
        return this.$refs.textarea.focus();
      }
      var params = {
        uid: this.userid,
        videourl: this.videourl,
        img: this.img,
        content: this.content
      }
       this.$http.post('/article/publish',params,(data) =>{
            if(data.code === "0"){
              this.tooltip.Toast.Success(data.message);
              this.$router.push({path:"/Home"})
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
      width: 100%;
      height: 100%;
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
