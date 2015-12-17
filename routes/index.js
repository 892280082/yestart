var ueditor = require("ueditor");
var multer = require ( 'multer' ); 
var backRoute = require('./back/index');
var  upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cp) {
            var fileType = file.mimetype.split("/")[0];
            if(fileType == "image"){
                cp(null, '/upload/images');
            }else if(fileType == "video"){
                cp(null, '/upload/video');
            }else{
                 cp(null, '/upload/file');
            }
        },
        filename: function (req, file, cp) {
            var fileType =  file.originalname.split(".").pop();
            var fileTemp = "" +  (new Date()).valueOf()+parseInt(Math.random()*10000)+"."+fileType;
            console.log(fileTemp);
            cp(null,fileTemp);
        }
    })
});

module.exports = function(app,express,viewPath){ 

//peizhishangchuan
app.post('/upload/images',upload.single('fileName'),function(req,res,next){
    res.send(req.file);
    next();
});

//处理下载请求
app.use('/upload/*',function(req,res,next){
    res.download(req.baseUrl);
})

//开发模式下报错处理机制,将错误信息渲染到500.html页面
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', {
      message: err.message,
      error: err
    });
  });
}

//加载back模块路由
backRoute(app);

//配置静态文件目录的处理中间件
//若自定义路由配置在此中间件前,express可以控制用户对静态文件的访问。
//若在此中间件后配置,无法控制用户对静态资源的访问
app.use(express.static(viewPath));

//配置ueditor编辑器的后台
app.use("/public/plugin/ueditor/ueditor", ueditor("", function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url =  app.get('upload_file') + '/images/ueditor';
        //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.ue_up(img_url);
    }
    // ueditor 客户发起上传视频请求
    else if (req.query.action === 'uploadvideo') {
       
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
        res.redirect('/public/plugin/ueditor/nodejs/config.json');
    }
}));



//配置404提示页面
app.use(function(req,res){
    res.redirect('/404.html');
})


};  