!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(6);var r=n(7);n(3),n(4),n(5),n(2),n(1);var i=r.module("myApp",["angularFileUpload","service.showCtrl","service.dataService","controller.main"]);i.directive("tsarticlelist",function(){return{restrict:"EAC",templateUrl:"articlelist"}}).directive("tsCatelist",function(){return{restrict:"EAC",templateUrl:"catelist"}}).directive("tsarticleadd",function(){return{restrict:"EAC",templateUrl:"articleadd"}})},function(e,t,n){angular.module("controller.main",["ng.ueditor"]).controller("main",["$scope","showCtrl","dataService","FileUploader",function(e,t,n,r){e.show=t,e.show.$regist("catelist",["catelist"],!0),e.show.$regist("articlelist",["articlelist"]),e.show.$regist("articleadd",["articleadd"]),e.articlePojo={picture:!0},e.datas=[],n.getArticles(null).success(function(t){t&&(e.datas=t)}),e.saveArticle=function(){e.articlePojo.typeArray=[],n.saveArticle(e.articlePojo).success(function(t){t?(e.datas.push(t),e.articlePojo={}):alert("\u6dfb\u52a0\u9519\u8bef")})},e.removeArticle=function(t){n.removeArticle(t._id).success(function(n){n?e.datas.remove(t):alert("\u5220\u9664\u9519\u8bef")})},e.temparticle={},e.uparticle={};var i=e.uploader=new r({url:"/upload",alias:"fileName"});i.onAfterAddingFile=function(e){e.upload()},i.onCompleteItem=function(t,n,r,i){e.uparticle.picUrl=n.path},e.viewArticlelist=function(t){e.temparticle=t,e.show.$set("articlelist")},e.viewarticleadd=function(t){t?e.uparticle=t:e.uparticle={},e.show.$set("articleadd")},e.saveOrUparticle=function(){e.uparticle._id?n.update_typeArray(e.temparticle._id,e.uparticle).success(function(t){e.show.$set("articlelist"),t||alert("\u66f4\u65b0\u5931\u8d25")}):n.push_typeArray(e.temparticle._id,e.uparticle).success(function(t){t?(e.temparticle.typeArray.push(t),e.show.$set("articlelist")):alert("\u6dfb\u52a0\u9519\u8bef")})},e.pull_typeArray=function(t){n.pull_typeArray(e.temparticle._id,t._id).success(function(n){n?e.temparticle.typeArray.remove(t):alert("\u5220\u9664\u9519\u8bef")})}}])},function(e,t,n){angular.module("service.dataService",[]).service("dataService",["$http",function(e){this.getArticles=function(t){return e.post("/back/print/getArticles",{searchPojo:t})},this.saveArticle=function(t){return e.post("/back/print/saveArticle",{savePojo:t})},this.removeArticle=function(t){return e.post("/back/print/removeArticle",{_id:t})},this.push_typeArray=function(t,n){var r={_id:t,pojo:n};return e.post("/back/print/push_typeArray",{pushPojo:r})},this.update_typeArray=function(t,n){var r={_id:t,pojo:n};return e.post("/back/print/update_typeArray",{updatePojo:r})},this.pull_typeArray=function(t,n){var r={_id:t,typeArrayId:n};return e.post("/back/print/pull_typeArray",{pullPojo:r})}}])},function(e,t,n){angular.module("service.showCtrl",[]).service("showCtrl",[function(){this._currentName="",this._registContent={},this.$regist=function(e,t,n){this._registContent[e]=t,n&&this.$set(e)},this.$set=function(e){var t=this._registContent[this._currentName];if(t)for(var n=0;n<t.length;n++)delete this[t[n]];if(t=this._registContent[e],!t)throw"you  dont regist the name";for(var n=0;n<t.length;n++)this[t[n]]=!0;this._currentName=e},this.$remove=function(e){delete this._registContent[e]},this.$init=function(){return this._registContent={},this._currentName="",this}}])},function(e,t,n){(function(){"use strict";!function(){var e;e=angular.module("ng.ueditor",[]),e.directive("ueditor",[function(){return{restrict:"C",require:"ngModel",scope:{config:"=",ready:"="},link:function(e,t,n,r){var i,o;o=!1,new(i=function(){function i(){this.bindRender(),this.initEditor()}return i.prototype.initEditor=function(){var i,s,a;return a=this,"undefined"==typeof UE?void console.error("Please import the local resources of ueditor!"):(i=e.config?e.config:{},s=n.id?n.id:"_editor"+Date.now(),t[0].id=s,this.editor=new UE.ui.Editor(i),this.editor.render(s),this.editor.ready(function(){a.editorReady=!0,a.editor.addListener("contentChange",function(){r.$setViewValue(a.editor.getContent()),o||e.$$phase||e.$apply(),o=!1}),a.modelContent&&a.modelContent.length>0&&a.setEditorContent(),"function"==typeof e.ready&&e.ready(a.editor),e.$on("$destroy",function(){!n.id&&UE.delEditor&&UE.delEditor(s)})}))},i.prototype.setEditorContent=function(e){null==e&&(e=this.modelContent),this.editor&&this.editorReady&&this.editor.setContent(e)},i.prototype.bindRender=function(){var e;e=this,r.$render=function(){e.modelContent=r.$isEmpty(r.$viewValue)?"":r.$viewValue,o=!0,e.setEditorContent()}},i}())}}}])}()}).call(this)},function(e,t,n){!function(t,n){e.exports=n()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=r(n(1)),o=r(n(2)),s=r(n(3)),a=r(n(4)),u=r(n(5)),l=r(n(6)),c=r(n(7)),f=r(n(8)),p=r(n(9)),d=r(n(10)),h=r(n(11)),v=r(n(12));angular.module(i.name,[]).value("fileUploaderOptions",o).factory("FileUploader",s).factory("FileLikeObject",a).factory("FileItem",u).factory("FileDirective",l).factory("FileSelect",c).factory("FileDrop",f).factory("FileOver",p).directive("nvFileSelect",d).directive("nvFileDrop",h).directive("nvFileOver",v).run(["FileUploader","FileLikeObject","FileItem","FileDirective","FileSelect","FileDrop","FileOver",function(e,t,n,r,i,o,s){e.FileLikeObject=t,e.FileItem=n,e.FileDirective=r,e.FileSelect=i,e.FileDrop=o,e.FileOver=s}])},function(e,t){e.exports={name:"angularFileUpload"}},function(e,t){"use strict";e.exports={url:"/",alias:"file",headers:{},queue:[],progress:0,autoUpload:!1,removeAfterUpload:!1,method:"POST",filters:[],formData:[],queueLimit:Number.MAX_VALUE,withCredentials:!1}},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.copy),a=angular.extend,u=angular.forEach,l=angular.isObject,c=angular.isNumber,f=angular.isDefined,p=angular.isArray,d=angular.element;e.exports=function(e,t,n,r,h,v){var m=r.File,g=r.FormData,_=function(){function r(t){o(this,r);var n=s(e);a(this,n,t,{isUploading:!1,_nextIndex:0,_failFilterIndex:-1,_directives:{select:[],drop:[],over:[]}}),this.filters.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.filters.unshift({name:"folder",fn:this._folderFilter})}return i(r,{addToQueue:{value:function(e,t,n){var r=this,i=this.isArrayLikeObject(e)?e:[e],o=this._getFilters(n),s=this.queue.length,a=[];u(i,function(e){var n=new h(e);if(r._isValidFile(n,o,t)){var i=new v(r,e,t);a.push(i),r.queue.push(i),r._onAfterAddingFile(i)}else{var s=o[r._failFilterIndex];r._onWhenAddingFileFailed(n,s,t)}}),this.queue.length!==s&&(this._onAfterAddingAll(a),this.progress=this._getTotalProgress()),this._render(),this.autoUpload&&this.uploadAll()}},removeFromQueue:{value:function(e){var t=this.getIndexOfItem(e),n=this.queue[t];n.isUploading&&n.cancel(),this.queue.splice(t,1),n._destroy(),this.progress=this._getTotalProgress()}},clearQueue:{value:function(){for(;this.queue.length;)this.queue[0].remove();this.progress=0}},uploadItem:{value:function(e){var t=this.getIndexOfItem(e),n=this.queue[t],r=this.isHTML5?"_xhrTransport":"_iframeTransport";n._prepareToUploading(),this.isUploading||(this.isUploading=!0,this[r](n))}},cancelItem:{value:function(e){var t=this.getIndexOfItem(e),n=this.queue[t],r=this.isHTML5?"_xhr":"_form";n&&n.isUploading&&n[r].abort()}},uploadAll:{value:function(){var e=this.getNotUploadedItems().filter(function(e){return!e.isUploading});e.length&&(u(e,function(e){return e._prepareToUploading()}),e[0].upload())}},cancelAll:{value:function(){var e=this.getNotUploadedItems();u(e,function(e){return e.cancel()})}},isFile:{value:function(e){return this.constructor.isFile(e)}},isFileLikeObject:{value:function(e){return this.constructor.isFileLikeObject(e)}},isArrayLikeObject:{value:function(e){return this.constructor.isArrayLikeObject(e)}},getIndexOfItem:{value:function(e){return c(e)?e:this.queue.indexOf(e)}},getNotUploadedItems:{value:function(){return this.queue.filter(function(e){return!e.isUploaded})}},getReadyItems:{value:function(){return this.queue.filter(function(e){return e.isReady&&!e.isUploading}).sort(function(e,t){return e.index-t.index})}},destroy:{value:function(){var e=this;u(this._directives,function(t){u(e._directives[t],function(e){e.destroy()})})}},onAfterAddingAll:{value:function(e){}},onAfterAddingFile:{value:function(e){}},onWhenAddingFileFailed:{value:function(e,t,n){}},onBeforeUploadItem:{value:function(e){}},onProgressItem:{value:function(e,t){}},onProgressAll:{value:function(e){}},onSuccessItem:{value:function(e,t,n,r){}},onErrorItem:{value:function(e,t,n,r){}},onCancelItem:{value:function(e,t,n,r){}},onCompleteItem:{value:function(e,t,n,r){}},onCompleteAll:{value:function(){}},_getTotalProgress:{value:function(e){if(this.removeAfterUpload)return e||0;var t=this.getNotUploadedItems().length,n=t?this.queue.length-t:this.queue.length,r=100/this.queue.length,i=(e||0)*r/100;return Math.round(n*r+i)}},_getFilters:{value:function(e){if(!e)return this.filters;if(p(e))return e;var t=e.match(/[^\s,]+/g);return this.filters.filter(function(e){return-1!==t.indexOf(e.name)})}},_render:{value:function(){t.$$phase||t.$apply()}},_folderFilter:{value:function(e){return!(!e.size&&!e.type)}},_queueLimitFilter:{value:function(){return this.queue.length<this.queueLimit}},_isValidFile:{value:function(e,t,n){var r=this;return this._failFilterIndex=-1,t.length?t.every(function(t){return r._failFilterIndex++,t.fn.call(r,e,n)}):!0}},_isSuccessCode:{value:function(e){return e>=200&&300>e||304===e}},_transformResponse:{value:function(e,t){var r=this._headersGetter(t);return u(n.defaults.transformResponse,function(t){e=t(e,r)}),e}},_parseHeaders:{value:function(e){var t,n,r,i={};return e?(u(e.split("\n"),function(e){r=e.indexOf(":"),t=e.slice(0,r).trim().toLowerCase(),n=e.slice(r+1).trim(),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},_headersGetter:{value:function(e){return function(t){return t?e[t.toLowerCase()]||null:e}}},_xhrTransport:{value:function(e){var t=this,n=e._xhr=new XMLHttpRequest,r=new g;if(this._onBeforeUploadItem(e),u(e.formData,function(e){u(e,function(e,t){r.append(t,e)})}),"number"!=typeof e._file.size)throw new TypeError("The file specified is no longer valid");r.append(e.alias,e._file,e.file.name),n.upload.onprogress=function(n){var r=Math.round(n.lengthComputable?100*n.loaded/n.total:0);t._onProgressItem(e,r)},n.onload=function(){var r=t._parseHeaders(n.getAllResponseHeaders()),i=t._transformResponse(n.response,r),o=t._isSuccessCode(n.status)?"Success":"Error",s="_on"+o+"Item";t[s](e,i,n.status,r),t._onCompleteItem(e,i,n.status,r)},n.onerror=function(){var r=t._parseHeaders(n.getAllResponseHeaders()),i=t._transformResponse(n.response,r);t._onErrorItem(e,i,n.status,r),t._onCompleteItem(e,i,n.status,r)},n.onabort=function(){var r=t._parseHeaders(n.getAllResponseHeaders()),i=t._transformResponse(n.response,r);t._onCancelItem(e,i,n.status,r),t._onCompleteItem(e,i,n.status,r)},n.open(e.method,e.url,!0),n.withCredentials=e.withCredentials,u(e.headers,function(e,t){n.setRequestHeader(t,e)}),n.send(r),this._render()}},_iframeTransport:{value:function(e){var t=this,n=d('<form style="display: none;" />'),r=d('<iframe name="iframeTransport'+Date.now()+'">'),i=e._input;e._form&&e._form.replaceWith(i),e._form=n,this._onBeforeUploadItem(e),i.prop("name",e.alias),u(e.formData,function(e){u(e,function(e,t){var r=d('<input type="hidden" name="'+t+'" />');r.val(e),n.append(r)})}),n.prop({action:e.url,method:"POST",target:r.prop("name"),enctype:"multipart/form-data",encoding:"multipart/form-data"}),r.bind("load",function(){var n="",i=200;try{n=r[0].contentDocument.body.innerHTML}catch(o){i=500}var s={response:n,status:i,dummy:!0},a={},u=t._transformResponse(s.response,a);t._onSuccessItem(e,u,s.status,a),t._onCompleteItem(e,u,s.status,a)}),n.abort=function(){var o,s={status:0,dummy:!0},a={};r.unbind("load").prop("src","javascript:false;"),n.replaceWith(i),t._onCancelItem(e,o,s.status,a),t._onCompleteItem(e,o,s.status,a)},i.after(n),n.append(i).append(r),n[0].submit(),this._render()}},_onWhenAddingFileFailed:{value:function(e,t,n){this.onWhenAddingFileFailed(e,t,n)}},_onAfterAddingFile:{value:function(e){this.onAfterAddingFile(e)}},_onAfterAddingAll:{value:function(e){this.onAfterAddingAll(e)}},_onBeforeUploadItem:{value:function(e){e._onBeforeUpload(),this.onBeforeUploadItem(e)}},_onProgressItem:{value:function(e,t){var n=this._getTotalProgress(t);this.progress=n,e._onProgress(t),this.onProgressItem(e,t),this.onProgressAll(n),this._render()}},_onSuccessItem:{value:function(e,t,n,r){e._onSuccess(t,n,r),this.onSuccessItem(e,t,n,r)}},_onErrorItem:{value:function(e,t,n,r){e._onError(t,n,r),this.onErrorItem(e,t,n,r)}},_onCancelItem:{value:function(e,t,n,r){e._onCancel(t,n,r),this.onCancelItem(e,t,n,r)}},_onCompleteItem:{value:function(e,t,n,r){e._onComplete(t,n,r),this.onCompleteItem(e,t,n,r);var i=this.getReadyItems()[0];return this.isUploading=!1,f(i)?void i.upload():(this.onCompleteAll(),this.progress=this._getTotalProgress(),void this._render())}}},{isFile:{value:function(e){return m&&e instanceof m}},isFileLikeObject:{value:function(e){return e instanceof h}},isArrayLikeObject:{value:function(e){return l(e)&&"length"in e}},inherit:{value:function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.super_=t}}}),r}();return _.prototype.isHTML5=!(!m||!g),_.isHTML5=_.prototype.isHTML5,_},e.exports.$inject=["fileUploaderOptions","$rootScope","$http","$window","FileLikeObject","FileItem"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.copy),a=angular.isElement,u=angular.isString;e.exports=function(){var e=function(){function e(t){o(this,e);var n=a(t),r=n?t.value:t,i=u(r)?"FakePath":"Object",s="_createFrom"+i;this[s](r)}return i(e,{_createFromFakePath:{value:function(e){this.lastModifiedDate=null,this.size=null,this.type="like/"+e.slice(e.lastIndexOf(".")+1).toLowerCase(),this.name=e.slice(e.lastIndexOf("/")+e.lastIndexOf("\\")+2)}},_createFromObject:{value:function(e){this.lastModifiedDate=s(e.lastModifiedDate),this.size=e.size,this.type=e.type,this.name=e.name}}}),e}();return e},e.exports.$inject=[]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.copy),a=angular.extend,u=angular.element,l=angular.isElement;e.exports=function(e,t){var n=function(){function n(e,r,i){o(this,n);var c=l(r),f=c?u(r):null,p=c?null:r;a(this,{url:e.url,alias:e.alias,headers:s(e.headers),formData:s(e.formData),removeAfterUpload:e.removeAfterUpload,withCredentials:e.withCredentials,method:e.method},i,{uploader:e,file:new t(r),isReady:!1,isUploading:!1,isUploaded:!1,isSuccess:!1,isCancel:!1,isError:!1,progress:0,index:null,_file:p,_input:f}),f&&this._replaceNode(f)}return i(n,{upload:{value:function(){try{this.uploader.uploadItem(this)}catch(e){this.uploader._onCompleteItem(this,"",0,[]),this.uploader._onErrorItem(this,"",0,[])}}},cancel:{value:function(){this.uploader.cancelItem(this)}},remove:{value:function(){this.uploader.removeFromQueue(this)}},onBeforeUpload:{value:function(){}},onProgress:{value:function(e){}},onSuccess:{value:function(e,t,n){}},onError:{value:function(e,t,n){}},onCancel:{value:function(e,t,n){}},onComplete:{value:function(e,t,n){}},_onBeforeUpload:{value:function(){this.isReady=!0,this.isUploading=!0,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()}},_onProgress:{value:function(e){this.progress=e,this.onProgress(e)}},_onSuccess:{value:function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=null,this.onSuccess(e,t,n)}},_onError:{value:function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=null,this.onError(e,t,n)}},_onCancel:{value:function(e,t,n){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=null,this.onCancel(e,t,n)}},_onComplete:{value:function(e,t,n){this.onComplete(e,t,n),this.removeAfterUpload&&this.remove()}},_destroy:{value:function(){this._input&&this._input.remove(),this._form&&this._form.remove(),delete this._form,delete this._input}},_prepareToUploading:{value:function(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0}},_replaceNode:{value:function(t){var n=e(t.clone())(t.scope());n.prop("value",null),t.css("display","none"),t.after(n)}}}),n}();return n},e.exports.$inject=["$compile","FileLikeObject"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=(r(n(1)),angular.extend);e.exports=function(){var e=function(){function e(t){o(this,e),s(this,t),this.uploader._directives[this.prop].push(this),this._saveLinks(),this.bind()}return i(e,{bind:{value:function(){for(var e in this.events){var t=this.events[e];this.element.bind(e,this[t])}}},unbind:{value:function(){for(var e in this.events)this.element.unbind(e,this.events[e])}},destroy:{value:function(){var e=this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(e,1),this.unbind()}},_saveLinks:{value:function(){for(var e in this.events){var t=this.events[e];this[t]=this[t].bind(this)}}}}),e}();return e.prototype.events={},e},e.exports.$inject=[]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function l(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var i=Object.getPrototypeOf(e);return null===i?void 0:l(i,t,n)}if("value"in r&&r.writable)return r.value;var o=r.get;return void 0===o?void 0:o.call(n)},s=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},a=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},u=(r(n(1)),angular.extend);e.exports=function(e){var t=function(e){function t(e){a(this,t);var n=u(e,{events:{$destroy:"destroy",change:"onChange"},prop:"select"});o(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,n),this.uploader.isHTML5||this.element.removeAttr("multiple"),this.element.prop("value",null)}return s(t,e),i(t,{getOptions:{value:function(){}},getFilters:{value:function(){}},isEmptyAfterSelection:{value:function(){return!!this.element.attr("multiple")}},onChange:{value:function(){var e=this.uploader.isHTML5?this.element[0].files:this.element[0],t=this.getOptions(),n=this.getFilters();this.uploader.isHTML5||this.destroy(),this.uploader.addToQueue(e,t,n),this.isEmptyAfterSelection()&&(this.element.prop("value",null),this.element.replaceWith(this.element=this.element.clone(!0)))}}}),t}(e);return t},e.exports.$inject=["FileDirective"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function c(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var i=Object.getPrototypeOf(e);return null===i?void 0:c(i,t,n)}if("value"in r&&r.writable)return r.value;var o=r.get;return void 0===o?void 0:o.call(n)},s=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},a=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},u=(r(n(1)),angular.extend),l=angular.forEach;e.exports=function(e){var t=function(e){function t(e){a(this,t);var n=u(e,{events:{$destroy:"destroy",drop:"onDrop",dragover:"onDragOver",dragleave:"onDragLeave"},prop:"drop"});o(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,n)}return s(t,e),i(t,{getOptions:{value:function(){}},getFilters:{value:function(){}},onDrop:{value:function(e){var t=this._getTransfer(e);if(t){var n=this.getOptions(),r=this.getFilters();this._preventAndStop(e),l(this.uploader._directives.over,this._removeOverClass,this),this.uploader.addToQueue(t.files,n,r)}}},onDragOver:{value:function(e){var t=this._getTransfer(e);this._haveFiles(t.types)&&(t.dropEffect="copy",this._preventAndStop(e),l(this.uploader._directives.over,this._addOverClass,this))}},onDragLeave:{value:function(e){e.currentTarget!==this.element[0]&&(this._preventAndStop(e),l(this.uploader._directives.over,this._removeOverClass,this))}},_getTransfer:{value:function(e){return e.dataTransfer?e.dataTransfer:e.originalEvent.dataTransfer}},_preventAndStop:{value:function(e){e.preventDefault(),e.stopPropagation()}},_haveFiles:{value:function(e){return e?e.indexOf?-1!==e.indexOf("Files"):e.contains?e.contains("Files"):!1:!1}},_addOverClass:{value:function(e){e.addOverClass()}},_removeOverClass:{value:function(e){e.removeOverClass()}}}),t}(e);return t},e.exports.$inject=["FileDirective"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e},i=function(){function e(e,t){for(var n in t){var r=t[n];r.configurable=!0,r.value&&(r.writable=!0)}Object.defineProperties(e,t)}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function l(e,t,n){var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var i=Object.getPrototypeOf(e);return null===i?void 0:l(i,t,n)}if("value"in r&&r.writable)return r.value;var o=r.get;return void 0===o?void 0:o.call(n)},s=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},a=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},u=(r(n(1)),angular.extend);e.exports=function(e){var t=function(e){function t(e){a(this,t);var n=u(e,{events:{$destroy:"destroy"},prop:"over",overClass:"nv-file-over"});o(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,n)}return s(t,e),i(t,{addOverClass:{value:function(){this.element.addClass(this.getOverClass())}},removeOverClass:{value:function(){this.element.removeClass(this.getOverClass())}},getOverClass:{value:function(){return this.overClass}}}),t}(e);return t},e.exports.$inject=["FileDirective"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};r(n(1)),e.exports=function(e,t,n){return{link:function(r,i,o){var s=r.$eval(o.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');var a=new n({uploader:s,element:i});a.getOptions=e(o.options).bind(a,r),a.getFilters=function(){return o.filters}}}},e.exports.$inject=["$parse","FileUploader","FileSelect"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};r(n(1)),e.exports=function(e,t,n){return{link:function(r,i,o){var s=r.$eval(o.uploader);if(!(s instanceof t))throw new TypeError('"Uploader" must be an instance of FileUploader');if(s.isHTML5){var a=new n({uploader:s,element:i});a.getOptions=e(o.options).bind(a,r),a.getFilters=function(){return o.filters}}}}},e.exports.$inject=["$parse","FileUploader","FileDrop"]},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e["default"]:e};r(n(1)),e.exports=function(e,t){return{link:function(n,r,i){var o=n.$eval(i.uploader);if(!(o instanceof e))throw new TypeError('"Uploader" must be an instance of FileUploader');var s=new t({uploader:o,element:r});s.getOverClass=function(){return i.overClass||s.overClass}}}},e.exports.$inject=["FileUploader","FileOver"]}])})},function(e,t,n){Array.prototype.remove=function(e){for(var t=!1,n=0;n<this.length;n++)if(this[n]==e){t=!t;break}t&&this.splice(n,1)}},function(e,t,n){e.exports=angular}]);