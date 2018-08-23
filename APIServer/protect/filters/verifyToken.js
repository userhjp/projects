var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //过滤掉请求空参数
    var params = req.query || req.params;
    var param = {};
    for (var index in params) {
    var val = params[index];
    var key =  index;
        if (val !== null && val !== undefined) {
        param[key] = val;
        }
    }
    req.query = param;
    //白名单
    var verify = [
                '/sys/login',
                '/files/upload',
                '/files/delete'
                 ];
    var path = verify.indexOf(req.path);
    if(path == -1){
        var param = req.query;
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
                req.query.loginid = decode._id;
                return next();  
            }
        })
    }else{
        return next(); 
    }
}