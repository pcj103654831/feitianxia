<?php
class goodsAction extends FirstendAction {
    public function _initialize() {
        parent::_initialize();
        if (!$this->visitor->is_login) {
            IS_AJAX && $this->ajaxReturn(0, L('login_please'));
            $this->redirect('user/login');
        }
		$this->_mod = D('items');
		$this->cid = $_SERVER['HTTP_HOST'];
        $this->_cate_mod = D('items_cate');
		$this->assign('nav_curr', 'index');		
    }

	public function goods_edit(){
		if(IS_POST){
		}else{

			$id = I('id','', 'trim');
			!$id && $this->_404();
			$item = $this->_mod->where(array('id' => $id))->find();
			!$item && $this->_404();

			$orig_list = M('items_orig')->where(array('pass'=>1))->select();
			$this->assign('orig_list',$orig_list);
			$this->assign('item',$item);
			$this->_config_seo(array(
				'title' => '宝贝修改	-	' . C('ftx_site_name'),
			));
			$this->display();
		}

	}

	public function goods_add() {
		$orig_list = M('items_orig')->where(array('pass'=>1))->select();
		$this->assign('orig_list',$orig_list);
		$this->_config_seo(array(
			'title' => L('goods_add') . '	-	' . C('ftx_site_name'),
		));
		$this->display();
	}

	public function mygoods() {
		$item_mod = M('items');
		$cate_mod = M('items_cate');
		$page_size = 20;
        $p = I('p',1, 'intval'); //页码
        $start = $page_size * ($p - 1) ;

        $res = $cate_mod->field('id,name')->select();
        $cate_list = array();
        foreach ($res as $val) {
            $cate_list[$val['id']] = $val['name'];
        }
        $this->assign('cate_list', $cate_list);
		$type = I('type', 'all', 'trim'); //排序
		$order = 'ordid asc ';
		$map['uid'] = $this->visitor->info['id'];
		switch ($type) {
            case 'all':
                break;
            case 'pass':
                $map['pass'] = 1;   
                break;
			case 'wait':
				$map['pass'] = 0;
				$map['status'] = 'underway';
                break;
			case 'fail':
                $map['pass'] = 0; 
				$map['status'] = 'fail';
                break;
        }
		$goods_list = $item_mod->where($map)->order('add_time desc')->limit($start . ',' . $page_size)->select();
		$this->assign('goods_list', $goods_list);
		$count = $item_mod->where($map)->count('id');
		$pager = $this->_pager($count, $page_size);
        $this->assign('page_bar', $pager->fshow());

		$this->assign('type', $type);
		$this->_config_seo(array(
            'title' => L('my_goods') . '	-	' . C('ftx_site_name'),
        ));
		$this->display();
	}

	public function view(){
		$id = I('id','','trim');
        !$id && $this->_404();
		$item = $this->_mod->where(array('id' => $id))->find();
		!$item && $this->_404();
		if($item['uname'] != $this->visitor->info['username']){
			 $this->redirect('goods/mygoods');
		}

		$this->assign('item', $item);
		$this->_config_seo(array(
            'title' => '报名管理	-	' . C('ftx_site_name'),
        ));
		$this->display();
	}

    /**
     * AJAX获取宝贝
     */
    public function ajaxgetid( )
{
/*
$url = $this->_get( "url","trim");
if ( $url == "")
{
$this->ajaxReturn( 0,l( "please_input").l( "correct_itemurl") );
}
if ( !$this->get_id( $url ) )
{
$this->ajaxReturn( 0,l( "please_input").l( "correct_itemurl") );
}
$iid = $this->get_id( $url );
$items = m( "items")->where( array(
"num_iid"=>$iid
) )->find( );
if ( $items )
{
$this->ajaxReturn( 1005,l( "item_exist") );
}
$itemcollect = new itemcollect( );
$itemcollect->url_parse( $url );
if ( $item = $itemcollect->fetch_tb( ) )
{
$this->ajaxReturn( 1,"",$item );
}
$this->ajaxReturn( 0,l( "item_not_excute") );
*/
}
public function ajaxGetItem()
{

	if(!isset($_REQUEST['url']))
	$this->ajaxReturn (0,'未传入商品链接');
	$info = getInfo($_REQUEST['url']);
	$info['shop_type']='B';
	$info['orig_id']='';
	$info['coupon_rate'] = intval(($info['price'] / $info['coupon_price'])) * 1000;
    $this->ajaxReturn(1,'',$info);
}

	/**
     * AJAX提交
     */
	public function ajaxadd()
{
	if (IS_POST)
	{
		$items_mod = M( "items");
		$num_iid          = $this->_post( "iid","trim");
		$cate_id          = $this->_post( "cate_id","trim");
		$title            = $this->_post( "title","trim");
		$sellerId         = $this->_post( "sellerId","trim");
		//$click_url        = $this->_post( "click_url","trim");
		$nick             = $this->_post( "nick","trim");
		$price            = $this->_post( "price","trim");
		$coupon_price     = $this->_post( "coupon_price","trim");
		$inventory        = $this->_post( "good_inventory","trim");
		$pic_url          = $this->_post( "pic_url","trim");
		$coupon_rate      = $this->_post( "coupon_rate","trim");
		$shop_type        = $this->_post( "shop_type","trim");
		$volume           = $this->_post( "volume","trim");
		$intro            = $this->_post( "intro","trim");
		$coupon_start_time		= $this->_post( "coupon_start_time","trim");
		$coupon_end_time			= $this->_post( "coupon_end_time","trim");
		$likes            = rand(99,9999);
		$items = $items_mod->where(array("num_iid"=>$num_iid))->find();
		if ($items)
		{
			$this->ajaxReturn( 1005,L( "item_exist") );
		}
		$data['num_iid']      = $num_iid;
		$data['cate_id']      = $cate_id;
		$data['title']        = $title;
		$data['nick']         = $nick;
		$data['ems']          = 1;
		$data['sellerId']        = $sellerId;
		//$data['click_url']    = $click_url;
		$data['price']        = $price;
		$data['coupon_price'] = $coupon_price;
		$data['coupon_rate']  = $coupon_rate;
		$data['inventory']    = $inventory;
		$data['volume']       = $volume;
		$data['likes']        = $likes;
		$data['pic_url']      = $pic_url;
		$data['intro']        = $intro;
		$data['shop_type']    = $shop_type;
		$data['add_time']     = time();
		$data['pass']         = 0;
		$data['uid']          = $this->visitor->info['id'];
		$data['uname']        = $this->visitor->info['username'];
		$data['coupon_start_time']			= strtotime($coupon_start_time);
		$data['coupon_end_time']			= strtotime($coupon_end_time);
		$items_mod->create( $data );
		$items_mod->add( );
		$resp = $this->fetch( "dialog:goods_add_success");
		$this->ajaxReturn( 1,"",$resp );
	}
}


	/**
     * AJAX提交
     */
	public function ajaxedit(){
		if(IS_POST){
			$items_mod		= M('items');
			$num_iid		= I('iid','', 'trim');
			if($num_iid == ''){
				$this->ajaxReturn(1005, '商品IID不能为空，请输入宝贝地址获取');
			}
			$id		= I('id','', 'trim');
			if($id == ''){
				$this->ajaxReturn(1005, 'ID不能为空，请返回正常渠道提交！');
			}
			$sellerId             = I('sellerId',0,'trim');
			$cate_id		= I('cate_id','', 'trim');
			$title			= I('title','', 'trim');
			!$title && $this->ajaxReturn(1005, '商品名称不能为空');
			$nick				= I('nick','', 'trim');
			!$nick && $this->ajaxReturn(1005, '掌柜名称不能为空');
			$price			= I('price','', 'trim');
			$coupon_price	= I('coupon_price','', 'trim');
			$inventory		= I('good_inventory','', 'trim');
			$ems		= I('ems','', 'trim');
			$volume		= I('volume','', 'trim');
			$pic_url		= I('pic_url','', 'trim');
			$shop_type		= I('shop_type','', 'trim');
			$coupon_start_time		= I('coupon_start_time','', 'trim');
			$coupon_end_time			= I('coupon_end_time','', 'trim');
			$intro			= I('intro','', 'trim');
            $likes            = rand(99,9999);
			$map['num_iid'] = $num_iid;
			$map['id']		= $id;
			$map['uname']	= $this->visitor->info['username'];

			$items = $items_mod->where($map)->find();
			!$items && $this->ajaxReturn(1005, L('item_not_exist'));

 
			$data['cate_id']		= $cate_id;
			$data['title']			= $title;
			$data['price']			= $price;
			$data['coupon_price']	= $coupon_price;
			$data['inventory']		= $inventory;
			$data['pic_url']		= $pic_url;
			$data['ems']            = 1;			
			$data['likes']        = $likes;
			$data['sellerId']        = $sellerId;
			$data['volume']			= $volume;
			$data['intro']			= $intro;
			$data['coupon_start_time']			= strtotime($coupon_start_time);
			$data['coupon_end_time']			= strtotime($coupon_end_time);
			$data['shop_type']		= $shop_type;
			$data['add_time']		= time();
			$data['pass']			= 0;
			$data['status']			= 'underway';
			 if (false == $this->_mod->create($data)) {
                $this->error($this->_mod->getError());
            }
			if($this->_mod->where(array('id'=>$id))->save($data)){
				$resp = $this->fetch('dialog:goods_add_success');
				$this->ajaxReturn(1, '', $resp);
			}else{
				$this->ajaxReturn(0, '数据错误，请检查！');
			}
		}
	}

	public function get_id($url) {
        $id = 0;
        $parse = parse_url($url);
        if (isset($parse['query'])) {
            parse_str($parse['query'], $params);
            if (isset($params['id'])) {
                $id = $params['id'];
            } elseif (isset($params['item_id'])) {
                $id = $params['item_id'];
            } elseif (isset($params['default_item_id'])) {
                $id = $params['default_item_id'];
            } elseif (isset($params['amp;id'])) {
                $id = $params['amp;id'];
            } elseif (isset($params['amp;item_id'])) {
                $id = $params['amp;item_id'];
            } elseif (isset($params['amp;default_item_id'])) {
                $id = $params['amp;default_item_id'];
            }
        }
        return $id;
    }

	private function _get_ftx_top() {
        vendor('Ftxia.TopClient');
        vendor('Ftxia.RequestCheckUtil');
        vendor('Ftxia.Logger');
        $tb_top = new TopClient;
        $tb_top->appkey = $this->_ftxconfig['app_key'];
        $tb_top->secretKey = $this->_ftxconfig['app_secret'];
        return $tb_top;
    }
}
function getInfo($url){
		$u = parse_url($url);
		//解析get参数
		$param = convertUrlQuery($u['query']);
		$test['param']=$param;
		//var_dump($param);exit;
		if(!stripos('taobao.com',$u['host'])){
			$shopUrl = "http://hws.m.taobao.com/cache/wdetail/5.0/?id=".$param['id'];
		}else{
			$shopUrl = "http://detail.m.tmall.com/item.htm?id=".$param['id'];
		}		
	
		$ch = curl_init(); 
		curl_setopt($ch, CURLOPT_URL, $shopUrl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION,true);
		curl_setopt($ch, CURLOPT_MAXREDIRS,2);
		$file_contents = curl_exec($ch);		
		curl_close($ch);
		if(!$file_contents){
			$file_contents = file_get_contents($shopUrl);
		}
		if(!stripos('taobao.com',$u['host'] === false)){
			$data = getTaobaoShopInfo($file_contents);
		}else{
			$data = getTmallShopInfo($file_contents);
		}
		$data['num_iid'] = $param['id'];
		return $data;
	}
	function getTaobaoShopInfo($content){
		$data = json_decode($content,true);		
		$info = array();
		$tmp = json_decode($data['data']['apiStack'][0]['value'],true);
		$info['title'] = $data['data']['itemInfoModel']['title'];
		$info['volume'] = $tmp['data']['itemInfoModel']['totalSoldQuantity'];
		$info['coupon_price'] = $tmp['data']['itemInfoModel']['priceUnits'][0]['price'];
		if(substr_count($info['coupon_price'],'-')){
			$tmp1 = explode('-',$info['coupon_price']);
			$info['coupon_price'] = min($tmp1[0],$tmp1[1]);
		}
		$info['price'] = $tmp['data']['itemInfoModel']['priceUnits'][1]['price'];
		if(substr_count($info['price'],'-')){
			$tmp = explode("-",$info['price']);
			$info['price'] = min($tmp[0],$tmp[1]);
		}		
		$info['pic_url'] = $data['data']['itemInfoModel']['picsPath'][0];
		$info['pic_url'] = str_replace("_320x320.jpg","",$info['pic_url']);
		$info['nick'] = $data['data']['seller']['nick'];
		$info['sellerId'] = $data['data']['seller']['userNumId'];
		return $info;
	}
	function getTmallShopInfo($content){
	//	echo '<h1>Tmall</h1>';
		//标题正则

		$info = array();
		preg_match_all('/<title >(.*?) - 手机淘宝网 <\/title>/i',$content,$arr);
		$info['title'] = $arr[1][0];
		preg_match_all('/<b class="p-price-v">(.*?)<\/b>/i',$content,$arr);
		$info['coupon_price'] = $arr[1][0];
		if(substr_count($info['coupon_price'],'-')){
			$tmp1 = explode('-',$info['coupon_price']);
			$info['coupon_price'] = min($tmp1[0],$tmp1[1]);
		}
		preg_match_all('/<span class="o-price-v">(.*?)<\/span>/i',$content,$arr);
		$info['price'] = $arr[1][0];
		if(substr_count($info['price'],'-')){
			$tmp = explode("-",$info['price']);
			$info['price'] = min($tmp[0],$tmp[1]);
		}
		preg_match_all('<div class="value"><b>(.*?)<\/b>/si',$content,$arr);
		$info['volume'] = trim($arr[1][0]);
		preg_match_all('/<img alt=".*?" src="(.*?)" \/>/',$content,$arr);
		$info['pic_url'] = str_replace('170','320',$arr[1][0]);
		$info['pic_url'] = str_replace("_320x320.jpg","",$info['pic_url']);
		preg_match('/nick=(.+?)&/',$content,$nicks);
		$info['nick'] = urldecode($nicks[1]);
		return $info;
	}
	function convertUrlQuery($query)
	{
			$queryParts = explode('&', $query);
			$params = array();
			foreach ($queryParts as $param)
			{
				$item = explode('=', $param);
				$params[$item[0]] = $item[1];
			}
			return $params;
	}
	?>