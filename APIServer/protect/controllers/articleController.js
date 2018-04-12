var express = require('express');
var router = express.Router();
var article = require('./../models/article');

//统一回调函数
var callback = function(req, res,code, message, data){
    code = code?code:"0";
	res.json({code:code,success: true, message:message, data: data});
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

//发布
router.all('/publish',function(req,res,next){
    var param = getparam(req);
    article.save(param, function(err, data){
        if(err) var code = "-1";
        callback(req, res, code, err || "发布成功", data);
    });
})

//查询列表
router.all('/getAllList',function(req,res,next){
    var param = getparam(req);
    article.findList(param, function(err, data){
        if(err) var code = "-1";
        callback(req, res, code, err || "成功", data);
    });
})
module.exports = router;