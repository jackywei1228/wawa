// jquery.jsonp 2.3.1 (c)2012 Julian Aubourg | MIT License
// https://github.com/jaubourg/jquery-jsonp
(function(a) {
    a.myJSON = function(l) {
    	l.needMsg = l.needMsg == null ? true :false;
    	l.complete = function(r, success) {
        	if(!l.isNotNeedSysPoint) {
	    		if('success' != success) {
    				if(l.needMsg){//是否需要进行提示
    					//alert('未连接到服务器，请检查网络');
    				}
	    		}
	    	}
    	};
    	
    	var loadMsg = l.loadMsg;
    	if(loadMsg){
			loading(loadMsg);
    	}
    	var success_me = l.success;
		var div = l.error_show;
    	if(div){
    		if(div.find(".loadding_msg").length > 0 || div.parent().find(".loadding_msg").length){
				div.find(".loadding_msg").remove();
    		}
    		$(div).append("<div class='loadding_msg'><img src='css/images/loading.gif'/></div>");
			$CommonPkg.error_hide(div.find(".error_main"));
    	}
    	l.success = function(data){
    		close_loading();
    		if(div){
    			div.find(".loadding_msg").remove();
    		}
    		success_me(JSON.parse(data));
    	};
    	var errorMsg = l.error;
    	l.error=function(){
    		close_loading();
    		var method = l.error_method;
    		var ref_topMar = l.ref_topMar;
    		if(errorMsg){
    			errorMsg();
    		}
    		if(div && method){
    			if(div.parent().find(".loadding_msg").length > 0){
    				div.parent().parent().find(".loadding_msg").hide();
    			} else{
    				div.parent().find(".loadding_msg").hide();
    			}
    			$CommonPkg.errorRefresh(div,method,ref_topMar);
    		}
    	}
    	l.type = "post";
    	$.ajax(l);
    }
})(jQuery)