<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
<link href="/Public/Admin/css/base.css" rel="stylesheet" type="text/css" />
<link href="/Public/Admin/css/right.css" rel="stylesheet" type="text/css">
<link href="/Public/css/page.css" rel="stylesheet" type="text/css">
<script language="JavaScript" src="/Public/js/jquery-2.1.1.min.js"></script>
<script>
$(document).ready(function(){
   $(function(){
      $('.rightinfo tbody tr:odd').addClass('odd')
   });
   $('.but1').click(function(){
	  var userid=$(this).parent().find("input[name='userid']").val();
	  var par = $(this);
		 par.hide();
	     $.post("<?php echo U('ajaxjiesuan');?>",{userid:userid},function(res){	
		     if(res.code ==2){
			    alert('结算成功');		    
			 }
		     if(res.code ==3){
			    alert('结算失败，请查看系统日志失败原因');	
				par.show();	    
			 }
		     if(res.code ==4){
			    alert('今日付款次数上限了');		
				par.show();	 
			 }
		 },'json');  
   });
   $('.btnjiesuan').click(function(){
	   location.href = "<?php echo U('jiesuanall');?>";
   });
});
function del(){ if(confirm("确定要删除吗？")) {   return true;  }  else  {  return false;  } }
</script>
</head>

<body>
<div class="place"> <span>位置：</span>
  <ul class="placeul">
    <li><a href="<?php echo U('Index/center');?>">首页</a></li>
    <li>代理结算</li>
  </ul>
</div>
<div class="rightinfo">
  <div class="tools">
    <ul class="toolbar">
      <li style="background:#FFF; text-indent:1em; border:0">
        <form name="fsoso1" method="post" action="<?php echo U('tixian');?>">
          用户ID <input name="sci" type="text" class="dfinput" style="width:100px" >
          <input name="submit" class="btn" value="查询" type="submit">      
  
        </form>        
      </li>
    </ul>
  </div>
  <table class="tablelist">
    <thead>
      <tr>
        <th>ID</th>
        <th>Openid</th>
        <th width="17%">昵称</th>
        <th width="9%">头像</th>
        <th width="15%">未结算</th>
        <th width="17%">时间</th>
          <?php if(($sysconfig[cyongjinfa]) == "2"): ?><th>操作</th><?php endif; ?>
      </tr>
    </thead>
    <tbody>
      <?php if(is_array($tixian)): foreach($tixian as $key=>$v): ?><tr height="40" align="center">
          <td><?php echo ($v['userid']); ?></td>
          <td><?php echo ($v['uopenid']); ?></td>
          <td><?php echo ($v['uickname']); ?></td>
          <td><?php if(!empty($v[uheadimgurl])): ?><img src="<?php echo ($v['uheadimgurl']); ?>" height="54" width="54"/><?php endif; ?></td>
          <td><?php echo ($v['tixiane']/100); ?></td>
          <td><?php echo (date("Y-m-d H:i:s",$v[ttime])); ?></td>
          <?php if(($sysconfig[cyongjinfa]) == "2"): ?><td>
             <input type="hidden" name="userid" value="<?php echo ($v[userid]); ?>">
             <input name="button" type="button" class="btn but1" style="width:100px" value="结算"/>
          </td><?php endif; ?>
        </tr><?php endforeach; endif; ?>
    </tbody>
  </table>
</div>
<div class="pages"> <?php echo ($page); ?>
  <?php if(empty($tixian)): ?><font color='#ff0000'>暂无数据</font><?php endif; ?>
</div>
</body>
</html>