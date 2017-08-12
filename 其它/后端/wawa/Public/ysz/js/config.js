var GLOBAL = {
	user:null,	
		
}
/**
 * 加载框
 * @param msg
 * @return
 */
function loading(msg){
	$(".sys_loading").remove();
	var s_l = $("<div class='sys_loading'><div class='filter'></div><div class='sys_loading_msg'><img src='../../../Public/Home/ysz/imges/sys_loading.gif'/><div class='sys_loading_msg_text'>"+msg+"</div></div></div>");
	var w_h = $(window).height();
	var w_w = $(window).width();
	s_l.find(".sys_loading_msg").css({
		top:(w_h-60)/2,
		left:0
	});
	$("body").append(s_l);
}
function close_loading(){
	$(".sys_loading").remove();
}


function my_alert(msg,time,isOk){
	var co = $(".show_content");
	
	if(co.length == 0){
		var html = $("<div class='show_content'>"
				+"		<div class='filter'></div>"
				+"		<div class='content'>"
				+"		</div>"
				+"	</div>");
		co = html;
		$("body").append(html);
	}
	
	
	var content = co.find(".content");
	content.html(msg);
	co.show();
	var filter = co.find("filter");
	if(isOk){
		
		filter.bind("tap",function(){
			co.hide();
		});
		content.bind("tap",function(){
			co.hide();
		});
		
		return;
	}
	filter.unbind("tap");
	content.unbind("tap");
	setTimeout(function(){
		co.hide();
	},time?time:3000);
	
}

function reTime(time){
	if(!time){
		return "";
	}
	var year = time.substring(0,4);
	var mon = time.substring(4,6);
	var day = time.substring(6,8);
	var hh = time.substring(8,10);
	var mm = time.substring(10,12);
	var sss = time.substring(12,14);
	
	return year+"-"+mon+"-"+day+" " + hh +":"+mm+":"+sss;
}
