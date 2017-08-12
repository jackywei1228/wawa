(function($){
	/*******************************************************************************
	  * ontap事件--多个
	  */
	 $.fn.ontapMoreSame = function(obj){
    	$(this).unbind("tap").bind("tap",function(event){
    		event.preventDefault();
    		var endObj = $(this);
    		eval(endObj.attr("ontap"));
    	});
    };
    $.fn.setScroll=function(obj){
    	$(this).unbind("scroll");
    	//this.scrollTop = 0;
    	var page = obj.page;
		var method = obj.method;
    	var reduceHeight = obj.reduceHeight;
		var sf = obj.sf;
		var need_action = obj.need_action == null ? true:false;
		var search = obj.search==null?"":obj.search;//是否需要查询数据
		var load_div = obj.load_div;//加载数据的gif出现的位子--
		if(sf && sf.sfMap != null){
			page = sf.sfMap.get(sf.sfIndex);
		}
		var need_ref = obj.need_ref == null ? false:obj.need_ref;
		var is_body = obj.is_body ? obj.is_body : null;
    	/*执行一次*/
		if(need_action){
			if(load_div){
				$(this).find("."+load_div).append("<div class='loadding_msg'><img src='css/images/loading.gif'/></div>");
			} else{
				$(this).append("<div class='loadding_msg'><img src='css/images/loading.gif'/></div>");
			}
			method(search);
		}
		
		var sc = $(this).css("overflow");
		var bean_bind = $(this);
		if("visible" == sc){//没有滚动条
			bean_bind = $("body");
		}
		if(is_body){
			bean_bind = $(is_body);
		}
		var old_bind = $(this);
		bean_bind.bind("scroll",function(event){
			if($(this).find(".loadding_msg").length != 0){
				return;
			}
			if(sf && sf.sfMap != null){
				page = sf.sfMap.get(sf.sfIndex);
			}
			if(page == null){
				return;	
			}
			var height = this.scrollHeight;
			var windowHei = $(window).height();
			//hintUtils.alert(this.scrollTop +"  || "  +(height-windowHei+reduceHeight) +  "  ||  page:" + page.pageNo +"  || sum:"+page.pageSum);
			if(this.scrollTop >= height-windowHei+reduceHeight){
				if(page.pageNo >= page.pageSum){
					$(this).unbind("scroll");
					return;
				}
	    		page.pageNo++;
	    		if(load_div){
					$(old_bind).find("."+load_div).append("<div class='loadding_msg'><img src='css/images/loading.gif'/></div>");
				} else{
					$(old_bind).append("<div class='loadding_msg'><img src='css/images/loading.gif'/></div>");
				}
	    		method(search);
			}
		});
	};

	 $.fn.ontapOne = function(obj){
		 	var lastColor;
	    	if(obj.btn_show){
	    		var showCss = obj.showCss;
	    		var showFunc = obj.showFunc;
	    		$(this).unbind("touchstart").bind("touchstart",function(event){
	    			if(showCss){
	    				$(this).css(showCss);
	    			}
	    			if(showFunc){
	    				showFunc();
	    			}
	        	});
	    		$(this).unbind("touchend").bind("touchend",function(event){
	    			var endCss = obj.endCss;
	    			var endFunc = obj.endFunc;
	    			if(endCss){
	    				$(this).css(endCss);
	    			}
	    			if(endFunc){
	    				endFunc();
	    			}
	        	});
	    	}
	    	var method = obj.method;
	    	$(this).unbind("tap").bind("tap",function(event){
	    		event.preventDefault();
	    		//setTimeout(function(){
	    			method();
	    		//},200);
	    		
	    	});
	    }	
	 $.fn.tapUnInit = function(obj){
		 $(this).unbind("tap").off("tap");
	 }
	
})(jQuery);

/*错误信息检测及判断*/
var $CommonPkg={
	userImgError:function(obj){
		obj.src = "css/images/userDef.png";
	},
	handleErr: function(r, successFunc, failureFunc) {
		var msg = '';
		if(r.success && r.result) {
			if(successFunc)
				successFunc();
		} else {
			if(r.result) {
				if(r.result.errors) {
					msg = r.result.errors;
				} else if(r.result.msgs) {
					msg = '';
					$.each(r.result.msgs, function(k, v){
						msg += k + v + ';';
					});
				}
			}
			if(msg == ''){
				msg = '请重试！';
			}
			var eno;
			if(r.result && r.result.errors){
				eno = r.result.errors;
			}
			if(failureFunc){
				failureFunc(msg,eno);
			}
		}
	},
	errorRefresh:function(obj,method,ref_topMar){
		if($(obj).find(".error_main").length > 0){
			setTimeout(function(){$(obj).find(".error_main").show();},100);
			
		} else{
			$(obj).html("<div class='error_main'><div class='error_msg'><img src='css/images/ref_btn.png'/><br/>亲，未连接到服务器，请点击刷新</div></div>");
			if(ref_topMar == true){
				ref_topMar = "10%";
			} else if(ref_topMar == null){
				ref_topMar = "10%";
			}
			if(ref_topMar != false){
				$(obj).find(".error_main").css("marginTop",ref_topMar);
			}
			$(obj).find(".error_main").show();
			$(obj).find(".error_main .error_msg img").ontapOne({
				method:function(){
					$(obj).find(".error_main").hide();
					method();
				}
			});
		}
	},
	error_hide:function(obj){
		$(obj).find(".error_main").hide();
	}
}



/**
 * 获取总页数
 * 
 * @param total
 * @param rows
 * @return
 */
function getPageSum(total,rows){
	if(total == 0){
		return 1;
	}
	if(total % rows != 0){
		return parseInt(total / rows + 1);
	}
	if(total % rows == 0){
		return parseInt(total / rows);
	}
}
/**
 * 获取分页数据
 * @param page
 * @return
 */
function getListByPage(page){
	var lists = page.lists;
	
	var re_list = new Array();
	
	var start = (page.pageNo-1)*page.pageRow;
	
	var end = page.pageNo * page.pageRow;
	
	if(end > lists.length){
		end = lists.length;
	}
	
	for ( var i = start; i < end; i++) {
		re_list.push(lists[i]);
	}
	//页码添加
	return re_list;
}

function isEmpty(str){
	if(str == null || "" == str || "undefined" == str){
		return true;
	} 
	return false;
}


function getHtml_head(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = { };
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue.split("#")[0];
    }
}