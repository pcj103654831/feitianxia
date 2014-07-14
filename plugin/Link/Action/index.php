<?php

	if(!$action){
		$mod = M('link');
		$list = $mod->where('1=1')->select();
		$this->assign('list',$list);
	}

?>