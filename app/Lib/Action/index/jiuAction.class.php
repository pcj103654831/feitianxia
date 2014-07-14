<?php
class jiuAction extends FirstendAction {
	public function _initialize() {
        parent::_initialize();
        $this->_mod = D('items');
        $this->_cate_mod = D('items_cate');
    }



	public function index(){
		$cid	=	"15";
		$sort	=	I('sort', 'default', 'trim'); //排序
		$status =	I('status', 'all', 'trim'); //排序
		$order	=	'ordid asc ';
		$tag	=	I('tag');

		$cinfo = $this->_cate_mod->where(array('id'=>$cid))->find();
		switch ($sort) {
			case 'new':
				$order.= ', coupon_start_time DESC';
				break;
			case 'price':
				$order.= ', price DESC';
				break;
			case 'hot':
				$order.= ', volume DESC';
				break;
			case 'rate':
				$order.= ', coupon_rate ASC';
				break;
			case 'default':
				$order.= ', '.$cinfo['sort'];
		}

		switch ($status) {
			case 'all':
                $map['status']="underway";
                break;
			case 'underway':
                $map['status']="underway";
                break;
			case 'sellout':
				$map['status']="sellout";
				break;
		}
		if($cinfo['shop_type']){$map['shop_type'] = $cinfo['shop_type'];}
		if($cinfo['mix_price']>0){$map['coupon_price'] = array('egt',$cinfo['mix_price']);}
		if($cinfo['max_price']>0){$map['coupon_price'] = array('elt',$cinfo['max_price']);}
		if($cinfo['max_price']>0 && $cinfo['mix_price']>0){$map['coupon_price'] = array(array('egt',$cinfo['mix_price']),array('elt',$cinfo['max_price']),'and');}
		if($cinfo['mix_volume']>0){$map['volume'] = array('egt',$cinfo['mix_volume']);}
		if($cinfo['max_volume']>0){$map['volume'] = array('elt',$cinfo['max_volume']);}
		if($cinfo['max_volume']>0 && $cinfo['mix_volume']>0){$map['volume'] = array(array('egt',$cinfo['mix_volume']),array('elt',$cinfo['max_volume']),'and');}

		if($cinfo['thiscid']==0){
    		$id_arr = $this->_cate_mod->get_child_ids($cid, true);
    		$map['cate_id'] = array('IN', $id_arr);
		}

		if (false === $cate_list = S('cate_list')) {
			$cate_list = $this->_cate_mod->cate_cache();
		}
		if($tag){
			$id_arr = $this->_cate_mod->get_child_ids($tag, true);
    		$map['cate_id'] = array('IN', $id_arr);
			if($cate_list['s'][$tag]){
				$tag_list = $cate_list['s'][$tag];
			}else{
				if (false === $cate_data = S('cate_data')) {
					$cate_data = $this->_cate_mod->cate_data_cache();
				}
				if($cate_list['s']){
					$tag_list = $cate_list['s'][$cate_data[$tag]['pid']];
				}else{
					$tag_list = $cate_list['p'];
				}
			}
		}else{
			$tag_list = $cate_list['p'];
		}
		$this->assign('tag_list',$tag_list);
		$this->assign('tag',$tag);
 

		$this->assign('cid',$cid);
		$this->assign('pager','cate');
		$this->assign('cinfo',$cinfo);
		if($cinfo['wait_time'] == '1'){
			$map['coupon_start_time'] = array('egt',time());
		}elseif($cinfo['wait_time'] =='2'){
			$map['coupon_start_time'] = array('elt',time());
		}
		if($cinfo['end_time'] == '1'){
			$map['coupon_end_time'] = array('egt',time());
		}
		if($cinfo['ems'] == '1'){
			$map['ems'] = '1';
		}
		$map['pass']="1";
		$map['isshow'] = '1';
		$index_info['sort']=$sort;
		$index_info['status']=$status;
		$index_info['cid']=$cid;
		$page_size = C('ftx_index_page_size');
		$p = I('p',1, 'intval'); //页码
		$index_info['p']=$p;
		$start = $page_size * ($p - 1) ;

		
 
		if(C('ftx_site_cache')){
			$mdarray = $map;
			$mdarray['sort'] = $sort;
			$mdarray['tag'] = $tag;
			$mdarray['status'] = $status;
			$mdarray['p'] = $p;
			$mdarray['order'] = $order;
			$md_id = md5(implode("-",$mdarray));
			$file = 'jiu_'.$md_id;
			if(false === $items = S($file)){

				$items_list = $this->_mod->where($map)->order($order)->limit($start . ',' . $page_size)->select();
				$items = array();
				$seller_arr = array();
				$sellers = '';
				foreach($items_list as $key=>$val){
					$items['item_list'][$key]			= $val;
					$items['item_list'][$key]['class']	= $this->_mod->status($val['status'],$val['coupon_start_time'],$val['coupon_end_time']);
					$items['item_list'][$key]['zk']		= round(($val['coupon_price']/$val['price'])*10, 1); 
					if(!$val['click_url']){
						$items['item_list'][$key]['click_url']	=U('jump/index',array('id'=>$val['id']));
					}
					if($val['coupon_start_time']>time()){
						$items['item_list'][$key]['click_url']	=U('item/index',array('id'=>$val['id']));
						$items['item_list'][$key]['timeleft'] = $val['coupon_start_time']-time();
					}else{
						$items['item_list'][$key]['timeleft'] = $val['coupon_end_time']-time();
					}
					$items['item_list'][$key]['cate_name']		=$cate_list['p'][$val['cate_id']]['name'];
					$url = C('ftx_site_url').U('item/index',array('id'=>$val['id']));
					$items['item_list'][$key]['url'] = urlencode($url);
					$items['item_list'][$key]['urltitle'] = urlencode($val['title']);
					$items['item_list'][$key]['price'] = number_format($val['price'],1);
					$items['item_list'][$key]['coupon_price'] = number_format($val['coupon_price'],1);
					if($val['sellerId']){
						$items['seller_arr'][] = $val['sellerId'];
					}
				}
				S($file,$items);
			}
		}else{
 
			$items_list = $this->_mod->where($map)->order($order)->limit($start . ',' . $page_size)->select();
			$items = array();
			$seller_arr = array();
			$sellers = '';
			foreach($items_list as $key=>$val){
				$items['item_list'][$key]			= $val;
				$items['item_list'][$key]['class']	= $this->_mod->status($val['status'],$val['coupon_start_time'],$val['coupon_end_time']);
				$items['item_list'][$key]['zk']		= round(($val['coupon_price']/$val['price'])*10, 1); 
				if(!$val['click_url']){
					$items['item_list'][$key]['click_url']	=U('jump/index',array('id'=>$val['id']));
				}
				if($val['coupon_start_time']>time()){
					$items['item_list'][$key]['click_url']	=U('item/index',array('id'=>$val['id']));
					$items['item_list'][$key]['timeleft'] = $val['coupon_start_time']-time();
				}else{
					$items['item_list'][$key]['timeleft'] = $val['coupon_end_time']-time();
				}
				$items['item_list'][$key]['cate_name']		=$cate_list['p'][$val['cate_id']]['name'];
				$url = C('ftx_site_url').U('item/index',array('id'=>$val['id']));
				$items['item_list'][$key]['url'] = urlencode($url);
				$items['item_list'][$key]['urltitle'] = urlencode($val['title']);
				$items['item_list'][$key]['price'] = number_format($val['price'],1);
				$items['item_list'][$key]['coupon_price'] = number_format($val['coupon_price'],1);
				if($val['sellerId']){
					$items['seller_arr'][] = $val['sellerId'];
				}
			}
		}

		$seller_arr = array_unique($items['seller_arr']);
		$sellers = implode(",",$seller_arr);
		$this->assign('sellers', $sellers);
		$this->assign('items_list', $items['item_list']);

		$this->assign('index_info',$index_info);

		if(C('ftx_site_cache')){
			$mdarray = $map;
			$mdarray['sort'] = $sort;
			$mdarray['tag'] = $tag;
			$mdarray['status'] = $status;
			$mdarray['p'] = $p;
			$mdarray['order'] = $order;
			$md_id = md5(implode("-",$mdarray));
			$file = 'jiu_count_'.$md_id;
			if(false === $count = S($file)){
				$count = $this->_mod->where($map)->count();
				S($file,$count);
			}
		}else{
			$count = $this->_mod->where($map)->count();
		}
 
		$pager = $this->_pager($count, $page_size);
		$this->assign('page', $pager->kshow());
		$this->assign('total_item',$count);


        $this->assign('nav_curr', 'jiu');
        $this->_config_seo(C('ftx_seo_config.cate'), array(
            'cate_name' => '【'.$cinfo['name'].'专区】 — ',
            'seo_title' => $cinfo['seo_title'],
			'seo_keywords' => $cinfo['seo_keys'],
			'seo_description' => $cinfo['seo_desc'],
        ));
		$this->display();
	}
}