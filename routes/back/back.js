module.exports = function(app){

//配置全局中间件
app.use(function(res,req,next){
	console.log("**run to this**");
	next();
});

//后台路由->学生信息管理
app.use('/back/student', require('./student.js'));

}
