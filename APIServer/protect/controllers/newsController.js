var express = require('express');
var router = express.Router();
var news = require('./../models/newslist');

//统一回调函数
var callback = function(req, res, message, data){
	res.json({code:'0',success: true, message:message, data: data});
    res.end();
}
//判断请求方式获取参数
var getparam = function(req){
    if (req.method == "POST") {
        return req.body;
    } else{
        return req.query || req.params; 
    }
}
//保存数据
router.all('/addnews',function(req,res,next){
    var param = getparam(req);
    news.save(param, function(err, data){
        callback(req, res, err || "保存成功", data);
    });
})

//获取数据列表
router.all('/newsList',function(req,res,next){
    var param = getparam(req);
    news.getdataList(function(err, data){
        callback(req, res,err || "成功", data);
    });
})
//根据id获取数据
router.all('/getnewsDetail',function(req,res,next){
    var param = getparam(req);
    news.getdata(param,function(err,data){
        callback(req, res,err || "成功", data);
    })
})
//根据id更新数据
router.all('/updatanews',function(req,res,next){
    var param = getparam(req);
    news.updata(param,function(err,data){
        var msg = "修改成功"
        if(data.ok<1){
            msg = "id不存在"
        }
        callback(req, res,msg, data);
    })
})
//根据id删除数据
router.all('/deleteNews',function(req,res,next){
    var param = getparam(req);
    news.deleteid(param,function(err,data){
        callback(req, res, err || "删除成功", data);
    })
})
module.exports = router;