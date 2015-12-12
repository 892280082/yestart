module.exports = function(app){

//配置全局中间件

//后台路由->学生信息管理
app.use('/back/student', require('./student.js'));

}
