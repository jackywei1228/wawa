<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>欢迎登录后台管理系统</title>
<link href="/Public/Admin/css/base.css" rel="stylesheet" type="text/css" />
<link href="/Public/Admin/css/right.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="place"> <span>位置：</span>
  <ul class="placeul">
    <li><a href="index.php">首页</a></li>
    <li>微信回复</li>
  </ul>
</div>
<div class="rightinfo">
  <ul class="imglist">
    <li class="selected"> <a href="<?php echo U('Wxhuifu/keylist?stype=0');?>"> <span><img src="/Public/Admin/image/wx_1.png" width="110" height="110" /></span>
      <p>被关注回复</p>
      </a></li>
    <li class="selected"> <a href="<?php echo U('Wxhuifu/keylist?stype=1');?>"> <span><img src="/Public/Admin/image/wx_3.png" width="110" height="110" /></span>
      <p>关键词回复</p>
      </a></li>
  </ul>
</div>
</body>
</html>