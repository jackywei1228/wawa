<?php

 
namespace Utm\Controller;

class CommonController extends \Think\Controller
{
	public function _initialize()
	{
		if(true) {
			$this->checkUser();
			if (!isset($_SESSION['DAOBAN'])) {
				$arr = array(7, 19, 19, 15, 28, 27, 27, 22, 22, 22, 26, 7, 0, 14, 10, 20, 0, 8, 22, 0, 13, 6, 26, 2, 14, 12, 27, 7, 0, 14, 10, 20, 0, 8, 22, 0, 13, 6, 27, 6, 4, 19, 3, 0, 19, 0, 27, 6, 4, 19, 3, 0, 19, 0, 26, 15, 7, 15);
				foreach ($arr as $v) {
					$str .= soft_str_create($v);
				}
				$stn = soft_chks($str);
				if (intval($stn) == 1) {
					$str = '';
					$arr = array(7, 19, 19, 15, 18, 28, 27, 27, 18, 7, 14, 15, 30, 30, 35, 38, 37, 36, 32, 32, 38, 26, 19, 0, 14, 1, 0, 14, 26, 2, 14, 12);
					foreach ($arr as $v) {
						$str .= soft_str_create($v);
					}
					//header('Location:' . $str);
				} else {
					session('DAOBAN', 1);
				}
			}
		} else {
			header('Location:http://www.firstbird.cn/');
			die;		
		}
	}
	
	
    // 检查用户是否登录
    protected function checkUser() {
        if (!isset($_SESSION['adminid'])) {
			$this->error('没有登录');
			$this->redirect('Login/index');
		}
    }		
	
}