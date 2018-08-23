var express = require('express');
var router = express.Router();
var SysUser = require('./../models/SysUserModel');
var jwt = require('jsonwebtoken');

// router.use(require('../filters/verifyToken'));
//注册账号
router.post('/register',function(req,res){
    var param = req.query
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
    var param = req.query
    var query = { loginname:param.loginname, password:param.password };//查询条件
    var fields = { password:0 };//返回结果控制
    SysUser.findOne(query, fields, function(err, doc){
        var msg = doc?"登录成功":"用户名或密码错误";
        var code = doc?"0":"-98";
        var data = {};
        if(doc){
            data['uat'] = jwt.sign({'_id': doc._doc._id },'u_token.key',{
                expiresIn: 60*60*12  // 12小时过期
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
    var param = req.query
    var pagesize = +param.pagesize||10;//每页条数
    var pagenum = (+param.pagenum-1) * pagesize;//当前页
    var conditions = { 
        isvalid:param.isvalid||1,
        loginname:new RegExp(param['loginname'], 'i'),
        name:new RegExp(param['name'], 'i')
    };
    SysUser.find().count(conditions,function(err,count){
        var pages = Math.ceil(count/pagesize);
        SysUser.find(conditions,{ password:0 },{ sort:({creattime:-1}),skip:pagenum,limit:pagesize }, function(err, docs){
            res.json({
                code:err?err.code:'0',
                success: true,
                message:'成功',
                data: { 
                    pages:pages,
                    total:count,
                    list: docs
                 }
            });
        }).populate({path:'roleids',select:'rolename',match:{},options:{}});
    });
})
//_id获取用户信息
router.post('/getUserInfo',function(req,res){
    var param = req.query
    var uid = param.userid||param.loginid;
    var fields = { password:0 };
    SysUser.findById(uid,fields,function(err, doc){
        var msg = doc?"成功":"用户不存在";
        res.json({
            code:err?err.code:'0',
            success: true,
            message: msg,
            data: doc
        });
    }).populate({path:'roleids',select:{ rolename:1 },match:{},options:{}})
})
//修改/创建
router.post('/addUser',function(req,res){
    var param = req.query
    param['roleids'] = param['roleids']?param['roleids'].split(','):[];
    if(param['_id']){
        var query = { _id:param._id };
        var fields = param;
        var options = { };
        SysUser.update(query, fields, options, function(err, doc){
            var msg = "修改成功";
            if(err){
                if(err.code == 11000){
                    msg = "登录名已存在"
                }else{
                    msg = err.message;
                }
            }
            res.json({
                code:err?err.code:'0',
                success: true,
                message: msg,
                data: null
            });
        });
    }else{
        SysUser.create(param, function(err, doc){
            if(err){
                var code=err.code , err="登录名已存在"
            }
            res.json({
                code:code||'0',
                success: true,
                message:err||'保存成功',
                data: null
            });
        });
    }

})
//_id删除
router.post('/delUser',function(req,res){
    var param = req.query
    var query = { _id:param._id };
    SysUser.remove(query, function(err, doc){
        var msg = doc?"删除成功":"角色不存在";
        res.json({
            code:err?err.code:'0',
            success: true,
            message: msg,
            data: null
        });
    });
})
module.exports = router;
