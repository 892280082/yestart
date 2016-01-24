function load(app){
var Connect = require('../../models/connect');
//路由重定向 配置登陆页面
app.get('/back',function(req,res,next){
	res.redirect('/back/page/login1.html');
});

//配置页面限制路由
app.get("/back/page/*",function(req,res,next){
	if(!req.session.admin && req.url != '/back/page/login1.html')
	{
		res.send('false');
	}else{
		next();
	}
});

//配置post方法限制路由
app.post("/back/*",function(req,res,next){
	if(!req.session.admin && req.url != '/back/toLogin'){
		res.json(false);
	}else{
		next();
	}
});


//配置登陆路由
app.post('/back/toLogin',function(req,res,next){
	var name = req.body.name;
	var password = req.body.password;
	Connect.validateUser(name,password,function(err,admin){
		if(err || !admin){ 	//如果出错，或者用户为空则发送失败信息
			res.redirect('/back/page/login1.html');
		}else{
			req.session.admin = admin;
			res.redirect('/back/page/main.html');
		}
	});
});

//配置登出路由
app.get('/back/outLogin',function(req,res){
	console.log(req.session.admin);
	req.session.admin = null;
	res.redirect('/back/page/login1.html');
});


//后台路由->学生信息管理
app.use('/back/student', require('./student'));
app.use('/back/print', require('./print'));


}
module.exports = function(app){
	if(app){
		//加载路由
		load(app);
	}else{
		return {
			//对外提供中间件,一般放置针对自身模块的中间件
			//获取方法 var backMiddle = require('./back')();  backMiddle.tip既可
			tip:function(req,res,next){
				console.log("hello nodeJS i'm a middelWare");
				next();
			}
		}
	}
}
