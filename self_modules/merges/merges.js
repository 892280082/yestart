//根据mongoose对象,获取req中的属性，返回原始对象
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
				flag = true;
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

//根据对象objectId更新对象信息
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

//通过objectId删除对象
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

//获取分页信息
function getPage(query,constructor,callback){
	var currentPage = query._currentPage;
	var itemsPerPage = query._itemsPerPage;
	delete query._currentPage;
	delete query._itemsPerPage;

	constructor.count(query,function(err,totalItems){
		if(err){
			return callback(err);
		}
		var pageInfo = {
			'currentPage':currentPage,
			'itemsPerPage':itemsPerPage,
			'totalItems':totalItems
		}
		if(totalItems == 0 ){
			return 	callback(err,{
				'collection':null,
				'pageInfo':pageInfo
			});
		}
		constructor.find(query).skip((currentPage - 1)*itemsPerPage).limit(itemsPerPage).exec(function(err,docs){ 
			callback(err,{
				'collection':docs,
				'pageInfo':pageInfo
			});
		});
	});
}

//保存对象，并返回保存后的对象
function save(req,constructor,callback){
	var cons_pojo = copy(req,constructor);
	cons_pojo.save(function(err){
		callback(err,cons_pojo);
	});
}

//得到查询对象,并添加分页属性
function getQuery(req,constructor,option){
	var pojo = getPojo(req,constructor);
	for(var p in pojo){
		if(typeof pojo[p] == "function" || pojo[p] == "")
		{
			delete pojo[p];
			continue;
		}
		if(option[p] == "like"){
			pojo[p] = {$regex: pojo[p], $options:'i'}
		}
	}
	pojo._currentPage = req.body.currentPage || req.params.currentPage ||  req.query.currentPage || 1;
	pojo._itemsPerPage = req.body.itemsPerPage || req.params.itemsPerPage || req.query.itemsPerPage || 10;
	return pojo;
}

//提供对外接口
var merges = {
	//查询req对象 最终返回mongoose entity实例
	'copy':copy,
	//关联scheduleModel对象
	'create':createModel,
	//根据对象objectId更新对象信息
	'updateById':updateById,
	//通过objectId删除对象
	'removeById':removeById,
	//保存对象，并返回保存后的对象
	'save':save,
	//获取分页信息
	'getPage':getPage,
	//得到查询对象,并添加分页属性
	'getQuery':getQuery
}

module.exports = merges;