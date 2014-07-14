<?php
/**
 * TOP API: ftxia.uz.list.get request
 * @author Ftxia 8mob.COM
 */
class FtxiaUzListsGetRequest
{
	private $fields;
	

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
		return "ftxia.uz.list.get";
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