var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //白名单
    var verify = [
                '/users/login',
                '/files/upload',
                '/files/delete',
                '/users/register',
                '/article/getAllList'
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
                next();  
            }
        })
    }else{
        next();
    }
}