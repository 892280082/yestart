var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var config = {
  token: 'wxImaijiManage',
  appid: 'wxad5dce032b11ac9d',
  encodingAESKey: 'IKeuoUMpgM35oH3UWzLy5krPqr8NBBbdQo0LH2JmWYd'
};
/* GET home page. */
module.exports = function(app){
	app.use(express.query());
	app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.FromUserName === 'ganshenme') {
    // 回复屌丝(普通回复)
    res.reply('我们是专业的幼儿教育集团');
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
  	console.log("autoReplay37js",res.session);
  	//res.session.user = "我来了";
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '幼儿教育',
        description: '安徽天启文化科技有限公司',
      }
    ]);
  }
}));


/*类型确定
app.use('/wechat', wechat(config).text(function (message, req, res, next) {
	res.reply("test");
  // TODO
}).image(function (message, req, res, next) {
  // TODO
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
  // TODO
}).device_text(function (message, req, res, next) {
  // TODO
}).device_event(function (message, req, res, next) {
  // TODO
}).middlewarify());
*/


}