//获得原始pojo对象
function getPojo(req,constructor){
	var pojo = new constructor._pojo_constructor();
	var option = {
		'body':req.body,
		'params':req.params,
		'query':req.query
	}
	var option_index = 0;
	var option_length = Object.getOwnPropertyNames(option).length;
	for(var o in option){
		option_index++;
		if(typeof option[o] != "undefined"){
			 copyParam(option[o],pojo,option_length == option_index);
		}
	}
	return pojo;
};

//复制参数
function copyParam(param,pojo,show){
	for(var p in pojo){
		var flag = false;
		if(typeof param[p] != "undefined"){
			if(pojo[p] == String){
				pojo[p] = param[p];
				flag = true;
			}
			if(pojo[p] == Number){
				pojo[p] = Number(param[p]);
			}
			if(pojo[p] == Date ){
				var timeStr = param[p];
				timeStr = timeStr.replace(/-/g,"/");
				pojo[p] =  new Date(timeStr);
				flag = true;
			}
			if(!flag && show){
				console.log("[meger_error:]  "+p+"  property not copy!");
			}
		}
	}
	return pojo;
};

//循环req对象 最终返回mongoose entity实例
function copy(req,constructor){
	var pojo = getPojo(req,constructor);
	return constructor(pojo);
}

//关联scheduleModel对象
function createModel(origin,func){
	func._pojo_constructor = origin;
	return func;
}

function updateById(req,constructor,callback){
	var _id = req.body._id || req.params._id || req.query._id;
	if(!_id){
		throw "merges updateById Error: you should send _id param";
		return callback(true);
	}
	var pojo = getPojo(req,constructor);
	for(var p in pojo){
		if(typeof pojo[p] == "function")delete pojo[p];
	}
	constructor.update({'_id':_id},pojo,function(err,docs){
		callback(err,docs);
	});
};

function removeById(req,constructor,callback){
	var _id = req.body._id || req.params._id || req.query._id;
	if(!_id){
		throw "merges removeByid Error: you should send _id param";
		return callback(true);
	}
	constructor.remove({'_id':_id},function(err,docs){
		callback(err,docs);
	});
}

function getPage(query,req,constructor,callback){
	var curPage = req.body.curPage || req.params.curPage || 
	req.query.curPage || 1;
	var pageSize = req.body._id || req.params._id || req.query._id || 5;
	constructor.count(function(err,count){
		if(err){
			return callback(err);
		}
		var pageInfo = {
			curPage:curPage,
			pageSize:pageSize,
			count:count
		}
		if(count == 0 ){
			return 	callback(err,docs,pageInfo);
		}
		constructor.find(query).skip(curPage).limit(pageSize).exec(function(err,docs){ 
			callback(err,docs,pageInfo);
		});
	});
}


function save(req,constructor,callback){
	var admin = copy(req,Admin);
	admin.save(function(err){
		callback(err);
	});
}

//提供对外接口
var merges = {
	'copy':copy,
	'create':createModel,
	'updateById':updateById,
	'removeById':removeById,
	'save':save,
	'getPage':getPage
}

module.exports = merges;