<?php
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);

require_once "lib/WxPay.Api.php";
require_once "lib/WxPay.NativePay.php";
require_once 'lib/log.php';

//模式一
/**
 * 流程：
 * 1、组装包含支付信息的url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、确定支付之后，微信服务器会回调预先配置的回调地址，在【微信开放平台-微信支付-支付配置】中进行配置
 * 4、在接到回调通知之后，用户进行统一下单支付，并返回支付信息以完成支付（见：native_notify.php）
 * 5、支付完成之后，微信服务器会通知支付成功
 * 6、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */
$notify = new NativePay();
// $url1 = $notify->GetPrePayUrl("123456789");

//模式二
/**
 * 流程：
 * 1、调用统一下单，取得code_url，生成二维码
 * 2、用户扫描二维码，进行支付
 * 3、支付完成之后，微信服务器会通知支付成功
 * 4、在支付成功通知中需要查单确认是否真正支付成功（见：notify.php）
 */
$input = new WxPayUnifiedOrder();
$input->SetBody('充值');
$input->SetAttach("充值");
$input->SetOut_trade_no(DANHAO);
$input->SetTotal_fee(NUM);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("充值");
$input->SetNotify_url('http://' . $_SERVER['HTTP_HOST'] . __ROOT__ . '/index.php/Wap/Paynotify/wxchongzhi.html');
$input->SetTrade_type("NATIVE");
$input->SetProduct_id(date("YmdHis", time() + 600));
//$result = $notify->GetPayUrl($input);
//$url2 = $result["code_url"];
$order = \WxPayApi::unifiedOrder($input);
//var_dump($order);exit;
$url = $order['code_url'];
$userid = session('userid');
vendor('phpqrcode.phpqrcode');
$drpath = './Uploads/daili';
$imgma = 'ma' . $userid . 'zhifu1.png';
$msize = 5;
$phpqrcode = new \QRcode();
$hurl = $url;
$errorLevel = 'L';
$phpqrcode->png($hurl, $drpath . '/' . $imgma, $errorLevel, $msize, 2);
header('Content-type: image/jpg');
echo file_get_contents('./Uploads/daili/'.$imgma);  
?>

