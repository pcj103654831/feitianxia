<?php

class upgradeAction extends BackendAction{

	private $_tbconfig = null;
    public function _initialize( ){
        parent::_initialize( );
        $this->_mod_setting = D("setting");
		$api_config = M('items_site')->where(array('code' => 'ftxia'))->getField('config');
        $this->_tbconfig = unserialize($api_config);
    }

    public function index(){
        exit();
    }

    public function version(){
		if(!$this->_tbconfig['app_key']){$this->ajaxReturn(0, '请设置飞天侠开放平台appkey');}
		$tb_top = $this->_get_tb_top();
        $req = $tb_top->load_api('FtxiaUpgradeGetRequest');
        $req->setRelease(FTX_RELEASE);
		$req->setTime(date("y-m-d-h",time()));
        $resp = $tb_top->execute($req);
        $result = (array)$resp->result;

        if($result && $result['status'] == 1){
			if(class_exists("ZipArchive")){
				$durl = $result['url'];
				$newfname = date('YmdHis',time()).".zip";
				$width = 500;
				$file = fopen($durl,"rb");
				if($file){
					$filesize = -1;
					$headers = get_headers( $durl, 1 );
					if(!array_key_exists( "Content-Length", $headers ) ){
						$filesize = 0;
					}
					$filesize = $headers['Content-Length'];
					$total = $filesize;
					$pix = $width / $total;
					$newf = fopen( $newfname, "wb" );
					while ($newf && !feof($file)){
						$data = fread( $file, 8192 );
						$downlen += strlen( $data );
						fwrite($newf, $data, 8192 );
					}
					if($file){
						fclose($file);
					}
					if($newf){
						fclose($newf);
					}
				}else{
					$this->ajaxReturn( 0, "没有更新的文件-8" );
				}
				@ob_flush();
				@flush();
				$zip_filepath = $newfname;
				if(!is_file($zip_filepath)){
					$this->ajaxReturn( 0, "没有更新的文件-9" );
				}
				$zip = new ZipArchive();
				$rs = $zip->open( $zip_filepath );
				if($rs!== TRUE){
					$this->ajaxReturn( 0, "更新失败" );
				}
				$destination = ".";
				$zip->extractTo($destination);
				$zip->close();
				if(file_exists($newfname)){
					unlink( $newfname );
				}
				$this->ajaxReturn( 1 ,"更新成功,请手动清空缓存！");
			}else{
				$this->ajaxReturn( 0, "请开启支持在线更新相关类：php.ini中 php_zip.dll扩展");
			}
		}else{
            $this->ajaxReturn( 0, $result['msg'] );
        }
    }


	private function _get_tb_top() {
        vendor('Ftxia.TopClient');
        vendor('Ftxia.RequestCheckUtil');
        vendor('Ftxia.Logger');
        $tb_top = new TopClient;
        $tb_top->appkey = $this->_tbconfig['app_key'];
        $tb_top->secretKey = $this->_tbconfig['app_secret'];
        return $tb_top;
    }


}
?>
