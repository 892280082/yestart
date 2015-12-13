function load(app){
//路由重定向
app.get('/back',function(req,res,next){
	res.redirect('/back/login.html');
})

//后台路由->学生信息管理
app.use('/back/student', require('./student'));


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
