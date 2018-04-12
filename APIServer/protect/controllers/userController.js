var express = require('express');
var router = express.Router();
var user = require('./../models/user');

//统一回调函数
var callback = function(req, res,code, message, data){
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
//注册账号
router.all('/register',function(req,res,next){
    var param = getparam(req);
    user.save(param, function(err, data){
        if(err){
            var code=err.code , err="账户名以存在"
        } else {
            req.session.uid = data._id;
        }
        callback(req, res, code||"0" ,err || "注册成功", data);
    });
})
//登录
router.all('/login',function(req,res,next){
    var param = getparam(req);
    user.login(param, function(err, data){
        var msg = data?"登录成功":"用户名或密码错误";
        var code = data?"0":"-98";
        if(data){
            req.session.uid = data._doc._id;
        }
        callback(req, res, code , err || msg, data);
    });
})
//退出登录
router.all('/logout',function(req,res,next){
    req.session.destroy();
    callback(req, res, '0',"退出成功", null);
})
//获取所有用户
router.all('/getAllUser',function(req,res,next){
    var param = getparam(req);
    user.getAllUser(param, function(err, data){
        callback(req, res, '0' ,err || "成功", data);
    });
})
//_id获取用户信息
router.all('/getUserInfo',function(req,res,next){
    var param = getparam(req);
    user.getUserInfo(param, function(err, data){
        var msg = data?"成功":"用户不存在";
        data = data._doc || "";
        callback(req, res,'0', err || msg, data);
    });
})
module.exports = router;
