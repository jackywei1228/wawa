$(window).ready(function(){
	page_rotate.init();
	page_rotate.initMember(function(){
		page_rotate.initDetail();
		$(window).resize(page_rotate.resize);
	});
});


var page_rotate = {
		
	initDetail:function(){
		$.myJSON({
			url:"../Game/brow_getbyid.html",
			data:{gameId:getHtml_head("gameId")},
			loadMsg:"初始化中",
			success:function(data){
				if(data && data.result && data.success){
					GLOBAL.user = data.result;
					$("#page_rotate .rotate_msg .white").html(GLOBAL.user.grade);
					
					//初始化用户获奖信息
					var wins = data.result.wins;
					
					var html = "";
					
					for ( var i = 0; i < wins.length; i++) {
						var win = wins[i];
						var is_noBor  = "";
						if(i == wins.length - 1){
							is_noBor = " noBor";
						}
						html += "<div class='item'>"
							+"		<div class='item_td name'>"+win.nickName+"</div>"
							+"		<div class='item_td getMoney'>"+((win.prizeRemark/100).toFixed(2))+" 元</div>"
							+"		<div class='item_td time lett'>"+reTime(win.time)+"</div>"
							+"		<div class='clear'></div>"
							+"	</div>";
					}
					
					$("#page_rotate .items .lists").html(html);
					
				} else{
					var result = data.result;
					if(result.errors ){
						
						if(result.errno == "ERR-1012"){


							return;
						}
						
						my_alert(result.errors);
					} else{
						my_alert("换取失败，请重试！");
					}
					
					
				}
			}
		});
	},	
		
	//初始化
	initOk:false,
	initMember:function(func){
		$.myJSON({
			url:"../Game/brow_getcurmember.html",
			success:function(data){
				if(data && data.success){
					page_rotate.initOk = true;
					var result = data.result;
					if(result.userId){
						GLOBAL.userId = data.result.userId;	
						//$JsApi_Share.link = "?uid="+getHtml_head("uid")+"&gameId="+getHtml_head("gameId")+"&agentNo="+getHtml_head("agentNo");
						if(func){
							func();
						}
					} else{
						var param = {pageName:"/index.php?m=Home&c=Index&a=ysz",uid:getHtml_head("uid"),gameId:getHtml_head("gameId"),agentNo:getHtml_head("agentNo")};
						window.location.href = "/index.php?m=Home&c=Index&a=ysz&param="+JSON.stringify(param);
					}
				}
			}
		});
	},		
	init:function(){
		page_rotate.resize();
	},
	resize:function(){
		
		var w_w = $(window).width();
		var w_h = $(window).height();
		
		$("#page_rotate .rotate_imgs .gai").css("left",(200-140)/2-5);
		
		$("#page_rotate .btns .ro_btn.center").css("left",(w_w-90)/2);
		
		$("#page_rotate .rotate_imgs .rotate_div").css("left",(w_w-200)/2);
		
		
	},
	/**
	 * 显示下注页面
	 */
	now_sel:null,
	show_icon:function(type,tmsg){
		$(".sel_icons").show();
		$(".sel_icons .icon_msg span").html(tmsg);
		page_rotate.now_sel = type;
	},
	close_show:function(){
		$(".sel_icons").hide();
		page_rotate.now_sel = null;
	},
	is_buy:false,
	buy:function(money){
		
		if(page_rotate.is_buy){
			return;
		}
		page_rotate.is_buy = true;
		$(".sel_icons").hide();
		
		$.myJSON({
			url:"../Game/brow_addordery.html",
			data:{totalFee:money*100,remarks:page_rotate.now_sel,gameId:getHtml_head("gameId"),agentNo:getHtml_head("agentNo")},
			loadMsg:"提交订单中",
			success:function(data){
					if(data && data.success && data.result) {
						var prepay_id = data.result;
						$.post('../Game/jsapi_sign.html', {
							url: location.href,
							prepay_id: prepay_id 
						}, function(r) {
							var data = $.parseJSON(r);
							if(data && data.success && data.result) {
								r = data.result;
								data = data.result;
								wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: data.appId, // 必填，公众号的唯一标识

				});
								wx.chooseWXPay({
									appId:data.appId,
								    nonceStr: data.nonceStr,
								    package:  data.package,
								    signType: 'MD5',
									timestamp: data.timeStamp,
								    paySign: data.paySign,
								    success: function (res) {
										page_rotate.getResult(prepay_id);
										
								    },fail:function(){
										page_rotate.is_buy = false;
										my_alert("充值失败，请重试！",4000);
								    },cancel:function(){
										page_rotate.is_buy = false;
								    }
								});
							} 
						});
					} else {
						var msg;
						if(data.result)
							msg = data.result.errors;
						if(!msg)
							msg = "请稍后再试！";
						
						if(msg.indexOf("授权失败") != -1){
							var param = {pageName:"/index.php?m=Home&c=Index&a=ysz",uid:getHtml_head("uid"),gameId:getHtml_head("gameId"),agentNo:getHtml_head("agentNo")};
						window.location.href = "/index.php?m=Home&c=Index&a=ysz&param="+JSON.stringify(param);
							return;
						}
						my_alert('下单失败，' + msg);
						page_rotate.is_buy = false;
					}
			
				}
			});
	},
	getResult:function(prepay_id){
		$.myJSON({
			url:"../Game/brow_getresult.html",
			data:{prepay_Id:prepay_id,gameId:getHtml_head("gameId")},
			loadMsg:"正在启动",
			success:function(data){
				if(data && data.success){
					
					var result = data.result;
					
					if(!result.isNotify){
						page_rotate.getResult(prepay_id);
						return;
					}
					
					var luckNums = result.luckNum.split(",");
					page_rotate.doingDiceroll(luckNums[0], luckNums[1], luckNums[2],result.prizeRemark > 0,result.luckMsg,result.prizeRemark);
				} else{
					page_rotate.is_buy = false;
					var result = data.result;
					if(result.errors){
						my_alert(result.errors);
					} else{
						var msg;
						if(data.result)
							msg = data.result.errors;
						if(!msg)
							msg = "请稍后再试！";
						
						if(msg.indexOf("授权失败") != -1){
							var param = {pageName:"/index.php?m=Home&c=Index&a=ysz",uid:getHtml_head("uid"),gameId:getHtml_head("gameId"),agentNo:getHtml_head("agentNo")};
						window.location.href = "/index.php?m=Home&c=Index&a=ysz&param="+JSON.stringify(param);
							return;
						}
						my_alert("服务器错误，请重试！");
					}
				}
			},error:function(){
				page_rotate.is_buy = false;
			}
		});
	},
	/**
	 * 开盖事件等
	 */
	doingDiceroll:function(i1,i2,i3,isWin,winType,winMoney){
		var the_top = $("#page_rotate .rotate_imgs .gai").css("top");
		$("#page_rotate .btns .ro_btn.center").html("开");
		if(the_top.indexOf("160px") != -1){
			$("#page_rotate .rotate_imgs .gai").css("top","21px");
			setTimeout(function(){
				page_rotate.do_de(i1,i2,i3,isWin,winType,winMoney);
			},2000);
			return;
		}
		page_rotate.do_de(i1,i2,i3,isWin,winType,winMoney);
	},
	do_de:function(i1,i2,i3,isWin,winType,winMoney){
		$("#page_rotate .rotate_imgs .rotate_div .szs .sz.sz1").attr("src","../../../Public/Home/ysz/imges/sz_"+i1+".png");
		$("#page_rotate .rotate_imgs .rotate_div .szs .sz.sz2").attr("src","../../../Public/Home/ysz/imges/sz_"+i2+".png");
		$("#page_rotate .rotate_imgs .rotate_div .szs .sz.sz3").attr("src","../../../Public/Home/ysz/imges/sz_"+i3+".png");
		$("#page_rotate .rotate_imgs .rotate_div").addClass("move");
		setTimeout(function(){
			$("#page_rotate .rotate_imgs .rotate_div").removeClass("move");
			setTimeout(function(){
				$("#page_rotate .rotate_imgs .gai").css({
					"transition-duration":"1.5s",
					"-webkit-transition-duration":"1.5s",
					"top":"-160px"
				});
				
				setTimeout(function(){
					var ty_msg = "";
					if(winType.indexOf("4") != -1){
						ty_msg += "豹子";
					} else if(winType.indexOf("3") != -1){
						ty_msg += "顺子";
					} else if(winType.indexOf("2") != -1){
						ty_msg += "对子";
					}
					if(ty_msg == "" && winType.indexOf("1") != -1){
						ty_msg = "小";
					} else if(ty_msg == "" && winType.indexOf("0") != -1){
						ty_msg = "大";
					} else if(ty_msg.length > 0&& winType.indexOf("1") != -1){
						ty_msg += "(小)";
					} else if(ty_msg.length > 0&& winType.indexOf("0") != -1){
						ty_msg += "(大)";
					}
					$("#page_rotate .btns .ro_btn.center").html(ty_msg);
					
					if(isWin){
						my_alert("恭喜您获得<br/>"+(winMoney/100)+"元红包<br/>请在微信领取红包",0,true);
						
					} else{
						my_alert("本局开"+ty_msg+"<br/>请再接再厉");
					}
					page_rotate.is_buy = false;
				},1500);
			},400);
		},3000);
	},

	store_game:function(){
		$(".store_game").show();
	},
	close_store:function(){
		$(".store_game").hide();
	}
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