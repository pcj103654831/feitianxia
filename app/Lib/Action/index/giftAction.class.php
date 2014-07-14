<?php

class giftAction extends FirstendAction {

    public function _initialize() {
        parent::_initialize();
		$info = $this->visitor->get();
        $this->assign('info', $info);
        $this->assign('nav_curr', 'gift');

		if (false === $cate_list = F('score_item_cate_list')) {
            $cate_list = D('score_item_cate')->cate_cache();
        }
		$this->assign('cate_list', $cate_list);
    }

    /**
     * 积分兑换首页
     */
    public function index() {
        $cid = I('cid','', 'intval');
		$this->lists();  
    }

	public function cate() {
        $cid = I('cid','', 'intval');
		$this->lists($cid);  
    }

	public function lists($cid){
		$sort = I('sort', 'hot', 'trim');
        switch ($sort) {
            case 'hot':
                $sort_order = 'ordid ASC ,buy_num DESC,id DESC';
                break;
            case 'new':
                $sort_order = 'ordid ASC ,id DESC';
                break;
        }

        $cname = D('score_item_cate')->get_name($cid);
        $where = array('status'=>'1');
        $cid && $where['cate_id'] = $cid;

        $score_item = M('score_item');
        $count = $score_item->where($where)->count('id');
        $pager = $this->_pager($count, 20);
        $item_list = $score_item->where($where)->order($sort_order)->limit($pager->firstRow.','.$pager->listRows)->select();
        $this->assign('item_list', $item_list);
        $this->assign('page_bar', $pager->fshow());
        $this->assign('cid', $cid);
        $this->assign('sort', $sort);
        $this->assign('cname', $cname);
        $this->_config_seo(C('ftx_seo_config.gift'), array(
            'cate_name' => $cname,
        ));
        $this->display('index');
	}

    /**
     * 积分商品详细页
     */
    public function detail() {
        $id = I('id','', 'intval');
        !$id && $this->_404();
        $item_mod = M('score_item');
        $item = $item_mod->field('id,title,img,score,stock,user_num,price,coupon_price,num_iid,start_time,end_time,buy_num,desc,info')->find($id);
        $this->assign('item', $item);
        $this->_config_seo(C('ftx_seo_config.gift_item'), array(
            'title' => $item['title'],
        ));
        $this->display();
    }

    /**
     * 兑换
     */
    public function ec() {
        !$this->visitor->is_login && $this->ajaxReturn(0, L('login_please'));
        $id = I('id','', 'intval');
        $num = I('num',1, 'intval');
        if (!$id || !$num) $this->ajaxReturn(0, L('invalid_item'));
        $item_mod = M('score_item');
        $user_mod = M('user');
        $order_mod = D('score_order');
        $uid = $this->visitor->info['id'];
        $uname = $this->visitor->info['username'];
        $item = $item_mod->find($id);
        !$item && $this->ajaxReturn(0, L('invalid_item'));
        !$item['stock'] && $this->ajaxReturn(0, L('no_stock'));
		//时间判断
		if($item['start_time'] > time()){
			$this->ajaxReturn(0, L('no_start'));
		}
		if($item['end_time'] < time()){
			$this->ajaxReturn(0, L('ending'));
		}
        //积分够不？
        $user_score = $user_mod->where(array('id'=>$uid))->getField('score');
        if($user_score < $item['score']){
			$this->ajaxReturn(0, L('no_score'));
		}
        //限额
        $eced_num = $order_mod->where(array('uid'=>$uid, 'item_id'=>$item['id']))->sum('item_num');
        if ($item['user_num'] && $eced_num + $num > $item['user_num']) {
            $this->ajaxReturn(0, sprintf(L('ec_user_maxnum'), $item['user_num']));
        }
        $this->assign('item', $item);
		$info = $this->visitor->get();
        $this->assign('info', $info);
        $resp = $this->fetch('dialog:gift_address');
        $this->ajaxReturn(2, '兑换 - '.$item['title'], $resp);

		/*
        $order_score = $num * $item['score'];
        $data = array(
            'uid' => $uid,
            'uname' => $uname,
            'item_id' => $item['id'],
            'item_name' => $item['title'],
            'item_num' => $num,
            'order_score' => $order_score,
        );
        if (false === $order_mod->create($data)) {
            $this->ajaxReturn(0, L('ec_failed'));
        }
        $order_id = $order_mod->add();
        //扣除用户积分并记录日志
        $user_mod->where(array('id'=>$uid))->setDec('score', $order_score);
        $score_log_mod = D('score_log');
        $score_log_mod->create(array(
            'uid' => $uid,
            'uname' => $uname,
            'action' => 'gift',
            'score' => $order_score*-1,
        ));
        $score_log_mod->add();

        //减少库存和增加兑换数量
        $item_mod->save(array(
            'id' => $item['id'],
            'stock' => $item['stock'] - $num,
            'buy_num' => $item['buy_num'] + $num,
        ));
        //返回

            //如果是实物则弹窗询问收货地址
            $address_list = M('user_address')->field('id,consignee,address,zip,mobile')->where(array('uid'=>$uid))->select();
            $this->assign('address_list', $address_list);
            $this->assign('order_id', $order_id);
            $resp = $this->fetch('dialog:address');
            $this->ajaxReturn(2, L('please_input_address'), $resp);

			*/

    }
	/**
	 * 代付链接
	 */
	public function daifu() {
		!$this->visitor->is_login && $this->ajaxReturn(0, L('login_please'));
		$id = I('id','', 'intval');
        $url = I('url','', 'trim');
		$item_mod = M('score_item');
        $user_mod = M('user');
        $order_mod = D('score_order');
        $uid = $this->visitor->info['id'];
        $uname = $this->visitor->info['username'];
		if (!$url) {
            $this->ajaxReturn(0, L('daifu_message'));
        }
		$item = $item_mod->find($id);
        !$item && $this->ajaxReturn(0, L('invalid_item'));

		$order_score =  $item['score'];
        $data = array(
            'uid' => $uid,
            'uname' => $uname,
            'item_id' => $item['id'],
            'item_name' => $item['title'],
			'item_num' => '1',
            'url' => $url,
            'order_score' => $order_score,
        );
        if (false === $order_mod->create($data)) {
            $this->ajaxReturn(0, L('ec_failed'));
        }
        $order_id = $order_mod->add();
        //扣除用户积分并记录日志
        $user_mod->where(array('id'=>$uid))->setDec('score', $order_score);
        $score_log_mod = D('score_log');
        $score_log_mod->create(array(
            'uid' => $uid,
            'uname' => $uname,
            'action' => 'gift',
            'score' => $order_score*-1,
        ));
        $score_log_mod->add();
        //减少库存和增加兑换数量
        $item_mod->save(array(
            'id' => $item['id'],
            'stock' => $item['stock'] - 1,
            'buy_num' => $item['buy_num'] + 1,
        ));
		$this->ajaxReturn(1, L('ec_success'));
	}

    /**
     * 收货地址
     */
    public function address() {
        !$this->visitor->is_login && $this->ajaxReturn(0, L('login_please'));
		$item_mod = M('score_item');
		$order_mod = M('score_order');
		$user_mod = M('user');


        $id			= I('id','', 'intval');
        $iid		= I('iid','', 'intval');
		$num		= I('num','','intval');
        $realname	= I('realname','', 'trim');
        $address	= I('address','', 'trim');
        $email		= I('email','','trim');
		$qq			= I('qq','', 'trim');
        $mobile		= I('mobile','', 'trim');
        if (!$address && (!$id || !$realname || !$address || !$mobile)) {
            $this->ajaxReturn(0, L('please_input_address_info'));
        }

		$uid = $this->visitor->info['id'];
        $uname = $this->visitor->info['username'];
        $item = $item_mod->find($id);
        !$item && $this->ajaxReturn(0, '商品不存在！');
        !$item['stock'] && $this->ajaxReturn(0, '商品已经被抢完了！');
        //积分够不？
        $user_score = $user_mod->where(array('id'=>$uid))->getField('score');
        $user_score < $item['score'] && $this->ajaxReturn(0, '积分不够了！');

		$eced_num = $order_mod->where(array('uid'=>$uid, 'item_id'=>$item['id']))->sum('item_num');
        if ($item['user_num'] && $eced_num + $num > $item['user_num']) {
            $this->ajaxReturn(0, '此商品每人限兑'.$item['user_num'].'件！');
        }
        $order_score = $num * $item['score'];

		$data = array(
            'uid' => $uid,
            'uname' => $uname,
            'item_id' => $item['id'],
            'item_name' => $item['title'],
			'item_num' => $num,
            'iid' => $iid,
			'realname' => $realname,
			'address' => $address,
			'email' => $email,
			'qq' => $qq,
			'mobile' => $mobile,
            'order_score' => $order_score,
			'add_time' => time(),
        );
        if (false === $order_mod->create($data)) {
            $this->ajaxReturn(0, L('ec_failed'));
        }
        $order_id = $order_mod->add();
        //扣除用户积分并记录日志
        $user_mod->where(array('id'=>$uid))->setDec('score', $order_score);
        $score_log_mod = D('score_log');
        $score_log_mod->create(array(
            'uid' => $uid,
            'uname' => $uname,
            'action' => 'gift',
            'score' => $order_score*-1,
        ));
        $score_log_mod->add();
        //减少库存和增加兑换数量
        $item_mod->save(array(
            'id' => $item['id'],
            'stock' => $item['stock'] - 1,
            'buy_num' => $item['buy_num'] + 1,
        ));

		$msg_mod = M('msg');
		$msg_mod->create(array(
			'fuid' => 0,
			'fname' => 'SYSTEM',
			'tuid' => $uid,
			'tname' => $uname,
			'info' => ' 您申请的积分兑换商品：'.$item['title'].' 、兑换数量：'.$num.'、消耗积分：'.$order_score.'。请等待系统审核，审核通过后会发货，谢谢!',
			'add_time' => time(),
		));
		$msg_mod->add();

        $this->ajaxReturn(1, '恭喜您，兑换成功！请等待发货');
    }

    /**
     * 积分规则
     */
    public function rule() {
        $info = M('article_page')->find(6);
        $this->assign('info', $info);
        $this->_config_seo();
        $this->display();
    }
}