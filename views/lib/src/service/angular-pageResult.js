angular.module("service.pageResult",[])
.service("pageResult",[
	function(){
		this._array = [];
		this.$array = [];
		this.$pageSize = 0;
		this.$pageCount = 0;
		this.$curPage = 1;
		this.$totalPage = 0;
		this.$toLast = false;
		this.$toNext = false;
		this._juageCurpage = function(curPage){
			if(curPage < 1 || curPage > this.$pageCount){
				throw "pageResult mehod _juageCurpage error: 页数不对";
				return false;
			}
			if(curPage == 1){
				this.$toLast = false;
				if(curPage < this.$pageCount)
					this.$toNext = true;
			}
			if(curPage == this.$pageCount){
				this.$toNext = false;
				if(curPage > 1)
					this.$toLast = true;
			}
			return true;
		};
		this._getArrayByCur = function(curPage){
			var tempArray = [];
			var point = (curPage-1)*this.$pageSize;
			for(var i=0;i<this.$pageSize;i++){
				if(point<this._array.length){
					tempArray.push(this._array[point++])
				}else{
					break;
				}
			}
			return tempArray;
		};
		this.$init = function(array,pageSize){
			if(array.length == 0 || !array){
				this.$array = [];
				this.$pageSize = 0;
				this.$totalPage = 0;
				this.$pageCount = 0;
				this.$curPage = 0;
				return this;
			}
			this._array = array;
			this.$pageSize = pageSize;
			this.$totalPage = array.length;
			this.$pageCount = array.length/pageSize;
			if(array.length%pageSize){
				this.$pageCount += 1;
			}
			this.$pageCount = parseInt(this.$pageCount);
			this.$showPage(1);
			return this;	
		};
		this.$next = function(){
			var tempCurPage = this.$curPage+1;
			if(this._juageCurpage(tempCurPage)){
				this.$array = this._getArrayByCur(tempCurPage);
				this.$curPage = tempCurPage;
			}
		};
		this.$last = function(curPage){
			var tempCurPage = this.$curPage-1;
			if(this._juageCurpage(tempCurPage)){
				this.$array = this._getArrayByCur(tempCurPage);
				this.$curPage = tempCurPage;
			}
		};
		this.$showPage = function(curPage){
			var tempCurPage = curPage;
			if(this._juageCurpage(tempCurPage)){
				this.$array = this._getArrayByCur(tempCurPage);
				this.$curPage = tempCurPage;
			}
		}
}]);