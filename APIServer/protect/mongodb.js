var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser:true},function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
exports.mongoose = mongoose;