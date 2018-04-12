var mongoose = require('mongoose');
var mongodb = require('../mongodb');
var Schema   = mongoose.Schema;
var articleSchema = new mongoose.Schema({
	//required 必填,default： 默认值,validate: 自定义匹配(指定一个函数参数为当前字段),min: 最小值(只适用于数字),max: 最大值(只适用于数字),
	//match: 正则匹配(只适用于字符串),	enum:  枚举匹配(只适用于字符串)
    img:{ type: Array, default: [] },
    videourl:{ type: String,default: "" },
    content:{ type: String, default: "" },
    creattime:{ type: Number, default: null },
    updatatime:{ type: Number, default: null },
    // username:{type:String, required:true},
    share:{type: Number, default:0},//分享数
    comments:{type:Number,default:0},//评论数
    like:{type:Number,default:0},//点赞数
    pageview:{type:Number,default:0},//浏览量
    uid:{type: Schema.Types.ObjectId,ref:"user", required:true}//根据obj id联合查询其他集合
  });

var article = mongoose.model('article',articleSchema);
//DAO
var PaperDAO = function(){};
//保存数据
PaperDAO.prototype.save = function(obj, callback){
	obj.creattime = Date.now();
	obj.updatatime = Date.now();
	var instance = new article(obj);
	instance.save(function(err){
		callback(err, null);
  });
}
//查询发表动态列表联合用户uid查询
PaperDAO.prototype.findList = function(Obj, callback){
  article.find(null,null,{sort:({creattime:-1}),skip:0,limit:8},(err, data)=>{
    callback(err, data);
  }).populate({path:'uid',select:'headimg nickname',options:{}})
} 

module.exports = new PaperDAO();