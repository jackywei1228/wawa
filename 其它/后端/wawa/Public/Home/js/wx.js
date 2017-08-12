 // 8.3 批量隐藏菜单项
var $JsApi_Share = {
	init: function(obj) {
		if(obj.title)
			$JsApi_Share.title = obj.title;
		if(obj.desc)
			$JsApi_Share.desc = obj.desc;
		//if(obj.link)
		//	$JsApi_Share.link = obj.link;
		if(obj.imgUrl)
			$JsApi_Share.imgUrl = obj.imgUrl;
//		$JsApi_Share.type = obj.type;
//		$JsApi_Share.dataUrl = obj.dataUrl;
//		$JsApi_Share.success = obj.success;
//		$JsApi_Share.cancel = obj.cancel;
	},
	title: '天天摇摇乐，摇出好运大红包',
	desc: "天天乐红包电玩城，惊喜不断、好运连连！",
	link: "http://tg.51aichi.com/?gameId="+getHtml_head("gameId"),
	imgUrl: 'http://tg.51aichi.com/Public/Home/ysz/imges/share.png',	
	type: null,
	dataUrl: null,
	success: null,
	cancel: null,
};
$(function() {
	
	wx.ready(function() {

		wx.onMenuShareAppMessage({
		    title: $JsApi_Share.title,
		    desc: $JsApi_Share.desc,
		    link: $JsApi_Share.link,
		    imgUrl: $JsApi_Share.imgUrl,
		    type: $JsApi_Share.type,
		    dataUrl: $JsApi_Share.dataUrl,
		    success: $JsApi_Share.success,
		    cancel: $JsApi_Share.cancel,
		});
		wx.onMenuShareTimeline({
		    title: $JsApi_Share.title,
		    link: $JsApi_Share.link,
		    imgUrl: $JsApi_Share.imgUrl,
		    success: $JsApi_Share.success,
		    cancel: $JsApi_Share.cancel
		});
		wx.onMenuShareQQ({
		    title: $JsApi_Share.title,
		    desc: $JsApi_Share.desc,
		    link: $JsApi_Share.link,
		    imgUrl: $JsApi_Share.imgUrl,
		    success: $JsApi_Share.success,
		    cancel: $JsApi_Share.cancel
		});
		wx.onMenuShareWeibo({
		    title: $JsApi_Share.title,
		    desc: $JsApi_Share.desc,
		    link: $JsApi_Share.link,
		    imgUrl: $JsApi_Share.imgUrl,
		    success: $JsApi_Share.success,
		    cancel: $JsApi_Share.cancel
		});
		wx.hideMenuItems({
		  menuList: [
		    'menuItem:readMode', // 阅读模式
		    //"menuItem:favorite",//收藏
		    "menuItem:copyUrl",//复制链接
		    "menuItem:originPage",//原网页
		    "menuItem:openWithQQBrowser",//qq浏览器
		    "menuItem:openWithSafari",//在safari中打开
		    "menuItem:share:email",//邮件
		    "menuItem:setFont",//调整字体
		    "menuItem:share:qq",//手机qq
		    "menuItem:share:QZone",//qq空间
		  ],
	    });	
	});
	wx.error(function(res){
	});
	$.jsonp2({
		url: '../Jssdk/index.html',
		callback: 'callback',
		data: {
			url: location.href
		}, 
		success: function(data) {
			if(data && data.success && data.result) {			
				r = data.result;
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: r.appid, // 必填，公众号的唯一标识
				    timestamp: r.timestamp, // 必填，生成签名的时间戳
				    nonceStr: r.noncestr, // 必填，生成签名的随机串
				    signature: r.signature,// 必填，签名，见附录1
				    jsApiList: ["hideMenuItems", "onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			}
		}
	});
});

