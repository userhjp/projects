var mongoose = require('mongoose');
// var mongodb = require('../mongodb');
var Schema = new mongoose.Schema({
	//required 必填,default： 默认值,validate: 自定义匹配(指定一个函数参数为当前字段),min: 最小值(只适用于数字),max: 最大值(只适用于数字),
	//match: 正则匹配(只适用于字符串),	enum:  枚举匹配(只适用于字符串) unique: true 字段唯一
    loginname:{type:String,required:true,unique: true},
    password:{type:String,required:true},
    headimg:{ type: String, default: "" },
    name:{ type: String, default: ""},
    phone:{type:String,default:""},
    email:{type:String,default:""},
    sex:{type:Number,default:0},//0保密1男2女
    signature:{type:String,default:""},//个性签名
    creattime:{ type: Number, default:  Date.now },
    updatatime:{ type: Number, default:  Date.now },
    lastlogintime:{ type: Number, default: null },
    isvalid:{type:Number,default:1}//是否有效
  });

var SysUser = mongoose.model('SysUser',Schema);

module.exports = SysUser;