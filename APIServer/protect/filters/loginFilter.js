var jwt = require('jsonwebtoken');
module.exports = function(req, res, next){
    var param = getparam(req);
    var verify = [
                '/users/getUserInfo',
                '/article/publish'
                 ];
    var path = verify.indexOf(req.path);
    if(path != -1){
        if(req.session.uid && param.uid){
            next();
        }else{
            if(param.uid){
                res.json({code:"401",success: true, message:"登录过期,请重新登录"});
            }else{
                res.json({code:"401",success: true, message:"未登录"});
            }
                res.end();
        }
    }else{
        next();
    }
}