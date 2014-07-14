<?php

/**
 * 插件
 * Class pluginAction
 */
class pluginAction extends BackendAction {
	private $_db;
	private $_error;
	public function _initialize() {
		$this->_db = M("plugin");
	}

	public function _empty($plugin){
		$action = I('action');
		require "plugin/".$plugin."/Action/index.php";
		if($action){
			$tpl = "plugin/".$plugin."/Tpl/".$action.".tpl";
			$content = $this->fetch($tpl);
			if(IS_AJAX){
				$this->ajaxReturn(1, '', $content);
			}
			
			$this->display('','','',$content);
		}else{
			$tpl = "plugin/".$plugin."/Tpl/index.tpl";
			$content = $this->fetch($tpl);
			$this->display('','','',$content);
		}
	}

	/**
	 * 插件列表
	 */
	public function plugin_list() {
		$Model = M("plugin");
		$dir = ftxia_dir::tree('plugin');
		$plugin = array();
		if (!empty($dir)) {
			foreach ($dir as $d) {
				//插件应用名
				$app = $d['name'];
				$conf =
				require "plugin/$app/Config/config.php";
				$conf['app'] = $app;
				//转为小写，方便视图调用
				$conf = array_change_key_case_d($conf);
				$plugin[$d['name']] = $conf;
				$plugin[$d['name']]['dirname'] = $app;
				//是否安装
				$installed = $Model -> where("app='$app'") -> find();
				$plugin[$d['name']]['installed'] = $installed ? 1 : 0;
			}
		}
		$this -> assign("plugin", $plugin);
		$this -> display();
	}

	/**
	 * 验证插件
	 */
	private function check_plugin($plugin) {
		$pluginDir = 'plugin/' . $plugin . '/';
		//安装sql检测
		if (!is_file($pluginDir . 'Data/install.sql')) {
			$this->_error = '安装sql文件install.sql不存在';
			return false;
		}
		//删除sql
		if (!is_file($pluginDir . 'Data/uninstall.sql')) {
			$this->_error= '删除Sql文件uninstall.sql不存在';
			return false;
		}
		//删除sql
		if (!is_file($pluginDir . 'Data/help.php')) {
			$this->_error= '插件帮助文件help.php不存在';
			return false;
		}
		//检测配置文件
		if (!is_file($pluginDir . 'Config/config.php')) {
			$this->_error= '配置文件config.php不存在';
			return false;
		}
		return true;
	}

	//安装插件
	public function install() {
		$plugin = I('plugin');
		if (!$this->check_plugin($plugin)) {
			$this->ajaxReturn(0,$this -> _error);
		}

		if (!$plugin) {
			$this->ajaxReturn(0,'参数错误');
			exit ;
		}
		if (IS_POST) {
			//检测插件是否已经存在
			if ($this->_db-> where(array('app' => $plugin)) -> find()) {
				$this->error = '插件已经存在，请删除后再安装';
			}
			//创建数据表
			$installSql = "plugin/{$plugin}/Data/install.sql";
			if (is_file($installSql)) {
				$queries = file_get_contents($installSql);
				$queries = trim( stripslashes( $queries ) );
				$sqls = explode( ";", $queries );

				if (!empty($sqls) && is_array($sqls)) {
					$rs = M();
					$length = count( $sqls );
					if(1 <$length){
						foreach($sqls as $i => $sql){
							$sql = trim($sql);
							if (!empty($sql)){
								$mes = M()->execute($sql);
							}
							if (FALSE === $mes){
								$this->success( "SQL语句执行失败!<br>" );
							}
						}
					}else{
						$rs->query( $sql );
					}
					$lastsql = $rs->getLastSql();
					//$this->ajaxReturn(1, "SQL语句成功运行!" );
				}else{
					$this->ajaxReturn(0,'安装SQL文件错误');
				}


			}
			$data =
			require 'plugin/' . $plugin . '/Config/config.php';
			$data = array_change_key_case_d($data);
			$data['app'] = $plugin;
			$data['install_time'] = date("Y-m-d");
			//添加菜单
			if ($this -> _db -> add($data)) {
				$data = array(
					'name' => $data['name'],
					'module_name' => 'plugin',
					'action_name' => $plugin,
					'pid' => 333,
				);
				M('menu') -> add($data);
				//$NodeModel = D('Node');
				//$NodeModel -> updateCache();
				$this->ajaxReturn(1,'插件安装成功');
			} else {
				$this->ajaxReturn(0,'插件安装失败');
			}
		} else {
			//分配配置项
			$field = array_change_key_case_d(
			require 'plugin/'.$plugin.'/Config/config.php');
			$field['plugin'] = $plugin;
			$this -> field = $field;
			$this -> display();
		}
	}

	//卸载插件
	public function uninstall() {
		$plugin = I('plugin');
		if (!$plugin) {
			$this->ajaxReturn(0,'参数错误');
			exit;
		}
		if (IS_POST) {
			$uninstallSql = "plugin/{$plugin}/Data/uninstall.sql";
			if (is_file($uninstallSql)) {
				$queries = file_get_contents($uninstallSql);
				$queries = trim( stripslashes( $queries ) );
				$sqls = explode( ";", $queries );
				if (!empty($sqls) && is_array($sqls)) {
					$rs = M();
					$length = count( $sqls );
					if(1 <$length){
						foreach($sqls as $i => $sql){
							$sql = trim($sql);
							if (!empty($sql)){
								$mes = M()->execute($sql);
							}
							if (FALSE === $mes){
								$this->success( "SQL语句执行失败!" );
							}
						}
					}else{
						$rs->query( $sql );
					}
					$lastsql = $rs->getLastSql();
				}else{
					$this->ajaxReturn(0,'卸载SQL文件错误');
				}
			}
			//删除Plugin表信息
			$this ->_db->where("app='$plugin'")->delete();
			//删除插件菜单信息
			M('menu')->where(array('module_name' =>'Plugin', 'action_name' => $plugin)) -> delete();
			//删除文件
			if (I('del_dir')) {
				if (!ftxia_dir::del('plugin/' . $plugin)) {
					$this->ajaxReturn(0,'插件目录删除失败');
				}
			}
			$this -> ajaxReturn(1,'插件卸载成功');
		} else {
			//分配配置项
			$field = array_change_key_case_d(
			require 'plugin/' . $plugin . '/Config/config.php');
			$field['plugin'] = $plugin;
			$this -> assign("field", $field);
			$this -> display();
		}
	}

	//使用帮助
	public function help() {
		$plugin = I('plugin');
		$help_file = "plugin/" . $plugin . '/Data/help.php';
		if (is_file($help_file)) {
			$this -> help = file_get_contents($help_file);
			$this -> display();
		}
	}



	public function add() {
        $action = $this->_get('action');
        $mod = M($action);
        if (IS_POST) {
            if (false === $data = $mod->create()) {
                IS_AJAX && $this->ajaxReturn(5, $mod->getError());
                $this->error($mod->getError());
            }
            if( $mod->add($data) ){
                IS_AJAX && $this->ajaxReturn(1, L('operation_success'), '', 'add');
                $this->success(L('operation_success'));
            } else {
				p($data);
                IS_AJAX && $this->ajaxReturn(9, L('operation_failure'));
                $this->error(L('operation_failure'));
            }
        } else {
            $this->assign('open_validator', true);
            if (IS_AJAX) {
                $response = $this->fetch();
                $this->ajaxReturn(1, '', $response);
            } else {
                $this->display();
            }
        }
    }

	public function ajax_check_name(){
		$action = I('action');
		$mod = D($action);
        $name = I('name');
        $id = I('clientid');
        if ($mod->where(array($id=>$name))->find()) {
            $this->ajaxReturn(0, '已经存在');
        } else {
            $this->ajaxReturn();
        }
    }

    /**
     * 修改
     */
    public function edit()
    {
        $action = $this->_get('action');
        $mod = D($action);
        $pk = $mod->getPk();
        if (IS_POST) {
            if (false === $data = $mod->create()) {
                IS_AJAX && $this->ajaxReturn(0, $mod->getError());
                $this->error($mod->getError());
            }
            if (method_exists($this, '_before_update')) {
                $data = $this->_before_update($data);
            }
            if (false !== $mod->save($data)) {
                if( method_exists($this, '_after_update')){
                    $id = $data['id'];
                    $this->_after_update($id);
                }
                IS_AJAX && $this->ajaxReturn(1, L('operation_success'), '', 'edit');
                $this->success(L('operation_success'));
            } else {
                IS_AJAX && $this->ajaxReturn(0, L('operation_failure'));
                $this->error(L('operation_failure'));
            }
        } else {
            $id = $this->_get($pk, 'intval');
            $info = $mod->find($id);
            $this->assign('info', $info);
            $this->assign('open_validator', true);
            if (IS_AJAX) {
				$tpl = "plugin/".$action."/Tpl/edit.tpl";
				$content = $this->fetch($tpl);
				if(IS_AJAX){
					$this->ajaxReturn(1, '', $content);
				}
				
				$this->display('','','',$content);
 
            } else {
                $this->display();
            }
        }
    }

    /**
     * ajax修改单个字段值
     */
    public function ajax_edit()
    {
        //AJAX修改数据
        $action = I('action');
        $mod = D($action);
        $pk = $mod->getPk();
        $id = $this->_get($pk, 'intval');
        $field = $this->_get('field', 'trim');
        $val = $this->_get('val', 'trim');
        //允许异步修改的字段列表  放模型里面去 TODO
        $mod->where(array($pk=>$id))->setField($field, $val);
        $this->ajaxReturn(1);
    }

    /**
     * 删除
     */
    public function delete()
    {
        $action = I('action');
        $mod = D($action);
        $pk = $mod->getPk();
        $ids = trim($this->_request($pk), ',');
        if ($ids) {
            if (false !== $mod->delete($ids)) {
                IS_AJAX && $this->ajaxReturn(1, L('operation_success'));
                $this->success(L('operation_success'));
            } else {
                IS_AJAX && $this->ajaxReturn(0, L('operation_failure'));
                $this->error(L('operation_failure'));
            }
        } else {
            IS_AJAX && $this->ajaxReturn(0, L('illegal_parameters'));
            $this->error(L('illegal_parameters'));
        }
    }



}
