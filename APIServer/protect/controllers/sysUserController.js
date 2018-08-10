var express = require('express');
var router = express.Router();
var SysUser = require('./../models/SysUserModel');
var jwt = require('jsonwebtoken');


//判断请求方式获取参数
var getparam = function(req){
    // if (req.method == "POST") {
    //     return req.body;
    // } else{
        return req.query || req.params; 
    // }
}
// router.use(require('../filters/verifyToken'));
//注册账号
router.post('/register',function(req,res){
    var param = getparam(req);
    // param.creattime = Date.now();
    // param.updatatime = Date.now();
    param.nickname = param.loginname;
    SysUser.create(param, function(err, doc){
        if(err){
            var code=err.code , err="账户名以存在"
        } else {
            req.session.uid = doc._id;
        }
        res.json({
            code:code||'0',
            success: true,
            message:err||'注册成功',
            data: doc
        });
    });
})
//登录
router.post('/login',function(req,res){
    var param = getparam(req);
    var query = { loginname:param.loginname, password:param.password };//查询条件
    var fields = { password:0 };//返回结果控制
    SysUser.findOne(query, fields, function(err, doc){
        var msg = doc?"登录成功":"用户名或密码错误";
        var code = doc?"0":"-98";
        var data = {};
        if(doc){
            data['uat'] = jwt.sign({'_id': doc._doc._id },'u_token.key',{
                expiresIn: 60*60*1  // 12小时过期
            });
        }
        res.json({
            code:code,
            success: true,
            message:msg,
            data: data
        });
    });
})
//退出登录
router.post('/logout',function(req,res,next){
    req.session.destroy();
    res.json({
        code:'0',
        success: true,
        message:'退出登录',
        data: null
    });
})
//获取用户列表
router.post('/getAllUser',function(req,res,next){
    var param = getparam(req);
    var query = { isvalid:param.isvalid||1 };
    var fields = { password:0 };
    SysUser.find(query,fields, function(err, docs){
        res.json({
            code:err?err.code:'0',
            success: true,
            message:'成功',
            data: docs
        });
    });
})
//_id获取用户信息
router.post('/getUserInfo',function(req,res){
    var param = getparam(req);
    var fields = { password:0 };
    SysUser.findById(param._id, fields, function(err, doc){
        var msg = doc?"成功":"用户不存在";
        res.json({
            code:err?err.code:'0',
            success: true,
            message: msg,
            data: doc
        });
    });
})
module.exports = router;
