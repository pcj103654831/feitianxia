<?php
/**
 * TOP API: ftxia.upgrade.get request
 * @author Ftxia 8mob.COM
 */
class FtxiaUpgradeGetRequest
{

	private $release;

	private $time;	

	private $apiParas = array();
	
	public function setRelease($release)
	{
		$this->release = $release;
		$this->apiParas["release"] = $release;
	}
	

	public function getRelease()
	{
		return $this->release;
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
		return "ftxia.upgrade.get";
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