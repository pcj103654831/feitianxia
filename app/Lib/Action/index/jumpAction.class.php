<?php

class jumpAction extends FirstendAction {

    public function _initialize() {
        parent::_initialize();
		$this->_mod = D('items');
    }

    /**
     * 淘宝跳转
     */
    public function index() {
		$id = I('id','', 'trim');
		$iid = I('iid','','trim');
		$tpl = 'index';
		if($id){
			if(strlen($id)>9){
					$item = $this->_mod->where(array('num_iid' => $id))->find();
			}else{
				$item = $this->_mod->where(array('id' => $id))->find();
			}
			if(!$item){
				$item['num_iid'] = $id;	
			}
		}
		if($iid){
			$this->_mod  = M('items');
			$item = $this->_mod ->where(array('num_iid' => $iid))->find();
			if(!$item){
				$item['num_iid'] = $iid;	
			}
		}
		if(C('ftx_click_ai')){
			$tpl = 'taobao';
			if( $item['click_url'] && 0 < strpos( $item['click_url'], "s.click" ) ){
				$this->jump_hidden_referer( $item['click_url'] );
			}else if ( 0 < strpos( $item['click_url'], "redirect.simba.taobao.com" ) ){
				$this->jump_hidden_referer( $item['click_url'] );
			}
		}

		$taodianjin = C('ftx_taojindian_html');
		if(strpos($taodianjin,'text/javascript')){
			$pid = get_word($taodianjin,'pid: "','"');
		}else{
			$pid = $taodianjin;
		}
		$this->assign('pid', $pid);
		$this->assign('item', $item);
        $this->display($tpl);
    }


	public function jump_hidden_referer( $url, $wait = 0 )
    {
        $s = "<script language=\"javascript\">var iurl=\"".$url."\";document.write(\"<meta http-equiv=\\\"refresh\\\" content=\\\"0;url=\"+iurl+\"\\\" />\");</script>";
        if ( strpos( $_SERVER['HTTP_USER_AGENT'], "AppleWebKit" ) )
        {
            $s = "<script language=\"javascript\">var iurl=\"data:text/html;base64,".base64_encode( $s )."\";document.write(\"<meta http-equiv=\\\"refresh\\\" content=\\\"".$wait.";url=\"+iurl+\"\\\" />\");</script>";
        }
        else
        {
            $s = str_replace( "\"0;", "\"".$wait.";", $s );
        }
        echo $s;
        exit( );
    }
}