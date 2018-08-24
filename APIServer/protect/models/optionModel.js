var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OptionSchema = new mongoose.Schema({
	//required 必填,default： 默认值,validate: 自定义匹配(指定一个函数参数为当前字段),min: 最小值(只适用于数字),max: 最大值(只适用于数字),
	//match: 正则匹配(只适用于字符串),	enum:  枚举匹配(只适用于字符串) unique: true 字段唯一
    label:{ type:String, required:true, validate: { validator: (v) => v.trim().length, message: '名称不能为空'}},
    value:{ type: String, required:true ,validate: { validator: (v) => v.trim().length, message: '编码不能为空'}},
    typecode:{ type: String, required:true,validate: { validator: (v) => v.trim().length, message: '类别编码不能为空'} },
    description:{ type: String },
    createtime:{ type: Number, default:  Date.now },
    updatetime:{ type: Number, default:  Date.now }
  },{ timestamps:{ createdAt: 'createtime', updatedAt: 'updatetime' } });

module.exports = mongoose.model('Option',OptionSchema);;