var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var session = require('express-session');
var loginfilter = require('./protect/filters/loginFilter');
require('./protect/mongodb')
var app = express();
//设置视图模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
// app.engine('.html', require('ejs').__express);
//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('app-session'));
// 设置 session
app.use(session({
  secret: 'app-session',        //String类型的字符串，作为服务器端生成session的签名。设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
  cookie: { maxAge: 60 * 1000 * 60},
  resave:true,                 //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。默认true
  saveUninitialized:true,            //初始化session时是否保存到存储 默认true
  name: 'session_id'

}));

//登录过滤器
app.use(loginfilter);
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// 错误处理
app.use(function(err, req, res, next) {
  // 设置局部变量，只在开发中提供错误。
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 呈现错误页面
  res.status(err.status || 500);
  res.render('error');
});
//改造路由单独处理
routes(app);
//监听端口  
app.listen(3100);
module.exports = app;
