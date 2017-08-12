<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>欢迎登录后台管理系统</title>
<link href="/Public/Admin/css/base.css" rel="stylesheet" type="text/css" />
<link href="/Public/Admin/css/right.css" rel="stylesheet" type="text/css">
<link href="/Public/Admin/css/select.css" rel="stylesheet" type="text/css">

<script src="/Public/js/jquery-2.1.1.min.js"></script>
<script src="/Public/js/select-ui.min.js"></script>

<script>
$(document).ready(function(){	
   $(".select1").uedSelect({
		width : 345		  
   });
});
function removeFile(e){	$(e).parent().parent().remove();}
</script>
</head>
<body>
<div class="place"> <span>位置：</span>
  <ul class="placeul">
    <li><a href="<?php echo U('Index/center');?>">首页</a></li>
    <li><a href="<?php echo U('index');?>">用户</a></li>
    <li>编辑</li>
  </ul>
</div>
<div class="formbody">
  <div class="formtitle"><span>基本信息</span></div>
  <form id="fadd" name="fadd" method="post" action="<?php echo U('save?id='.$id.'&nowpage='.$nowpage);?>">
   <ul class="forminfo">   
    <li>
      <label>用户ID</label>
      <cite>       <?php echo ($id); ?>      <i></i>      </cite> 
    </li>
    <li>
      <label>账户余额</label>
      <cite>       <?php echo ($user['uqianchong']/100); ?>    元  <i></i>      </cite> 
      </li>
    <li>
      <label>账户增加</label>
      <input name="yjiajine" type="text" class="dfinput" >
      <i>元</i></li>
    <li>
      <label>账户减少</label>
      <input name="yjianjine" type="text" class="dfinput" >
      <i>元</i></li>
    <li>
      <label>&nbsp;</label>
      <input type="submit" name="button" class="btn" value="确认保存" />
    </li>
  </ul>
  </form>
</div>
<div class="install"></div>
</body>
</html>