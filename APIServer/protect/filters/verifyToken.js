var jwt = require('jsonwebtoken');
//判断请求方式获取参数
var getparam = function(req){
    if (req.method == "POST") {
        return req.query;
    } else{
        return req.query || req.params; 
    }
}
module.exports = function(req, res, next){
    //白名单
    var verify = [
                '/sys/login'
                 ];
    var path = verify.indexOf(req.path);
    if(path == -1){
        var param = getparam(req);
        if(!param.uat){
            return res.send({code:"401",success: true, message:"uat不能为空"});
        } 

        jwt.verify(param.uat, 'u_token.key', function (err, decode) {
            if (err) {  //  时间失效的时候/ 伪造的token
                if(err.message == "jwt expired"){
                    return res.send({code:"401",success: true, message:"登录过期,请重新登录"});
                }else{
                    return res.send({code:"401",success: true, message:"无效的uat"});
                }        
            } else {
                req.query._id = decode._id;
                return next();  
            }
        })
    }else{
        return next(); 
    }
}