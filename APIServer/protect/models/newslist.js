var mongoose = require('mongoose');
// var mongodb = require('../mongodb');
var Schema = new mongoose.Schema({
	//required 必填,default： 默认值,validate: 自定义匹配(指定一个函数参数为当前字段),min: 最小值(只适用于数字),max: 最大值(只适用于数字),
	//match: 正则匹配(只适用于字符串),	enum:  枚举匹配(只适用于字符串)
    title:{ type: String, required: true },
    img:{ type: Array, default: [] },
    content:{ type: String, default: "" },
    creattime:{ type: Number, default: null },
    updatatime:{ type: Number, default: null }
  });

var newsList = mongoose.model('newsList',Schema);
//DAO
var PaperDAO = function(){};
//保存数据
PaperDAO.prototype.save = function(obj, callback){
	obj.creattime = Date.now();
	obj.updatatime = Date.now();
	var instance = new newsList(obj);
	instance.save(function(err){
		callback(err, null);
	});
}
//获取所有数据
PaperDAO.prototype.getdataList = function(callback){
	newsList.find(function(err,data){
		callback(err, data);
	});
}
//查找符合条件的首条数据 根据id获取数据
PaperDAO.prototype.getdata = function(obj,callback){
	newsList.findOne({_id:obj.id},function(err,data){
		callback(err, data);
	});
}
//根据id更新数据
PaperDAO.prototype.updata = function(obj,callback){
	newsList.update({_id:obj.id},obj,function(err,data){
		callback(err, data);
	});
}
//删除符合条件的第一条数据
PaperDAO.prototype.deleteid = function(obj,callback){
	newsList.findOneAndRemove({_id:obj.id},function(err,data){
		callback(err,data);
	});
} 
module.exports = new PaperDAO();