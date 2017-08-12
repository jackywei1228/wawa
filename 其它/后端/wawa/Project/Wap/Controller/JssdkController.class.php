<?php
/**
*
* 版权所有：翊辰科技
* 作    者：黑月<634539892@qq.com>
* 日    期：2016-03-30
* 版    本：1.0.0
* 功能说明：JSsdk回调事件。
*
**/
namespace Wap\Controller;
vendor('wxpay.WxPayApi');
class JssdkController extends \Think\Controller{
public function index(){
$c = M('sys_config')->find();
$APPID = $c['cwxappid'];
$appsecret = $c['cwxappsecret'];
$url=$_GET['url'];
$jssdk = new JSSDK($APPID,$appsecret,$url);
$signPackage = $jssdk->GetSignPackage();
$this->ajaxReturn($signPackage, 'json');exit;
echo 'callback({"success":true,"result":{"appid":"'.$signPackage["appId"].'","noncestr":"'.$signPackage["nonceStr"].'","timestamp":'.$signPackage["timestamp"].',"signature":"'.$signPackage["signature"].'"}})';

}
		
	
}


class JSSDK {
  private $appId;
  private $appSecret;
  private $url;
  

  public function __construct($appId, $appSecret,$url) {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
	$this->url=$url;
  }

  public function getSignPackage() {
    $jsapiTicket = $this->getJsApiTicket();

    // 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    //$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$url=$this->url;
    $timestamp = time();
    $nonceStr = $this->createNonceStr();

    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

    $signature = sha1($string);

    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage; 
  }

  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

  private function getJsApiTicket() {
    // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode($this->get_php_file("ThinkPHP\Library\Vendor\jssdk\jsapi_ticket.php"));
    if ($data->expire_time < time()) {
      $accessToken = $this->getAccessToken();
      // 如果是企业号用以下 URL 获取 ticket
      // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
      $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
      $res = json_decode($this->httpGet($url));
      $ticket = $res->ticket;
      if ($ticket) {
        $data->expire_time = time() + 7200;
        $data->jsapi_ticket = $ticket;
        $this->set_php_file("ThinkPHP\Library\Vendor\jssdk\jsapi_ticket.php", json_encode($data));
      }
    } else {
      $ticket = $data->jsapi_ticket;
    }

    return $ticket;
  }

  public function getAccessToken() {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode($this->get_php_file("ThinkPHP\Library\Vendor\jssdk\access_token.php"));
    if ($data->expire_time < time()) {
      // 如果是企业号用以下URL获取access_token
      //$url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
      $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
      $res = json_decode($this->httpGet($url));
      $access_token = $res->access_token;
      if ($access_token) {
        $data->expire_time = time() + 7200;
        $data->access_token = $access_token;
        $this->set_php_file("ThinkPHP\Library\Vendor\jssdk\access_token.php", json_encode($data));
      }
    } else {
      $access_token = $data->access_token;
	  $resu=json_decode($this->httpGet("https://api.weixin.qq.com/cgi-bin/menu/get?access_token=".$access_token));
	  if($resu->errcode==40001){//access_token失效了
	 $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
      $res = json_decode($this->httpGet($url));
      $access_token = $res->access_token;
      if ($access_token) {
        $data->expire_time = time() + 7200;
        $data->access_token = $access_token;
        $this->set_php_file("ThinkPHP\Library\Vendor\jssdk\access_token.php", json_encode($data));
      }  
	  }
    }
    return $access_token;
  }

  private function httpGet($url) {
$res=file_get_contents($url);
    return $res;
  }

  private function get_php_file($filename) {
    return trim(substr(file_get_contents($filename), 15));
  }
  private function set_php_file($filename, $content) {
    $fp = fopen($filename, "w");
    fwrite($fp, "<?php exit();?>" . $content);
    fclose($fp);
  }
}

