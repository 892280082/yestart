var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var setttings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var router = require('./routes/index');
var app = express();

//配置服务端口
app.set('servicePort',3000);

// 配置渲染引擎_dirname全局变量项目在系统的绝对路径
app.engine('.html',ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//设置上传下载根目录,是根据系统的绝对路径
app.set('upload_file','/upload');

//配置日志
app.use(logger('dev'));
//配置解析请求参数的中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//连接数据库
mongoose.connect('mongodb://localhost/yestart');

//配置第三方session
app.use(session({
  secret:setttings.cookieSecret,
  key:setttings.db,
  cookie:{ secure:false,maxAge:1000*60*60*24*30},
  store:new MongoStore({
    db:setttings.db,
    host:setttings.host,
    port:setttings.port
  })
}));

//配置路由
router(app,express,path.join(__dirname, 'views'));

//启动http服务
app.listen(app.get('servicePort'),function(){
	console.log("http 服务已启动，端口:"+app.get('servicePort'));
});

//提供对外接口,给第三方插件调用
module.exports = app;
