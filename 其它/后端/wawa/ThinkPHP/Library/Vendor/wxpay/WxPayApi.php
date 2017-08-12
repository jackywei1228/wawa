<?php
require_once "WxPay.Exception.php";
require_once "WxPayConfig.php";
require_once "WxPay.Data.php";
require_once "WxPay.Notify.php";

/**
 * 
 * 接口访问类，包含所有微信支付API列表的封装，类中方法为static方法，
 * 每个接口有默认超时时间（除提交被扫支付为10s，上报超时时间为1s外，其他均为6s）
 * @author widyhu
 *
 */
class WxPayApi
{
	/**
	 * 
	 * 统一下单，WxPayUnifiedOrder中out_trade_no、body、total_fee、trade_type必填
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayUnifiedOrder $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function unifiedOrder($inputObj, $timeOut = 6)
	{

		$url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
		//检测必填参数
		if(!$inputObj->IsOut_trade_noSet()) {
			throw new WxPayException("缺少统一支付接口必填参数out_trade_no！");
		}else if(!$inputObj->IsBodySet()){
			throw new WxPayException("缺少统一支付接口必填参数body！");
		}else if(!$inputObj->IsTotal_feeSet()) {
			throw new WxPayException("缺少统一支付接口必填参数total_fee！");
		}else if(!$inputObj->IsTrade_typeSet()) {
			throw new WxPayException("缺少统一支付接口必填参数trade_type！");
		}
		
		//关联参数
		if($inputObj->GetTrade_type() == "JSAPI" && !$inputObj->IsOpenidSet()){
			throw new WxPayException("统一支付接口中，缺少必填参数openid！trade_type为JSAPI时，openid为必填参数！");
		}
		if($inputObj->GetTrade_type() == "NATIVE" && !$inputObj->IsProduct_idSet()){
			throw new WxPayException("统一支付接口中，缺少必填参数product_id！trade_type为JSAPI时，product_id为必填参数！");
		}
		
		//异步通知url未设置，则使用配置文件中的url
		if(!$inputObj->IsNotify_urlSet()){
			$inputObj->SetNotify_url(WxPayConfig::NOTIFY_URL);//异步通知url
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetSpbill_create_ip($_SERVER['REMOTE_ADDR']);//终端ip	  
		//$inputObj->SetSpbill_create_ip("1.1.1.1");  	    
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		//签名
		$inputObj->SetSign();
		$xml = $inputObj->ToXml();
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
	/**
	 * 
	 * 查询订单，WxPayOrderQuery中out_trade_no、transaction_id至少填一个
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayOrderQuery $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function orderQuery($inputObj, $timeOut = 6)
	{
		$url = "https://api.mch.weixin.qq.com/pay/orderquery";
		//检测必填参数
		if(!$inputObj->IsOut_trade_noSet() && !$inputObj->IsTransaction_idSet()) {
			throw new WxPayException("订单查询接口中，out_trade_no、transaction_id至少填一个！");
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
	/**
	 * 
	 * 关闭订单，WxPayCloseOrder中out_trade_no必填
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayCloseOrder $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function closeOrder($inputObj, $timeOut = 6)
	{
		$url = "https://api.mch.weixin.qq.com/pay/closeorder";
		//检测必填参数
		if(!$inputObj->IsOut_trade_noSet()) {
			throw new WxPayException("订单查询接口中，out_trade_no必填！");
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}

	/**
	 * 
	 * 申请退款，WxPayRefund中out_trade_no、transaction_id至少填一个且
	 * out_refund_no、total_fee、refund_fee、op_user_id为必填参数
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayRefund $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function refund($inputObj, $timeOut = 6)
	{
		$url = "https://api.mch.weixin.qq.com/secapi/pay/refund";
		//检测必填参数
		if(!$inputObj->IsOut_trade_noSet() && !$inputObj->IsTransaction_idSet()) {
			throw new WxPayException("退款申请接口中，out_trade_no、transaction_id至少填一个！");
		}else if(!$inputObj->IsOut_refund_noSet()){
			throw new WxPayException("退款申请接口中，缺少必填参数out_refund_no！");
		}else if(!$inputObj->IsTotal_feeSet()){
			throw new WxPayException("退款申请接口中，缺少必填参数total_fee！");
		}else if(!$inputObj->IsRefund_feeSet()){
			throw new WxPayException("退款申请接口中，缺少必填参数refund_fee！");
		}else if(!$inputObj->IsOp_user_idSet()){
			throw new WxPayException("退款申请接口中，缺少必填参数op_user_id！");
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, true, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
	/**
	 * 
	 * 查询退款
	 * 提交退款申请后，通过调用该接口查询退款状态。退款有一定延时，
	 * 用零钱支付的退款20分钟内到账，银行卡支付的退款3个工作日后重新查询退款状态。
	 * WxPayRefundQuery中out_refund_no、out_trade_no、transaction_id、refund_id四个参数必填一个
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayRefundQuery $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function refundQuery($inputObj, $timeOut = 6)
	{
		$url = "https://api.mch.weixin.qq.com/pay/refundquery";
		//检测必填参数
		if(!$inputObj->IsOut_refund_noSet() &&
			!$inputObj->IsOut_trade_noSet() &&
			!$inputObj->IsTransaction_idSet() &&
			!$inputObj->IsRefund_idSet()) {
			throw new WxPayException("退款查询接口中，out_refund_no、out_trade_no、transaction_id、refund_id四个参数必填一个！");
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
	/**
	 * 下载对账单，WxPayDownloadBill中bill_date为必填参数
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayDownloadBill $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function downloadBill($inputObj, $timeOut = 6)
	{
		$url = "https://api.mch.weixin.qq.com/pay/downloadbill";
		//检测必填参数
		if(!$inputObj->IsBill_dateSet()) {
			throw new WxPayException("对账单接口中，缺少必填参数bill_date！");
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		if(substr($response, 0 , 5) == "<xml>"){
			return "";
		}
		return $response;
	}
	
	/**
	 * 提交被扫支付API
	 * 收银员使用扫码设备读取微信用户刷卡授权码以后，二维码或条码信息传送至商户收银台，
	 * 由商户收银台或者商户后台调用该接口发起支付。
	 * WxPayWxPayMicroPay中body、out_trade_no、total_fee、auth_code参数必填
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayWxPayMicroPay $inputObj
	 * @param int $timeOut
	 */
	public static function micropay($inputObj, $timeOut = 10)
	{
		$url = "https://api.mch.weixin.qq.com/pay/micropay";
		//检测必填参数
		if(!$inputObj->IsBodySet()) {
			throw new WxPayException("提交被扫支付API接口中，缺少必填参数body！");
		} else if(!$inputObj->IsOut_trade_noSet()) {
			throw new WxPayException("提交被扫支付API接口中，缺少必填参数out_trade_no！");
		} else if(!$inputObj->IsTotal_feeSet()) {
			throw new WxPayException("提交被扫支付API接口中，缺少必填参数total_fee！");
		} else if(!$inputObj->IsAuth_codeSet()) {
			throw new WxPayException("提交被扫支付API接口中，缺少必填参数auth_code！");
		}
		
		$inputObj->SetSpbill_create_ip($_SERVER['REMOTE_ADDR']);//终端ip
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
	/**
	 * 
	 * 撤销订单API接口，WxPayReverse中参数out_trade_no和transaction_id必须填写一个
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayReverse $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 */
	public static function reverse($inputObj, $timeOut = 6)
	{
		$url = "https://api.mch.weixin.qq.com/secapi/pay/reverse";
		//检测必填参数
		if(!$inputObj->IsOut_trade_noSet() && !$inputObj->IsTransaction_idSet()) {
			throw new WxPayException("撤销订单API接口中，参数out_trade_no和transaction_id必须填写一个！");
		}
		
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, true, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
	/**
	 * 
	 * 测速上报，该方法内部封装在report中，使用时请注意异常流程
	 * WxPayReport中interface_url、return_code、result_code、user_ip、execute_time_必填
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayReport $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function report($inputObj, $timeOut = 1)
	{
		$url = "https://api.mch.weixin.qq.com/payitil/report";
		//检测必填参数
		if(!$inputObj->IsInterface_urlSet()) {
			throw new WxPayException("接口URL，缺少必填参数interface_url！");
		} if(!$inputObj->IsReturn_codeSet()) {
			throw new WxPayException("返回状态码，缺少必填参数return_code！");
		} if(!$inputObj->IsResult_codeSet()) {
			throw new WxPayException("业务结果，缺少必填参数result_code！");
		} if(!$inputObj->IsUser_ipSet()) {
			throw new WxPayException("访问接口IP，缺少必填参数user_ip！");
		} if(!$inputObj->IsExecute_time_Set()) {
			throw new WxPayException("接口耗时，缺少必填参数execute_time_！");
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetUser_ip($_SERVER['REMOTE_ADDR']);//终端ip
		$inputObj->SetTime(date("YmdHis"));//商户上报时间	 
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		return $response;
	}
	
	/**
	 * 
	 * 生成二维码规则,模式一生成支付二维码
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayBizPayUrl $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function bizpayurl($inputObj, $timeOut = 6)
	{
		if(!$inputObj->IsProduct_idSet()){
			throw new WxPayException("生成二维码，缺少必填参数product_id！");
		}
		
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetTime_stamp(time());//时间戳	 
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		
		return $inputObj->GetValues();
	}
	
	/**
	 * 
	 * 转换短链接
	 * 该接口主要用于扫码原生支付模式一中的二维码链接转成短链接(weixin://wxpay/s/XXXXXX)，
	 * 减小二维码数据量，提升扫描速度和精确度。
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayShortUrl $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function shorturl($inputObj, $timeOut = 6)
	{
		$url = "https://api.mch.weixin.qq.com/tools/shorturl";
		//检测必填参数
		if(!$inputObj->IsLong_urlSet()) {
			throw new WxPayException("需要转换的URL，签名用原串，传输需URL encode！");
		}
		$inputObj->SetAppid(WxPayConfig::APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::MCHID);//商户号
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		$inputObj->SetSign();//签名
		$xml = $inputObj->ToXml();
		
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, false, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
 	/**
 	 * 
 	 * 支付结果通用通知
 	 * @param function $callback
 	 * 直接回调函数使用方法: notify(you_function);
 	 * 回调类成员函数方法:notify(array($this, you_function));
 	 * $callback  原型为：function function_name($data){}
 	 */
	public static function notify($callback, &$msg)
	{
		//获取通知的数据
		$xml = $GLOBALS['HTTP_RAW_POST_DATA'];
		//如果返回成功则验证签名
		try {
			$result = WxPayResults::Init($xml);
		} catch (WxPayException $e){
			$msg = $e->errorMessage();
			return false;
		}
		
		return call_user_func($callback, $result);
	}
	
	/**
	 * 
	 * 产生随机字符串，不长于32位
	 * @param int $length
	 * @return 产生的随机字符串
	 */
	public static function getNonceStr($length = 32) 
	{
		$chars = "abcdefghijklmnopqrstuvwxyz0123456789";  
		$str ="";
		for ( $i = 0; $i < $length; $i++ )  {  
			$str .= substr($chars, mt_rand(0, strlen($chars)-1), 1);  
		} 
		return $str;
	}
	
	/**
	 * 直接输出xml
	 * @param string $xml
	 */
	public static function replyNotify($xml)
	{
		echo $xml;
	}
	
	/**
	 * 
	 * 上报数据， 上报的时候将屏蔽所有异常流程
	 * @param string $usrl
	 * @param int $startTimeStamp
	 * @param array $data
	 */
	private static function reportCostTime($url, $startTimeStamp, $data)
	{
		//如果不需要上报数据
		if(WxPayConfig::REPORT_LEVENL == 0){
			return;
		} 
		//如果仅失败上报
		if(WxPayConfig::REPORT_LEVENL == 1 &&
			 array_key_exists("return_code", $data) &&
			 $data["return_code"] == "SUCCESS" &&
			 array_key_exists("result_code", $data) &&
			 $data["result_code"] == "SUCCESS")
		 {
		 	return;
		 }
		 
		//上报逻辑
		$endTimeStamp = self::getMillisecond();
		$objInput = new WxPayReport();
		$objInput->SetInterface_url($url);
		$objInput->SetExecute_time_($endTimeStamp - $startTimeStamp);
		//返回状态码
		if(array_key_exists("return_code", $data)){
			$objInput->SetReturn_code($data["return_code"]);
		}
		//返回信息
		if(array_key_exists("return_msg", $data)){
			$objInput->SetReturn_msg($data["return_msg"]);
		}
		//业务结果
		if(array_key_exists("result_code", $data)){
			$objInput->SetResult_code($data["result_code"]);
		}
		//错误代码
		if(array_key_exists("err_code", $data)){
			$objInput->SetErr_code($data["err_code"]);
		}
		//错误代码描述
		if(array_key_exists("err_code_des", $data)){
			$objInput->SetErr_code_des($data["err_code_des"]);
		}
		//商户订单号
		if(array_key_exists("out_trade_no", $data)){
			$objInput->SetOut_trade_no($data["out_trade_no"]);
		}
		//设备号
		if(array_key_exists("device_info", $data)){
			$objInput->SetDevice_info($data["device_info"]);
		}
		
		try{
			self::report($objInput);
		} catch (WxPayException $e){
			//不做任何处理
		}
	}

	/**
	 * 以post方式提交xml到对应的接口url
	 * 
	 * @param string $xml  需要post的xml数据
	 * @param string $url  url
	 * @param bool $useCert 是否需要证书，默认不需要
	 * @param int $second   url执行超时时间，默认30s
	 * @throws WxPayException
	 */
	private static function postXmlCurl($xml, $url, $useCert = false, $second = 30)
	{	
		
		$ch = curl_init();
		//设置超时
		curl_setopt($ch, CURLOPT_TIMEOUT, $second);
		
		//如果有配置代理这里就设置代理
		if(WxPayConfig::CURL_PROXY_HOST != "0.0.0.0" 
			&& WxPayConfig::CURL_PROXY_PORT != 0){
			curl_setopt($ch,CURLOPT_PROXY, WxPayConfig::CURL_PROXY_HOST);
			curl_setopt($ch,CURLOPT_PROXYPORT, WxPayConfig::CURL_PROXY_PORT);
		}
		curl_setopt($ch,CURLOPT_URL, $url);
		curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
		curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,FALSE);//严格校验
		//设置header
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		//要求结果为字符串且输出到屏幕上
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	
		if($useCert == true){
			//设置证书
			//使用证书：cert 与 key 分别属于两个.pem文件
			curl_setopt($ch,CURLOPT_SSLCERTTYPE,'PEM');
			curl_setopt($ch,CURLOPT_SSLCERT,WxPayConfig::SSLCERT_PATH);
			curl_setopt($ch,CURLOPT_SSLKEYTYPE,'PEM');
			curl_setopt($ch,CURLOPT_SSLKEY,WxPayConfig::SSLKEY_PATH);
		}
		//post提交方式
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
		//运行curl
		$data = curl_exec($ch);
			
		//返回结果
		if($data){
			curl_close($ch);
			return $data;
		} else { 
			$error = curl_errno($ch);
			curl_close($ch);
			//throw new WxPayException("curl出错，错误码:$error");
		}
	}
	
	/**
	 * 获取毫秒级别的时间戳
	 */
	private static function getMillisecond()
	{
		//获取毫秒的时间戳
		$time = explode ( " ", microtime () );
		$time = $time[1] . ($time[0] * 1000);
		$time2 = explode( ".", $time );
		$time = $time2[0];
		return $time;
	}
	
	
	 /**
	 * 
	 * 发红包api，mch_billno、nick_name 、send_name 、re_openid 、 total_amount 、min_value、max_value 、total_num 、wishing 、act_name、remark  必填
	 * appid、mchid、spbill_create_ip、nonce_str不需要填入
	 * @param WxPayRedPack $inputObj
	 * @param int $timeOut
	 * @throws WxPayException
	 * @return 成功时返回，其他抛异常
	 */
	public static function sendRedPack($inputObj,$is_group = false, $timeOut = 6)
	{
		$url = $is_group ? "https://api.mch.weixin.qq.com/mmpaymkttransfers/sendgroupredpack" : "https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack";
		//检测必填参数
		if(!$inputObj->IsMch_billnoSet()) {
			throw new WxPayException("缺少红包接口必填参数mch_billno！");
		}
		
		$inputObj->SetAppid(WxPayConfig::redpack_APPID);//公众账号ID
		$inputObj->SetMch_id(WxPayConfig::redpack_MCHID);//商户号
		
        if(!$is_group){
            $inputObj->SetClient_ip($_SERVER['REMOTE_ADDR']);//终端ip	
        }
		$inputObj->SetNonce_str(self::getNonceStr());//随机字符串
		
		//签名
		$inputObj->RedPackSetSign();
		$xml = $inputObj->ToXml();
        
		//file_put_contents('t.log',var_export($inputObj->GetValues(),true));
        
		$startTimeStamp = self::getMillisecond();//请求开始时间
		$response = self::postXmlCurl($xml, $url, true, $timeOut);
		$result = WxPayResults::Init($response);
		self::reportCostTime($url, $startTimeStamp, $result);//上报请求花费时间
		
		return $result;
	}
	
}
/**
 * 
 * 红包接口
 * 
 * @author DreamSeeker
 *
 */
class RedPackPay
{
	/**
	 * 
	 * 网页授权接口微信服务器返回的数据，返回样例如下
	 * {
	 *  "access_token":"ACCESS_TOKEN",
	 *  "expires_in":7200,
	 *  "refresh_token":"REFRESH_TOKEN",
	 *  "openid":"OPENID",
	 *  "scope":"SCOPE",
	 *  "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
	 * }
	 * 其中access_token可用于获取共享收货地址
	 * openid是微信支付jsapi支付接口必须的参数
	 * @var array
	 */
	public $data = null;
	
	/**
	 * 
	 * 通过跳转获取用户的openid，跳转流程如下：
	 * 1、设置自己需要调回的url及其其他参数，跳转到微信服务器https://open.weixin.qq.com/connect/oauth2/authorize
	 * 2、微信服务处理完成之后会跳转回用户redirect_uri地址，此时会带上一些参数，如：code
	 * 
	 * @return 用户的openid
	 */
	public function GetOpenid()
	{
		//通过code获得openid
		if (!isset($_GET['code'])){
			//触发微信返回code码
			//$baseUrl = urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].$_SERVER['QUERY_STRING']);
            $baseUrl = urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
			$url = $this->__CreateOauthUrlForCode($baseUrl);
			Header("Location: $url");
			exit();
		} else {
			//获取code码，以获取openid
		    $code = $_GET['code'];
			$openid = $this->getOpenidFromMp($code);
			return $openid;
		}
	}
	
	/**
	 * 
	 * 通过code从工作平台获取openid机器access_token
	 * @param string $code 微信跳转回来带上的code
	 * 
	 * @return openid
	 */
	public function GetOpenidFromMp($code)
	{
		$url = $this->__CreateOauthUrlForOpenid($code);
		//初始化curl
		$ch = curl_init();
		//设置超时
		curl_setopt($ch, CURLOP_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,FALSE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		if(WxPayConfig::CURL_PROXY_HOST != "0.0.0.0" 
			&& WxPayConfig::CURL_PROXY_PORT != 0){
			curl_setopt($ch,CURLOPT_PROXY, WxPayConfig::CURL_PROXY_HOST);
			curl_setopt($ch,CURLOPT_PROXYPORT, WxPayConfig::CURL_PROXY_PORT);
		}
		//运行curl，结果以jason形式返回
		$res = curl_exec($ch);
		curl_close($ch);
		//取出openid
		$data = json_decode($res,true);
		$this->data = $data;
		$openid = $data['openid'];
		return $openid;
	}
	
	/**
	 * 
	 * 拼接签名字符串
	 * @param array $urlObj
	 * 
	 * @return 返回已经拼接好的字符串
	 */
	private function ToUrlParams($urlObj)
	{
		$buff = "";
		foreach ($urlObj as $k => $v)
		{
			if($k != "sign"){
				$buff .= $k . "=" . $v . "&";
			}
		}
		
		$buff = trim($buff, "&");
		return $buff;
	}
	
	/**
	 * 
	 * 构造获取code的url连接
	 * @param string $redirectUrl 微信服务器回跳的url，需要url编码
	 * 
	 * @return 返回构造好的url
	 */
	private function __CreateOauthUrlForCode($redirectUrl)
	{
		$urlObj["appid"] = WxPayConfig::redpack_APPID;
		$urlObj["redirect_uri"] = "$redirectUrl";
		$urlObj["response_type"] = "code";
		$urlObj["scope"] = "snsapi_base";
		$urlObj["state"] = "STATE"."#wechat_redirect";
		$bizString = $this->ToUrlParams($urlObj);
		return "https://open.weixin.qq.com/connect/oauth2/authorize?".$bizString;
	}
	
	/**
	 * 
	 * 构造获取open和access_toke的url地址
	 * @param string $code，微信跳转带回的code
	 * 
	 * @return 请求的url
	 */
	private function __CreateOauthUrlForOpenid($code)
	{
		$urlObj["appid"] = WxPayConfig::redpack_APPID;
		$urlObj["secret"] = WxPayConfig::redpack_APPSECRET;
		$urlObj["code"] = $code;
		$urlObj["grant_type"] = "authorization_code";
		$bizString = $this->ToUrlParams($urlObj);
		return "https://api.weixin.qq.com/sns/oauth2/access_token?".$bizString;
	}
}


/**
 * 
 * 统一下单输入对象
 * @author widyhu
 *
 */
class WxPayRedPack extends WxPayDataBase
{
	protected $values = array();
	
	/**
	* 设置签名，详见签名生成算法
	* @param string $value 
	**/
	public function RedPackSetSign()
	{
		$sign = $this->RedPackMakeSign();
		$this->values['sign'] = $sign;
		return $sign;
	}
	/**
	 * 生成签名
	 * @return 签名，本函数不覆盖sign成员变量，如要设置签名需要调用SetSign方法赋值
	 */
	public function RedPackMakeSign()
	{
		//签名步骤一：按字典序排序参数
		ksort($this->values);
		$string = $this->RedPackToUrlParams();
		//签名步骤二：在string后加入KEY
		$string = $string . "&key=".WxPayConfig::redpack_KEY;
		//签名步骤三：MD5加密
		$string = md5($string);
		//签名步骤四：所有字符转为大写
		$result = strtoupper($string);
		return $result;
	}
	/**
	 * 格式化参数格式化成url参数
	 */
	public function RedPackToUrlParams()
	{
		$buff = "";
		foreach ($this->values as $k => $v)
		{
			if($k != "sign" && $v != "" && !is_array($v)){
				$buff .= $k . "=" . $v . "&";
			}
		}
		
		$buff = trim($buff, "&");
		return $buff;
	}
	
	
    /**
	* 设置各红包金额 
	* @param string $value 
	**/
	public function SetAmt_list($value)
	{
		$this->values['amt_list'] = $value;
	}
	/**
	* 获取各红包金额  
	* @return 值
	**/
	public function GetAmt_list()
	{
		return $this->values['amt_list'];
	}
	/**
	* 判断各红包金额 是否存在
	* @return true 或 false
	**/
	public function IsAmt_listSet()
	{
		return array_key_exists('amt_list', $this->values);
	}
    
    
    /**
	* 设置红包金额设置方式
	* @param string $value 
	**/
	public function SetAmt_type($value)
	{
		$this->values['amt_type'] = $value;
	}
	/**
	* 获取红包金额设置方式 
	* @return 值
	**/
	public function GetAmt_type()
	{
		return $this->values['amt_type'];
	}
	/**
	* 判断红包金额设置方式是否存在
	* @return true 或 false
	**/
	public function IsAmt_typeSet()
	{
		return array_key_exists('amt_type', $this->values);
	}
    
    /**
	* 设置随机字符串
	* @param string $value 
	**/
	public function SetNonce_str($value)
	{
		$this->values['nonce_str'] = $value;
	}
	/**
	* 获取随机字符串 
	* @return 值
	**/
	public function GetNonce_str()
	{
		return $this->values['nonce_str'];
	}
	/**
	* 判断随机字符串是否存在
	* @return true 或 false
	**/
	public function IsNonce_strSet()
	{
		return array_key_exists('nonce_str', $this->values);
	}
    
    
	/**
	* 设置微信分配的公众账号ID
	* @param string $value 
	**/
	public function SetAppid($value)
	{
		$this->values['wxappid'] = $value;
	}
	/**
	* 获取微信分配的公众账号ID的值
	* @return 值
	**/
	public function GetAppid()
	{
		return $this->values['wxappid'];
	}
	/**
	* 判断微信分配的公众账号ID是否存在
	* @return true 或 false
	**/
	public function IsAppidSet()
	{
		return array_key_exists('wxappid', $this->values);
	}
/**
	* 设置微信分配的触达用户公众账号ID
	* @param string $value 
	**/
	public function Set_Msg_Appid($value)
	{
		$this->values['msgappid'] = $value;
	}
	/**
	* 获取微信分配的公众账号ID的值
	* @return 值
	**/
	public function Get_Msg_Appid()
	{
		return $this->values['msgappid'];
	}
	/**
	* 判断微信分配的公众账号ID是否存在
	* @return true 或 false
	**/
	public function Is_Msg_AppidSet()
	{
		return array_key_exists('msgappid', $this->values);
	}

	/**
	* 设置微信支付分配的商户号
	* @param string $value 
	**/
	public function SetMch_id($value)
	{
		$this->values['mch_id'] = $value;
	}
	/**
	* 获取微信支付分配的商户号的值
	* @return 值
	**/
	public function GetMch_id()
	{
		return $this->values['mch_id'];
	}
	/**
	* 判断微信支付分配的商户号是否存在
	* @return true 或 false
	**/
	public function IsMch_idSet()
	{
		return array_key_exists('mch_id', $this->values);
	}
    
	/**
	* 设置微信支付分配的子商户号
	* @param string $value 
	**/
	public function SetSub_Mch_id($value)
	{
		$this->values['sub_mch_id'] = $value;
	}
	/**
	* 获取微信支付分配的子商户号的值
	* @return 值
	**/
	public function GetSub_Mch_id()
	{
		return $this->values['sub_mch_id'];
	}
	/**
	* 判断微信支付分配的子商户号是否存在
	* @return true 或 false
	**/
	public function IsSub_Mch_idSet()
	{
		return array_key_exists('sub_mch_id', $this->values);
	}
    
    /**
	* 设置提供方名称
	* @param string $value 
	**/
	public function SetNick_name($value)
	{
		$this->values['nick_name'] = $value;
	}
	/**
	* 获取提供方名称
	* @return 值
	**/
	public function GetNick_name()
	{
		return $this->values['nick_name'];
	}
	/**
	* 判断提供方名称是否存在
	* @return true 或 false
	**/
	public function IsNick_nameSet()
	{
		return array_key_exists('nick_name', $this->values);
	}


	/**
	* 设置商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号
	* @param string $value 
	**/
	public function SetMch_billno($value)
	{
		$this->values['mch_billno'] = $value;
	}
	/**
	* 获取商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号的值
	* @return 值
	**/
	public function GetMch_billno()
	{
		return $this->values['mch_billno'];
	}
	/**
	* 判断商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号是否存在
	* @return true 或 false
	**/
	public function IsMch_billnoSet()
	{
		return array_key_exists('mch_billno', $this->values);
	}


	/**
	* 设置trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。下单前需要调用【网页授权获取用户信息】接口获取到用户的Openid。 
	* @param string $value 
	**/
	public function SetReOpenid($value)
	{
		$this->values['re_openid'] = $value;
	}
	/**
	* 获取trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。下单前需要调用【网页授权获取用户信息】接口获取到用户的Openid。 的值
	* @return 值
	**/
	public function GetReOpenid()
	{
		return $this->values['re_openid'];
	}
	/**
	* 判断trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。下单前需要调用【网页授权获取用户信息】接口获取到用户的Openid。 是否存在
	* @return true 或 false
	**/
	public function IsReOpenidSet()
	{
		return array_key_exists('re_openid', $this->values);
	}
    
    
    /**
	* 设置商户名称 
	* @param string $value 
	**/
	public function SetSend_name($value)
	{
		$this->values['send_name'] = $value;
	}
	/**
	* 获取商户名称 
	* @return 值
	**/
	public function GetSend_name()
	{
		return $this->values['send_name'];
	}
	/**
	* 判断商户名称 是否存在
	* @return true 或 false
	**/
	public function IsSend_nameSet()
	{
		return array_key_exists('send_name', $this->values);
	}

    
    /**
	* 设置付款金额 
	* @param int $value 
	**/
	public function SetTotal_amount($value)
	{
		$this->values['total_amount'] = $value;
	}
	/**
	* 获取付款金额 
	* @return 值
	**/
	public function GetTotal_amount()
	{
		return $this->values['total_amount'];
	}
	/**
	* 判断付款金额 是否存在
	* @return true 或 false
	**/
	public function IsTotal_amountSet()
	{
		return array_key_exists('total_amount', $this->values);
	}
    
    
    /**
	* 设置最小红包金额 
	* @param int $value 
	**/
	public function SetMin_value($value)
	{
		$this->values['min_value'] = $value;
	}
	/**
	* 获取最小红包金额 
	* @return 值
	**/
	public function GetMin_value()
	{
		return $this->values['min_value'];
	}
	/**
	* 判断最小红包金额是否存在
	* @return true 或 false
	**/
	public function IsMin_valueSet()
	{
		return array_key_exists('min_value', $this->values);
	}
    
    
    /**
	* 设置最大红包金额 
	* @param int $value 
	**/
	public function SetMax_value($value)
	{
		$this->values['max_value'] = $value;
	}
	/**
	* 获取最大红包金额 
	* @return 值
	**/
	public function GetMax_value()
	{
		return $this->values['max_value'];
	}
	/**
	* 判断最大红包金额是否存在
	* @return true 或 false
	**/
	public function IsMax_valueSet()
	{
		return array_key_exists('max_value', $this->values);
	}
    
    
    /**
	* 设置红包总数
	* @param int $value 
	**/
	public function SetTotal_num($value)
	{
		$this->values['total_num'] = $value;
	}
	/**
	* 获取红包总数 
	* @return 值
	**/
	public function GetTotal_num()
	{
		return $this->values['total_num'];
	}
	/**
	* 判断红包总数是否存在
	* @return true 或 false
	**/
	public function IsTotal_numSet()
	{
		return array_key_exists('total_num', $this->values);
	}
    
    
    /**
	* 设置红包祝福语 
	* @param string $value 
	**/
	public function SetWishing($value)
	{
		$this->values['wishing'] = $value;
	}
	/**
	* 获取红包祝福语 
	* @return 值
	**/
	public function GetWishing()
	{
		return $this->values['wishing'];
	}
	/**
	* 判断红包祝福语 是否存在
	* @return true 或 false
	**/
	public function IsWishingSet()
	{
		return array_key_exists('wishing', $this->values);
	}
    
    
    /**
	* 设置Ip地址 
	* @param string $value 
	**/
	public function SetClient_ip($value)
	{
		$this->values['client_ip'] = $value;
	}
	/**
	* 获取Ip地址  
	* @return 值
	**/
	public function GetClient_ip()
	{
		return $this->values['client_ip'];
	}
	/**
	* 判断Ip地址 是否存在
	* @return true 或 false
	**/
	public function IsClient_ipSet()
	{
		return array_key_exists('client_ip', $this->values);
	}
    
    
    /**
	* 设置活动名称  
	* @param string $value 
	**/
	public function SetAct_name($value)
	{
		$this->values['act_name'] = $value;
	}
	/**
	* 获取活动名称  
	* @return 值
	**/
	public function GetAct_name()
	{
		return $this->values['act_name'];
	}
	/**
	* 判断活动名称 是否存在
	* @return true 或 false
	**/
	public function IsAct_nameSet()
	{
		return array_key_exists('act_name', $this->values);
	}
    
    
    /**
	* 设置备注  
	* @param string $value 
	**/
	public function SetRemark($value)
	{
		$this->values['remark'] = $value;
	}
	/**
	* 获取备注 
	* @return 值
	**/
	public function GetRemark()
	{
		return $this->values['remark'];
	}
	/**
	* 判断备注 是否存在
	* @return true 或 false
	**/
	public function IsRemarkSet()
	{
		return array_key_exists('remark', $this->values);
	}
    
    
    
    /**
	* 设置商户logo的url   
	* @param string $value 
	**/
	public function SetLogo_imgurl($value)
	{
		$this->values['logo_imgurl'] = $value;
	}
	/**
	* 获取商户logo的url  
	* @return 值
	**/
	public function GetLogo_imgurl()
	{
		return $this->values['logo_imgurl'];
	}
	/**
	* 判断商户logo的url 是否存在
	* @return true 或 false
	**/
	public function IsLogo_imgurlSet()
	{
		return array_key_exists('logo_imgurl', $this->values);
	}

    
}
