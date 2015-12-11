var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require("ueditor");
var ejs = require('ejs');
var setttings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

// view engine setup
app.engine('.html',ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('upload_file','/upload');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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

// 下面两段代码设置报错的处理机制
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('back/errorStack', {
    message: err.message,
    error: {}
  });
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('back/error', {
      message: err.message,
      error: err
    });
  });
}

//页面重定向
app.get("/",function(req,res){
  res.redirect("/back");
})

app.use('/back', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/angular', require('./routes/angular'));

//ueditor
app.use("/ueditor/ueditor", ueditor("", function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url =  app.get('upload_file') + '/images/ueditor';
        //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.ue_up(img_url);
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = app.get('upload_file') + '/images/ueditor';
        // 客户端会列出 dir_url 目录下的所有图片
        res.ue_list(dir_url);
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

//down
app.use('/upload/*',function(req,res,next){
  res.download(req.baseUrl);
})


app.listen(3000);
module.exports = app;
