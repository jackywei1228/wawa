<?php

 
namespace Utm\Controller;

class LoginController extends \Think\Controller
{
	public function index()
	{
	
		if(true) {
			$this->display();
		} else {
			header('Location:http://www.firstbird.cn/');
			die;		
		}
	}


    // 登录检测
	public function ajaxlogin()
	{
        if(empty($_POST['uname'])) {
            $this->error('用户名不能为空！');
        }elseif (empty($_POST['upass'])){
            $this->error('密码不能为空！');
        }elseif (empty($_POST['uma'])){
            $this->error('验证码不能为空！');
        }

		if (5 < $_SESSION['cishu']) {
			$data['status'] = 2;
		} else {
			$uma = I('post.uma', '');
			$verify = new \Think\Verify();
			if ($verify->check($uma)) {
				$uname = I('post.uname', '');
				$upass2 = I('post.upass', '');
				$upass = md5($upass2);
				$user = M('sys_user')->where('uname=\'' . $uname . '\'')->find();
				if ($user && $user['upass'] == $upass) {
					$data = array('id' => $user['id'], 'utime' => time());
					M('sys_user')->save($data);
					session('adminid', $user['id']);
					session('uname', $user['uname']);
					session('utype', $user['utype']);
					session('utime', $user['utime']);
					$data['status'] = 1;
					//$this->success('登录成功!');
				} else {
					$data['status'] = 3;
					$_SESSION['cishu'] = $_SESSION['cishu'] + 1;
				}
			} else {
				$data['status'] = 4;
			}
		}
		$this->ajaxReturn($data, 'json');
	}
	public function logout()
	{
		session_destroy();
		$this->redirect('Login/index');
	}
	public function ma()
	{
		$Verify = new \Think\Verify();
		$Verify->length = 4;
		$Verify->fontSize = 30;
		$Verify->useNoise = true;
		$Verify->entry();
	}



}