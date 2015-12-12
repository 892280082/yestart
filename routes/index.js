var ueditor = require("ueditor");


module.exports = function(app,express,path){ 

//开发模式下报错处理机制
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', {
      message: err.message,
      error: err
    });
  });
}


//后台路由
require('./back/back')(app);


//配置静态文件目录
app.use(express.static(path.join(__dirname, 'views')));



//配置ueditor编辑器后台
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

//处理下载请求
app.use('/upload/*',function(req,res,next){
  res.download(req.baseUrl);
})

//配置404
app.use(function(req,res){
  res.send("404 error");
})


};  