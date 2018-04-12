var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
exports.mongoose = mongoose;