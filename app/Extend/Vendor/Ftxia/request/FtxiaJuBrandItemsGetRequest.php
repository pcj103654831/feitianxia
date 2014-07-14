<?php
/**
 * TOP API: ftxia.ju.branditems.get request
 * @author Ftxia 8mob.COM
 */
class FtxiaJuBrandItemsGetRequest
{
	private $fields;
	
	private $sid;

	private $time;

	private $apiParas = array();
	
	public function setFields($fields)
	{
		$this->fields = $fields;
		$this->apiParas["fields"] = $fields;
	}
	

	public function getFields()
	{
		return $this->fields;
	}

	public function setSid($sid)
	{
		$this->sid = $sid;
		$this->apiParas["sid"] = $sid;
	}
	
	public function getSid()
	{
		return $this->sid;
	}

	public function setTime($time)
	{
		$this->time = $time;
		$this->apiParas["time"] = $time;
	}

	public function getTime()
	{
		return $this->time;
	}


	public function getApiMethodName()
	{
		return "ftxia.ju.branditems.get";
	}
	
	public function getApiParas()
	{
		return $this->apiParas;
	}
	
	public function check()
	{
		
	}
	
	public function putOtherTextParam($key, $value) {
		$this->apiParas[$key] = $value;
		$this->$key = $value;
	}

}