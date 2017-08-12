<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html class="" lang="zh-CN">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <meta charset="utf-8" /> 
  <meta name="keywords" content="" /> 
  <meta name="HandheldFriendly" content="True" /> 
  <meta name="MobileOptimized" content="320" /> 
  <meta name="format-detection" content="telephone=no" /> 
  <meta http-equiv="cleartype" content="on" /> 
  <title>微信安全支付</title> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> 
<link rel="stylesheet" href="/Public/Home/css/foreverpay.css" />
<link rel="stylesheet" href="/Public/Home/css/weui.css"/>
<script type="text/javascript">
			window.jQuery || document.write("<script src='/Public/Home/js/jquery-1.12.3.min.js'>"+"<"+"/script>");
		</script>
  <script type="text/javascript">
	//调用微信JS api 支付
	function jsApiCall()
	{
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			<?php echo ($jsApiParameters); ?>,
			function(res){
			if(res.err_msg == "get_brand_wcpay_request:ok" ) {  
				WeixinJSBridge.log(res.err_msg);
				var traget=document.getElementById('loadingToast');
		        if(traget.style.display=='none'){  
                traget.style.display='';  
                }else{  
                traget.style.display='none';  
                }
                setTimeout(func,"1000");				
				
				//WeixinJSBridge.call('closeWindow');
			}
			}
		);
	}
//alert(window.location.host);
	function callpay()
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}
	function func(){
	window.location.href="http://"+window.location.host+"/index.php/Wap/Jiawawa/action";
	}
	</script>
 </head> 
 <body> 
  <div class="container" style="margin-top:15px;"> 
   <div class="content fixed-cash "> 
  
    <div class="cashier-info-container center"> 
	      <p class="avatar-price anonym"> <span class="rmb">￥</span><?php echo ($goods_price); ?> 元</p> 
     <p class="reason"> 收款理由：<?php echo ($goods_name); ?> </p>     	 
    </div>
    <div class="action-container" id="js-cashier-action">
     <div style="margin-bottom: 10px;"> 
      <button class="btn-pay btn btn-block btn-large btn-umpay  btn-green" onclick="callpay();"> 确认支付 </button>
     </div>
     <div style="margin-bottom: 10px;"> 
     </div>
    </div> 
   </div> 
  </div> 
  <div class="footer"> 
  </div> 
  <!-- loading toast -->
    <div id="loadingToast" class="weui_loading_toast" style="display:none;">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
            <div class="weui_loading">
                <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                <div class="weui_loading_leaf weui_loading_leaf_11"></div>
            </div>
            <p class="weui_toast_content">等待支付结果中</p>
        </div>
    </div>
 </body>
</html>