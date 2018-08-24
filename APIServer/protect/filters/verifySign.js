//请求签名验证
var CryptoJS = require('crypto-js');

module.exports = function(req, res, next){
    var sig = "";
    //过滤掉请求空参数和sig
    var params = req.query || req.params;
    var param = {};
    for (var index in params) {
        var val = params[index];
        var key =  index;
        if (val !== null && val !== undefined) {
            if(key == "sig"){
                sig = val;
            }else{
                param[key] = val;
            }
        }
    }
    req.query = param;
    //白名单
    var verify = [
        '/files/upload',
        '/files/delete'
         ];
    var path = verify.indexOf(req.path);
    if(path == -1){
        var time = Date.parse(new Date());
        if((time - param.ts)>2*60*1000){//当次请求有效2分钟
            return res.send({code:"408",success: true, message:"请求超时"});
        }
        let str = objKeySort(param);
        let sig1 = req.path + "?" + str;
        var sign = CryptoJS.HmacSHA1(sig1, "V7NWdk!0e9-3#Gc.iTappkey").toString(CryptoJS.enc.Hex);
        if(sig != sign){
            return res.send({code:"407",success: true, message:"参数错误"});
        }
    }
    next();
}
function objKeySort(arys) {
    let newkey = Object.keys(arys).sort();
    let parStr = "";
    for (var i = 0; i < newkey.length; i++) {
        parStr += newkey[i] + "=" + arys[newkey[i]] + "&";
    }
    return parStr == "" ? "" : parStr = parStr.substr(0, parStr.length - 1); //返回排好序的新参数
}