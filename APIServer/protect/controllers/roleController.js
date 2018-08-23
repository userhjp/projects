var express = require('express');
var router = express.Router();
var Role = require('./../models/RoleModel');
//var jwt = require('jsonwebtoken');
//新增编辑
router.post('/add',function(req,res){
    var param = req.query;
    param['menukeys'] = param['menukeys'].split(',');
    if(param['_id']){
        var query = { _id:param._id };
        var fields = param;
        var options = { };
        Role.update(query, fields, options, function(err, doc){
            var msg = "修改成功";
            if(err){
                if(err.code == 11000){
                    msg = "角色名已存在"
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
        Role.create(param, function(err, doc){
            if(err){
                var code=err.code , err="角色名已存在"
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
//获取角色列表
router.post('/getList',function(req,res,next){
    var param = req.query
    var query = { };
    var fields = { };
    var resuit = { sort:({createtime:-1}) }//,skip:0,limit:8
    Role.find(query,fields,resuit,function(err, docs){
        res.json({
            code:err?err.code:'0',
            success: true,
            message:'成功',
            data: { roleList: docs }
        });
    });
})
//_id获取角色信息
router.post('/getInfo',function(req,res){
    var param = req.query
    var query = { _id:param._id };
    var fields = { };
    Role.findById(query, fields, function(err, doc){
        var msg = doc?"成功":"角色不存在";
        res.json({
            code:err?err.code:'0',
            success: true,
            message: msg,
            data: doc
        });
    });
})
//_id删除
router.post('/del',function(req,res){
    var param = req.query
    var query = { _id:param._id };
    Role.remove(query, function(err, doc){
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
