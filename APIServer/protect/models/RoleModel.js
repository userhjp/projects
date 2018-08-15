var mongoose = require('mongoose');
// var mongodb = require('../mongodb');
var Schema = new mongoose.Schema({
	//required 必填,default： 默认值,validate: 自定义匹配(指定一个函数参数为当前字段),min: 最小值(只适用于数字),max: 最大值(只适用于数字),
	//match: 正则匹配(只适用于字符串),	enum:  枚举匹配(只适用于字符串) unique: true 字段唯一
    rolename:{ type:String, required:true,unique: true },
    menuids:{ type: Array },
    createtime:{ type: Number, default:  Date.now },
    updatetime:{ type: Number, default:  Date.now },
    isvalid:{ type:Number, default: 1 }
  },{ timestamps:{ createdAt: 'createtime', updatedAt: 'updatetime' } });

var Role = mongoose.model('Role',Schema);

module.exports = Role;