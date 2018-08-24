/**
 * 字典表 增删查改
 */
var express = require('express');
var router = express.Router();
var Option = require('./../models/optionModel');

//修改/创建
router.post('/edit',function(req,res){
    var param = req.query
    if(param['_id']){
        var conditions = { _id:param._id };
        var fields = param;
        var options = { };
        Option.update(conditions, fields, options, function(err, doc){
            res.json({
                code:err?err.code:'0',
                success: true,
                message: msg,
                data: null
            });
        });
    }else{
        Option.create(param, function(err, doc){
            res.json({
                code:err?err.code:'0',
                success: true,
                message:err?err.message:'保存成功',
                data: null
            });
        });
    }

})
//_id获取
router.post('/getInfo',function(req,res){
    var param = req.query
    var query = { _id:param._id };
    var fields = { };
    Option.findById(query, fields, function(err, doc){
        var msg = doc?"成功":"_id不存在";
        res.json({
            code:err?err.code:'0',
            success: true,
            message: msg,
            data: doc
        });
    });
})
//获取列表
router.post('/getAllList',function(req,res,next){
    var param = req.query
    var pagesize = +param.pagesize||10;//每页条数
    var pagenum = (+param.pagenum-1) * pagesize;//当前页
    var conditions = { 
        isvalid:param.isvalid||1,
        loginname:new RegExp(param['typecode'], 'i'),
        name:new RegExp(param['label'], 'i')
    };
    Option.find().countDocuments(conditions,function(err,count){
        var pages = Math.ceil(count/pagesize);
        Option.find(conditions,{ password:0 },{ sort:({creattime:-1}),skip:pagenum,limit:pagesize }, function(err, docs){
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
        });
    });
})
//类型列表
router.post('/getType',function(req,res){
    Option.find(null, { typecode:1, _id:0 },{ sort:({creattime:-1}) }, function(err, docs){
        var msg = docs?"成功":"查询错误";
        res.json({
            code:err?err.code:'0',
            success: true,
            message: msg,
            data: docs
        });
    });
})
//_id删除
router.post('/del',function(req,res){
    var param = req.query
    var ids = param._ids.split(',');
    var conditions = { _id:{ $in: ids } };
    Option.remove(conditions, function(err, doc){
        var msg = doc?"删除成功":"_id不存在";
        res.json({
            code:err?err.code:'0',
            success: true,
            message: msg,
            data: null
        });
    });
})
module.exports = router;
