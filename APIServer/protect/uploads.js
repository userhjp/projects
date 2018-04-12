var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');	
var sd = require('silly-datetime');
var cacheFolder = './public/upload/images/';
//上传文件
router.post('/upload',function(req,res,next){
    var cdate = sd.format(new Date(),'YYYYMM');//当前日期
    var path = cacheFolder + cdate;
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        try{
            fs.mkdirSync(path);
        }catch(e){
          console.log(e);
        }
    }
    var form = new formidable.IncomingForm({
        encoding : 'utf-8', //设置编码
        uploadDir : path,//设置上传目录
        keepExtensions : true, //保留后缀
        maxFieldsSize : 2 * 1024 * 1024, //文件大小
        type : true//只读
    });
    
   // var allFile=[];
    var fileUrl=[];
    form.on('progress', function(bytesReceived, bytesExpected) {//在控制台打印文件上传进度
      var progressInfo = { 
         value: bytesReceived, 
         total: bytesExpected 
      }; 
      console.log('[progress]: ' + JSON.stringify(progressInfo)); 
      //res.write(JSON.stringify(progressInfo)); 
    })
    .on('file', function (filed, file) {
      // allFile.push([filed, file]);//收集传过来的所有文件
       var str = file.path.replace(/\\/g, '/').replace('public','');
       fileUrl.push(str);
    })
    .on('end', function() { 
        // allFile.forEach(function(file,index){
        //     var fieldName=file[0];
        //     var path = file[1].path;
        // });
        res.json({code:'0',success: true, message:"上传成功",data:fileUrl});
        res.end(); 
    })
    .on('error', function(err) {
      console.error('上传失败：', err.message); 
      next(err); 
    })
    .parse(req,function(err, fields, files){
      if(err){
        return res.json({
            code: 500,
            message: "内部服务器错误"
          })
      }
    //   allFile.forEach(function(file,index){
    //       var fieldName=file[0];
    //       var types = file[1].name.split('.');
    //       var date = new Date();
    //       var ms = Date.parse(date);
    //       fs.renameSync(file[1].path,form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]));//重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
    //   });
    }); 
})
//删除文件
router.post('/delete',function(req,res,next){
    var path = './public'+req.body.fileUrl;
    try{
        fs.accessSync(path,fs.F_OK);
        fs.unlinkSync(path);//同步删除
        res.json({code:'0',success: true, message:"删除成功",data:""});
    }catch(e){
        res.json({code:'0',success: true, message:"文件不存在或已删除",data:""});
    }
    res.end();
})

module.exports = router;