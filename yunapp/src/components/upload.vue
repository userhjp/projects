<template>
  <div class="upfile">
    <div class="attach">
      <div class="upload" v-for="(imges,index) in img">
        <i class="remove" @click="removeimg(index,imges)">&#xe70a;</i>
        <img :src="'http://localhost:3000/'+imges" alt="">
      </div>
      <div class="upload">
        <div>
          <i>&#xe791;</i><p>添加图片</p>
           <input @change="getFile($event)" type="file" name="img" multiple="multiple" accept="image/*|video/*">
        </div>
      </div>
      <!-- <div class="upload">
        <div>
          <i>&#xe600;</i><p>添加视频</p>
          <input type="file" name="video" multiple="multiple" accept="video/*">
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      axios: require('axios'),
      img:[],
      videourl: "",
      file: [] 
    }
  },
  created(){
    
  },
  methods: {
    removeimg(idx,url){
      this.img.splice(idx,1);
      this.axios.post('api/files/delete', {'fileUrl':url}).then((res) => {  
        console.log(res.data.message);
      }).catch(err=>{
        console.log(err);
      });
    },
    getFile(event) {  
      this.file = [];
      this.file.push.apply(this.file,event.target.files);
      event.target.value = '';
      if(this.file.length<1)return;
      if(this.img.length>8)return this.tooltip.ToastMsg("最多上传9张图片");;
      let swh = true;
      let fileArray=[].slice.call(this.file,0);//类数组转换为数组
      var imgre=new RegExp("\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$");
      var vdore=new RegExp("\.(mp4)$");
      fileArray.forEach((file)=>{
        if(file.size > 3*1024*1024){
          swh = false;
          return this.tooltip.Toast.Error("图片不能超过3M");
        }
        if(!imgre.test(file.name.toLowerCase())){
          swh = false;
          return this.tooltip.Toast.Error("不支持此图片类型(⊙o⊙)…");
        }

      });
      if(swh)this.submitForm(event);
    },  
    submitForm(event) {  
      event.preventDefault();  
      let formData = new FormData();
      let fileArray=[].slice.call(this.file,0);//类数组转换为数组
      fileArray.forEach((file)=>{
        formData.append("file",file);//循环遍历把文件对象插到formData对象上
      });
      debugger
      let config = {  
        headers: {  
          'Content-Type': 'multipart/form-data' ,
        }  
      }  
      this.tooltip.Loading.start("上传中");
      this.axios.post('api/files/upload', formData, config).then((res) => {  
        if (res.status === 200) {  
          this.tooltip.Loading.end();
          // this.tooltip.Toast.Success(res.data.message);
          this.img.push.apply(this.img,res.data.data);
          this.$emit('setimgUrl',this.img);
        }else{
          this.tooltip.Loading.end();
          this.tooltip.Toast.Error(res.data.message);
        }  
      }).catch(err=>{
        this.tooltip.Toast.Error(err);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.upfile{
  background-color: #fff;
  text-align: center;
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
</style>
