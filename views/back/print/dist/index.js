!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(6);var r=n(7);n(3),n(4),n(5),n(2),n(1);var o=r.module("myApp",["angularFileUpload","service.showCtrl","service.dataService","controller.main"]);o.directive("tsTool",function(){return{restrict:"EAC",templateUrl:"tools"}}).directive("tsList",function(){return{restrict:"EAC",templateUrl:"list"}}).directive("tsAdd",function(){return{restrict:"EAC",templateUrl:"add"}}).directive("tsDealpro",function(){return{restrict:"EAC",templateUrl:"dealpro"}}).directive("tsProlist",function(){return{restrict:"EAC",templateUrl:"prolist"}}).directive("tsProadd",function(){return{restrict:"EAC",templateUrl:"proadd"}})},function(e,t,n){angular.module("controller.main",["ng.ueditor"]).controller("main",["$scope","showCtrl","dataService","FileUploader",function(e,t,n,r){e.show=t,e.show.$regist("list",["tools","list"],!0),e.show.$regist("add",["add"]),e.show.$regist("dealpro",["dealpro"]),e.show.$regist("prolist",["prolist"]),e.show.$regist("proadd",["proadd"]),e.loadPageInfo={top:"\u5546\u54c1\u7ba1\u7406",name:"",cateName:"",proName:""},e.temp=null,e.li_click=function(t,n){e.focus=t,e.temp=n},e.upPojo={};var o=e.uploader=new r({url:"/upload",alias:"fileName"});o.onAfterAddingFile=function(e){e.upload()},o.onCompleteItem=function(t,n,r,o){e.upPojo.picUrl=n.path,e.pushProductPojo.pojo.picture=n.path},e.save=function(){e.upPojo._id?n.update(e.upPojo).success(function(e){"true"!=e&&alert("\u66f4\u65b0\u51fa\u9519")}):n.saveTitle(e.upPojo).success(function(t){e.datas.push(t)}),e.show.$set("list")},n.getList(null).success(function(t){e.datas=t}),e.remove=function(t){n.remove(t._id).success(function(n){"true"==n&&e.datas.remove(t)}),e.temp=null},e.doSort=function(e,t){e.sort+=t,n.update(e).success(function(e){})},e.typeArray=[],e._pushTypePojo={_id:"",pojo:{cateName:"",productArray:[]}},e.showTypeArray=function(t){e._pushTypePojo._id=t._id,e.typeArray=t.typeArray,e.loadPageInfo.name=t.title},e.removeCate=function(t){var r={_id:e._pushTypePojo._id,_cateId:t._id};n.pullTypeArray(r).success(function(n){n?e.typeArray.remove(t):console.log("\u5220\u9664\u9519\u8bef")})},e.addTypeCate=function(){n.pushTypeArray(e._pushTypePojo).success(function(t){t&&(e.typeArray.push(t),e._pushTypePojo.pojo.cateName="")})},e.toTypeArray=function(t){e.loadPageInfo.cateName=t.cateName,e.pushProductPojo._cateId=t._id,e.tempProType=t,e.show.$set("prolist")},e.tempProType={},e.pushProductPojo={_id:"",_cateId:"",pojo:{}},e.saveDealPro=function(){e.pushProductPojo._id=e._pushTypePojo._id,e.pushProductPojo.pojo._id?n.editTypeProPro(e.pushProductPojo).success(function(t){t&&(e.show.$set("prolist"),e.pushProductPojo.pojo={})}):n.pushProductArray(e.pushProductPojo).success(function(t){t&&(e.tempProType.productArray.push(t),e.show.$set("prolist"),e.pushProductPojo.pojo={})})},e.pullProductArray=function(t){var r={_id:e._pushTypePojo._id,_cateId:e.pushProductPojo._cateId,_productId:t._id};n.pullProductArray(r).success(function(n){n&&e.tempProType.productArray.remove(t),console.log("\u5220\u9664\u9519\u8bef")})},e.editProduct=function(t){e.loadPageInfo.proName=t.name,e.pushProductPojo.pojo=t,e.show.$set("proadd")}}])},function(e,t,n){angular.module("service.dataService",[]).service("dataService",["$http",function(e){this.saveTitle=function(t){return e.post("/back/print/saveTitle",{upPojo:t})},this.getList=function(t){return e.post("/back/print/getList",{searchPojo:t})},this.update=function(t){return e.post("/back/print/updatePro",{updatePojo:t})},this.remove=function(t){return e.post("/back/print/removePro",{_id:t})},this.pushTypeArray=function(t){return e.post("/back/print/pushTypeArray",{pushPojo:t})},this.pullTypeArray=function(t){return e.post("/back/print/pullTypeArray",{pullPojo:t})},this.pushProductArray=function(t){return e.post("/back/print/pushProductArray",{upPojo:t})},this.pullProductArray=function(t){return e.post("/back/print/pullProductArray",{pullPojo:t})},this.editTypeProPro=function(t){return e.post("/back/print/editTypeProPro",{editPojo:t})}}])},function(e,t,n){angular.module("service.showCtrl",[]).service("showCtrl",[function(){this._currentName="",this._registContent={},this.$regist=function(e,t,n){this._registContent[e]=t,n&&this.$set(e)},this.$set=function(e){var t=this._registContent[this._currentName];if(t)for(var n=0;n<t.length;n++)delete this[t[n]];if(t=this._registContent[e],!t)throw"you  dont regist the name";for(var n=0;n<t.length;n++)this[t[n]]=!0;this._currentName=e},this.$remove=function(e){delete this._registContent[e]},this.$init=function(){return this._registContent={},this._currentName="",this}}])},function(e,t,n){(function(){"use strict";!function(){var e;e=angular.module("ng.ueditor",[]),e.directive("ueditor",[function(){return{restrict:"C",require:"ngModel",scope:{config:"=",ready:"="},link:function(e,t,n,r){var o,i;i=!1,new(o=function(){function o(){this.bindRender(),this.initEditor()}return o.prototype.initEditor=function(){var o,s,u;return u=this,"undefined"==typeof UE?void console.error("Please import the local resources of ueditor!"):(o=e.config?e.config:{},s=n.id?n.id:"_editor"+Date.now(),t[0].id=s,this.editor=new UE.ui.Editor(o),this.editor.render(s),this.editor.ready(function(){u.editorReady=!0,u.editor.addListener("contentChange",function(){r.$setViewValue(u.editor.getContent()),i||e.$$phase||e.$apply(),i=!1}),u.modelContent&&u.modelContent.length>0&&u.setEditorContent(),"function"==typeof e.ready&&e.ready(u.editor),e.$on("$destroy",function(){!n.id&&UE.delEditor&&UE.delEditor(s)})}))},o.prototype.setEditorContent=function(e){null==e&&(e=this.modelContent),this.editor&&this.editorReady&&this.editor.setContent(e)},o.prototype.bindRender=function(){var e;e=this,r.$render=function(){e.modelContent=r.$isEmpty(r.$viewValue)?"":r.$viewValue,i=!0,e.setEditorContent()}},o}())}}}])}()}).call(this)},function(e,t,n){!function(t,n){e.exports=n()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=r(n(1)),i=r(n(2)),s=r(n(3)),u=r(n(4)),a=r(n(5)),l=r(n(6)),c=r(n(7)),p=r(n(8)),f=r(n(9)),d=r(n(10)),h=r(n(11)),v=r(n(12));angular.module(o.name,[]).value("fileUploaderOptions",i).factory("FileUploader",s).factory("FileLikeObject",u).factory("FileItem",a).factory("FileDirective",l).factory("FileSelect",c).factory("FileDrop",p).factory("FileOver",f).directive("nvFileSelect",d).directive("nvFileDrop",h).directive("nvFileOver",v).run(["FileUploader","FileLikeObject","FileItem","FileDirective","FileSelect","FileDrop","FileOver",function(e,t,n,r,o,i,s){e.FileLikeObject=t,e.FileItem=n,e.FileDirective=r,e.FileSelect=o,e.FileDrop=i,e.FileOver=s}])},function(e,t){e.exports={name:"angularFileUpload"}},function(e,t){"use strict";e.exports={url:"/",alias:"file",headers:{},queue:[],progress:0,autoUpload:!1,removeAfterUpload:!1,method:"POST",filters:[],formData:[],queueLimit:Number.MAX_VALUE,withCredentials:!1}},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.copy),u=angular.extend,a=angular.forEach,l=angular.isObject,c=angular.isNumber,p=angular.isDefined,f=angular.isArray,d=angular.element;e.exports=function(e,t,n,r,h,v){var m=r.File,_=r.FormData,g=function(){function r(t){i(this,r);var n=s(e);u(this,n,t,{isUploading:!1,_nextIndex:0,_failFilterIndex:-1,_directives:{select:[],drop:[],over:[]}}),this.filters.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.filters.unshift({name:"folder",fn:this._folderFilter})}return o(r,{addToQueue:{value:function(e,t,n){var r=this,o=this.isArrayLikeObject(e)?e:[e],i=this._getFilters(n),s=this.queue.length,u=[];a(o,function(e){var n=new h(e);if(r._isValidFile(n,i,t)){var o=new v(r,e,t);u.push(o),r.queue.push(o),r._onAfterAddingFile(o)}else{var s=i[r._failFilterIndex];r._onWhenAddingFileFailed(n,s,t)}}),this.queue.length!==s&&(this._onAfterAddingAll(u),this.progress=this._getTotalProgress()),this._render(),this.autoUpload&&this.uploadAll()}},removeFromQueue:{value:function(e){var t=this.getIndexOfItem(e),n=this.queue[t];n.isUploading&&n.cancel(),this.queue.splice(t,1),n._destroy(),this.progress=this._getTotalProgress()}},clearQueue:{value:function(){for(;this.queue.length;)this.queue[0].remove();this.progress=0}},uploadItem:{value:function(e){var t=this.getIndexOfItem(e),n=this.queue[t],r=this.isHTML5?"_xhrTransport":"_iframeTransport";n._prepareToUploading(),this.isUploading||(this.isUploading=!0,this[r](n))}},cancelItem:{value:function(e){var t=this.getIndexOfItem(e),n=this.queue[t],r=this.isHTML5?"_xhr":"_form";n&&n.isUploading&&n[r].abort()}},uploadAll:{value:function(){var e=this.getNotUploadedItems().filter(function(e){return!e.isUploading});e.length&&(a(e,function(e){return e._prepareToUploading()}),e[0].upload())}},cancelAll:{value:function(){var e=this.getNotUploadedItems();a(e,function(e){return e.cancel()})}},isFile:{value:function(e){return this.constructor.isFile(e)}},isFileLikeObject:{value:function(e){return this.constructor.isFileLikeObject(e)}},isArrayLikeObject:{value:function(e){return this.constructor.isArrayLikeObject(e)}},getIndexOfItem:{value:function(e){return c(e)?e:this.queue.indexOf(e)}},getNotUploadedItems:{value:function(){return this.queue.filter(function(e){return!e.isUploaded})}},getReadyItems:{value:function(){return this.queue.filter(function(e){return e.isReady&&!e.isUploading}).sort(function(e,t){return e.index-t.index})}},destroy:{value:function(){var e=this;a(this._directives,function(t){a(e._directives[t],function(e){e.destroy()})})}},onAfterAddingAll:{value:function(e){}},onAfterAddingFile:{value:function(e){}},onWhenAddingFileFailed:{value:function(e,t,n){}},onBeforeUploadItem:{value:function(e){}},onProgressItem:{value:function(e,t){}},onProgressAll:{value:function(e){}},onSuccessItem:{value:function(e,t,n,r){}},onErrorItem:{value:function(e,t,n,r){}},onCancelItem:{value:function(e,t,n,r){}},onCompleteItem:{value:function(e,t,n,r){}},onCompleteAll:{value:function(){}},_getTotalProgress:{value:function(e){if(this.removeAfterUpload)return e||0;var t=this.getNotUploadedItems().length,n=t?this.queue.length-t:this.queue.length,r=100/this.queue.length,o=(e||0)*r/100;return Math.round(n*r+o)}},_getFilters:{value:function(e){if(!e)return this.filters;if(f(e))return e;var t=e.match(/[^\s,]+/g);return this.filters.filter(function(e){return-1!==t.indexOf(e.name)})}},_render:{value:function(){t.$$phase||t.$apply()}},_folderFilter:{value:function(e){return!(!e.size&&!e.type)}},_queueLimitFilter:{value:function(){return this.queue.length<this.queueLimit}},_isValidFile:{value:function(e,t,n){var r=this;return this._failFilterIndex=-1,t.length?t.every(function(t){return r._failFilterIndex++,t.fn.call(r,e,n)}):!0}},_isSuccessCode:{value:function(e){return e>=200&&300>e||304===e}},_transformResponse:{value:function(e,t){var r=this._headersGetter(t);return a(n.defaults.transformResponse,function(t){e=t(e,r)}),e}},_parseHeaders:{value:function(e){var t,n,r,o={};return e?(a(e.split("\n"),function(e){r=e.indexOf(":"),t=e.slice(0,r).trim().toLowerCase(),n=e.slice(r+1).trim(),t&&(o[t]=o[t]?o[t]+", "+n:n)}),o):o}},_headersGetter:{value:function(e){return function(t){return t?e[t.toLowerCase()]||null:e}}},_xhrTransport:{value:function(e){var t=this,n=e._xhr=new XMLHttpRequest,r=new _;if(this._onBeforeUploadItem(e),a(e.formData,function(e){a(e,function(e,t){r.append(t,e)})}),"number"!=typeof e._file.size)throw new TypeError("The file specified is no longer valid");r.append(e.alias,e._file,e.file.name),n.upload.onprogress=function(n){var r=Math.round(n.lengthComputable?100*n.loaded/n.total:0);t._onProgressItem(e,r)},n.onload=function(){var r=t._parseHeaders(n.getAllResponseHeaders()),o=t._transformResponse(n.response,r),i=t._isSuccessCode(n.status)?"Success":"Error",s="_on"+i+"Item";t[s](e,o,n.status,r),t._onCompleteItem(e,o,n.status,r)},n.onerror=function(){var r=t._parseHeaders(n.getAllResponseHeaders()),o=t._transformResponse(n.response,r);t._onErrorItem(e,o,n.status,r),t._onCompleteItem(e,o,n.status,r)},n.onabort=function(){var r=t._parseHeaders(n.getAllResponseHeaders()),o=t._transformResponse(n.response,r);t._onCancelItem(e,o,n.status,r),t._onCompleteItem(e,o,n.status,r)},n.open(e.method,e.url,!0),n.withCredentials=e.withCredentials,a(e.headers,function(e,t){n.setRequestHeader(t,e)}),n.send(r),this._render()}},_iframeTransport:{value:function(e){var t=this,n=d('<form style="display: none;" />'),r=d('<iframe name="iframeTransport'+Date.now()+'">'),o=e._input;e._form&&e._form.replaceWith(o),e._form=n,this._onBeforeUploadItem(e),o.prop("name",e.alias),a(e.formData,function(e){a(e,function(e,t){var r=d('<input type="hidden" name="'+t+'" />');r.val(e),n.append(r)})}),n.prop({action:e.url,method:"POST",target:r.prop("name"),enctype:"multipart/form-data",encoding:"multipart/form-data"}),r.bind("load",function(){var n="",o=200;try{n=r[0].contentDocument.body.innerHTML}catch(i){o=500}var s={response:n,status:o,dummy:!0},u={},a=t._transformResponse(s.response,u);t._onSuccessItem(e,a,s.status,u),t._onCompleteItem(e,a,s.status,u)}),n.abort=function(){var i,s={status:0,dummy:!0},u={};r.unbind("load").prop("src","javascript:false;"),n.replaceWith(o),t._onCancelItem(e,i,s.status,u),t._onCompleteItem(e,i,s.status,u)},o.after(n),n.append(o).append(r),n[0].submit(),this._render()}},_onWhenAddingFileFailed:{value:function(e,t,n){this.onWhenAddingFileFailed(e,t,n)}},_onAfterAddingFile:{value:function(e){this.onAfterAddingFile(e)}},_onAfterAddingAll:{value:function(e){this.onAfterAddingAll(e)}},_onBeforeUploadItem:{value:function(e){e._onBeforeUpload(),this.onBeforeUploadItem(e)}},_onProgressItem:{value:function(e,t){var n=this._getTotalProgress(t);this.progress=n,e._onProgress(t),this.onProgressItem(e,t),this.onProgressAll(n),this._render()}},_onSuccessItem:{value:function(e,t,n,r){e._onSuccess(t,n,r),this.onSuccessItem(e,t,n,r)}},_onErrorItem:{value:function(e,t,n,r){e._onError(t,n,r),this.onErrorItem(e,t,n,r)}},_onCancelItem:{value:function(e,t,n,r){e._onCancel(t,n,r),this.onCancelItem(e,t,n,r)}},_onCompleteItem:{value:function(e,t,n,r){e._onComplete(t,n,r),this.onCompleteItem(e,t,n,r);var o=this.getReadyItems()[0];return this.isUploading=!1,p(o)?void o.upload():(this.onCompleteAll(),this.progress=this._getTotalProgress(),void this._render())}}},{isFile:{value:function(e){return m&&e instanceof m}},isFileLikeObject:{value:function(e){return e instanceof h}},isArrayLikeObject:{value:function(e){return l(e)&&"length"in e}},inherit:{value:function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.super_=t}}}),r}();return g.prototype.isHTML5=!(!m||!_),g.isHTML5=g.prototype.isHTML5,g},e.exports.$inject=["fileUploaderOptions","$rootScope","$http","$window","FileLikeObject","FileItem"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.copy),u=angular.isElement,a=angular.isString;e.exports=function(){var e=function(){function e(t){i(this,e);var n=u(t),r=n?t.value:t,o=a(r)?"FakePath":"Object",s="_createFrom"+o;this[s](r)}return o(e,{_createFromFakePath:{value:function(e){this.lastModifiedDate=null,this.size=null,this.type="like/"+e.slice(e.lastIndexOf(".")+1).toLowerCase(),this.name=e.slice(e.lastIndexOf("/")+e.lastIndexOf("\\")+2)}},_createFromObject:{value:function(e){this.lastModifiedDate=s(e.lastModifiedDate),this.size=e.size,this.type=e.type,this.name=e.name}}}),e}();return e},e.exports.$inject=[]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.copy),u=angular.extend,a=angular.element,l=angular.isElement;e.exports=function(e,t){var n=function(){function n(e,r,o){i(this,n);var c=l(r),p=c?a(r):null,f=c?null:r;u(this,{url:e.url,alias:e.alias,headers:s(e.headers),formData:s(e.formData),removeAfterUpload:e.removeAfterUpload,withCredentials:e.withCredentials,method:e.method},o,{uploader:e,file:new t(r),isReady:!1,isUploading:!1,isUploaded:!1,isSuccess:!1,isCancel:!1,isError:!1,progress:0,index:null,_file:f,_input:p}),p&&this._replaceNode(p)}return o(n,{upload:{value:function(){try{this.uploader.uploadItem(this)}catch(e){this.uploader._onCompleteItem(this,"",0,[]),this.uploader._onErrorItem(this,"",0,[])}}},cancel:{value:function(){this.uploader.cancelItem(this)}},remove:{value:function(){this.uploader.removeFromQueue(this)}},onBeforeUpload:{value:function(){}},onProgress:{value:function(e){}},onSuccess:{value:function(e,t,n){}},onError:{value:function(e,t,n){}},onCancel:{value:function(e,t,n){}},onComplete:{value:function(e,t,n){}},_onBeforeUpload:{value:function(){this.isReady=!0,this.isUploading=!0,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()}},_onProgress:{value:function(e){this.progress=e,this.onProgress(e)}},_onSuccess:{value:function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=null,this.onSuccess(e,t,n)}},_onError:{value:function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=null,this.onError(e,t,n)}},_onCancel:{value:function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=null,this.onCancel(e,t,n)}},_onComplete:{value:function(e,t,n){this.onComplete(e,t,n),this.removeAfterUpload&&this.remove()}},_destroy:{value:function(){this._input&&this._input.remove(),this._form&&this._form.remove(),delete this._form,delete this._input}},_prepareToUploading:{value:function(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0}},_replaceNode:{value:function(t){var n=e(t.clone())(t.scope());n.prop("value",null),t.css("display","none"),t.after(n)}}}),n}();return n},e.exports.$inject=["$compile","FileLikeObject"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.extend);e.exports=function(){var e=function(){function e(t){i(this,e),s(this,t),this.uploader._directives[this.prop].push(this),this._saveLinks(),this.bind()}return o(e,{bind:{value:function(){for(var e in this.events){var t=this.events[e];this.element.bind(e,this[t])}}},unbind:{value:function(){for(var e in this.events)this.element.unbind(e,this.events[e])}},destroy:{value:function(){var e=this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(e,1),this.unbind()}},_saveLinks:{value:function(){for(var e in this.events){var t=this.events[e];this[t]=this[t].bind(this)}}}}),e}();return e.prototype.events={},e},e.exports.$inject=[]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function l(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:l(o,t,n)}if("value"in r&&r.writable)return r.value;var i=r.get;return void 0===i?void 0:i.call(n)},s=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},u=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},a=(r(n(1)),angular.extend);e.exports=function(e){var t=function(e){function t(e){u(this,t);var n=a(e,{events:{$destroy:"destroy",change:"onChange"},prop:"select"});i(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,n),this.uploader.isHTML5||this.element.removeAttr("multiple"),this.element.prop("value",null)}return s(t,e),o(t,{getOptions:{value:function(){}},getFilters:{value:function(){}},isEmptyAfterSelection:{value:function(){return!!this.element.attr("multiple")}},onChange:{value:function(){var e=this.uploader.isHTML5?this.element[0].files:this.element[0],t=this.getOptions(),n=this.getFilters();this.uploader.isHTML5||this.destroy(),this.uploader.addToQueue(e,t,n),this.isEmptyAfterSelection()&&(this.element.prop("value",null),this.element.replaceWith(this.element=this.element.clone(!0)))}}}),t}(e);return t},e.exports.$inject=["FileDirective"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function c(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:c(o,t,n)}if("value"in r&&r.writable)return r.value;var i=r.get;return void 0===i?void 0:i.call(n)},s=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},u=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},a=(r(n(1)),angular.extend),l=angular.forEach;e.exports=function(e){var t=function(e){function t(e){u(this,t);var n=a(e,{events:{$destroy:"destroy",drop:"onDrop",dragover:"onDragOver",dragleave:"onDragLeave"},prop:"drop"});i(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,n)}return s(t,e),o(t,{getOptions:{value:function(){}},getFilters:{value:function(){}},onDrop:{value:function(e){var t=this._getTransfer(e);if(t){var n=this.getOptions(),r=this.getFilters();this._preventAndStop(e),l(this.uploader._directives.over,this._removeOverClass,this),this.uploader.addToQueue(t.files,n,r)}}},onDragOver:{value:function(e){var t=this._getTransfer(e);this._haveFiles(t.types)&&(t.dropEffect="copy",this._preventAndStop(e),l(this.uploader._directives.over,this._addOverClass,this))}},onDragLeave:{value:function(e){e.currentTarget!==this.element[0]&&(this._preventAndStop(e),l(this.uploader._directives.over,this._removeOverClass,this))}},_getTransfer:{value:function(e){return e.dataTransfer?e.dataTransfer:e.originalEvent.dataTransfer}},_preventAndStop:{value:function(e){e.preventDefault(),e.stopPropagation()}},_haveFiles:{value:function(e){return e?e.indexOf?-1!==e.indexOf("Files"):e.contains?e.contains("Files"):!1:!1}},_addOverClass:{value:function(e){e.addOverClass()}},_removeOverClass:{value:function(e){e.removeOverClass()}}}),t}(e);return t},e.exports.$inject=["FileDirective"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},o=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function l(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:l(o,t,n)}if("value"in r&&r.writable)return r.value;var i=r.get;return void 0===i?void 0:i.call(n)},s=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},u=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},a=(r(n(1)),angular.extend);e.exports=function(e){var t=function(e){function t(e){u(this,t);var n=a(e,{events:{$destroy:"destroy"},prop:"over",overClass:"nv-file-over"});i(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,n)}return s(t,e),o(t,{addOverClass:{value:function(){this.element.addClass(this.getOverClass())}},removeOverClass:{value:function(){this.element.removeClass(this.getOverClass())}},getOverClass:{value:function(){return this.overClass}}}),t}(e);return t},e.exports.$inject=["FileDirective"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};r(n(1)),e.exports=function(e,t,n){return{link:function(r,o,i){var s=r.$eval(i.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');var u=new n({uploader:s,element:o});u.getOptions=e(i.options).bind(u,r),u.getFilters=function(){return i.filters}}}},e.exports.$inject=["$parse","FileUploader","FileSelect"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};r(n(1)),e.exports=function(e,t,n){return{link:function(r,o,i){var s=r.$eval(i.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');if(s.isHTML5){var u=new n({uploader:s,element:o});u.getOptions=e(i.options).bind(u,r),u.getFilters=function(){return i.filters}}}}},e.exports.$inject=["$parse","FileUploader","FileDrop"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};r(n(1)),e.exports=function(e,t){return{link:function(n,r,o){var i=n.$eval(o.uploader);if(!(i instanceof e))throw new TypeError('"Uploader" must be an instance of FileUploader');var s=new t({uploader:i,element:r});s.getOverClass=function(){return o.overClass||s.overClass}}}},e.exports.$inject=["FileUploader","FileOver"]}])})},function(e,t,n){Array.prototype.remove=function(e){for(var t=!1,n=0;n<this.length;n++)if(this[n]==e){t=!t;break}t&&this.splice(n,1)}},function(e,t,n){e.exports=angular}]);