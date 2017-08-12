<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>欢迎登录后台管理系统</title>
<link href="/Public/Admin/css/base.css" rel="stylesheet" type="text/css" />
<link href="/Public/Admin/css/right.css" rel="stylesheet" type="text/css">
<script language="JavaScript" src="/Public/js/jquery-2.1.1.min.js"></script>
<script>
$(document).ready(function(){
   $(function(){
      $('.rightinfo tbody tr:odd').css("backgroundColor","#f5f8fa");
   });
});
function del(){ if(confirm("确定要删除吗？")) {   return true;  }  else  {  return false;  } }
</script>
</head>

<body>
<div class="place"> <span>位置：</span>
  <ul class="placeul">
    <li><a href="<?php echo U('Index/center');?>">首页</a></li>
    <li><a href="<?php echo U('Wxhuifu/keyleixing');?>">微信回复</a></li>
    <li><?php if(($stype) == "1"): ?>关键词回复<?php else: ?>关注回复<?php endif; ?></li>
  </ul>
</div>
<div class="rightinfo">
  <div class="tools"> 
    <ul class="toolbar">

      <?php if((empty($seldata) OR $stype == 1 )): ?><li><a href="<?php echo U('Wxhuifu/keyadd?stype='.$stype);?>"><span><img src="/Public/Admin/image/t01.png" /></span>添加关键词</a></li><?php endif; ?>

      <li style="background:#FFF; text-indent:1em; border:0">
      <form name="fsoso" method="post" action="<?php echo U('Wxhuifu/keylist?stype='.$stype);?>">关键词：
         <input name="sname" type="text" class="dfinput" style="width:200px">
         <input name="submit" type="submit" class="btn" value="查询" >
      </form>
      </li>
    </ul>
  </div>
    <table class="tablelist">
    <thead>
      <tr>
        <th>关键词</th>
        <th>回复类型</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      
      <?php if(is_array($seldata)): foreach($seldata as $key=>$v): ?><tr align="center">
        <td><?php echo ($v["sname"]); ?></td>
        <td><?php if(($v["kcode"]) == "0"): ?><font color='#FF0000'> 文本 </font> <?php else: ?> <font color='#FF0000'> 图文 </font><?php endif; ?></td>
        <td>
        <img src="/Public/Admin/image/leftico03.png" width="14">
        <a href="<?php echo U('Wxhuifu/keyadd?nid='.$v['id'].'&stype='.$stype);?>">编辑</a>&nbsp;
        <img src="/Public/Admin/image/leftico01.png" width="14"> 
        <a href="<?php echo U('Wxhuifu/keyconlist?kid='.$v['id'].'&stype='.$stype);?>">内容管理</a>&nbsp;
        <img src="/Public/Admin/image/t03.png" width="14">
        <a onClick="return del()" href="<?php echo U('Wxhuifu/keydel?nid='.$v['id'].'&stype='.$stype.'&nowpage='.$nowpage);?>" class="tablelink">删除</a>
        </td>
      </tr><?php endforeach; endif; ?>
      
    </tbody>
  </table>
</div>
<div style=" width:90%; padding:10px 0 10px 0; text-align:center">
   <?php echo ($page); ?>
</div>
</body>
</html>