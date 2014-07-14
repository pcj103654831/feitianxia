
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>正在为您跳转...</title>
<script type="text/javascript" src="/static/js/jquery/jquery.js"></script>
</head>
<body> 
<script language="javascript">
function get_et(){
  var s = new Date(),
  l = +s / 1000 | 0,
  r = s.getTimezoneOffset() * 60,
  p = l + r,
  m = p + (3600 * 8),
  q = m.toString().substr(2, 8).split(""),
  o = [6, 3, 7, 1, 5, 2, 0, 4],
  n = [];
  for (var k = 0; k < o.length; k++) {
	  n.push(q[o[k]])
  }
  n[2] = 9 - n[2];
  n[4] = 9 - n[4];
  n[5] = 9 - n[5];
  return n.join("")
}

function setCookie(j, k){
    document.cookie = j + "=" + encodeURIComponent(k.toString()) + "; path=/"
}

function getCookie(l){
	var m = (" " + document.cookie).split(";"),
	j = "";
	for (var k = 0; k < m.length; k++) {
		if (m[k].indexOf(" " + l + "=") === 0) {
			j = decodeURIComponent(m[k].split("=")[1].toString());
			break
		}
	}
	return j
}

function get_pgid(){
  var l = "",
  k = "",
  n,
  o,
  t,
  u,
  s = location,
  m = "",
  q = Math;
  function r(x, z) {
	  var y = "",
	  v = 1,
	  w;
	  v = Math.floor(x.length / z);
	  if (v == 1) {
		  y = x.substr(0, z)
	  } else {
		  for (w = 0; w < z; w++) {
			  y += x.substr(w * v, 1)
		  }
	  }
	  return y
  }
  
  n = (" " + document.cookie).split(";");
  for (o = 0; o < n.length; o++) {
	  if (n[o].indexOf(" cna=") === 0) {
		  k = n[o].substr(5, 24);
		  break
	  }
  }
  
  if (k === "") {
	  cu = (s.search.length > 9) ? s.search: ((s.pathname.length > 9) ? s.pathname: s.href).substr(1);
	  n = document.cookie.split(";");
	  for (o = 0; o < n.length; o++) {
		  if (n[o].split("=").length > 1) {
			  m += n[o].split("=")[1]
		  }
	  }
	  if (m.length < 16) {
		  m += "abcdef0123456789"
	  }
	  k = r(cu, 8) + r(m, 16)
  }
  for (o = 1; o <= 32; o++) {
	  t = q.floor(q.random() * 16);
	  if (k && o <= k.length) {
		  u = k.charCodeAt(o - 1);
		  t = (t + u) % 16
	  }
	  l += t.toString(16)
  }
  setCookie('amvid', l);
  var p = getCookie('amvid');
  if (p) {
	  return p
  }
  return l
}
var ajax_click = "/index.php?m=ajax&a=click_url";	
var iid = '{$item.num_iid}';
var click_url = 'http://g.click.taobao.com/q?pid={$pid}&ct=url%3Dhttp%253A%252F%252Fitem.taobao.com%252Fitem.htm%253Fid%253D{$item["num_iid"]}';
var forwardUrl = "{:C('ftx_site_url')}/index.php?m=jump&a=index&iid={$item['num_iid']}&date="+new Date();
var itemUrl = "http://detail.tmall.com/item.htm?id={$item['num_iid']}";
var pid = '{$pid}';
var wt = '0';
var ti = '625';
var tl = '230x45';
var rd = '1';
var ct = encodeURIComponent('itemid={$item["num_iid"]}');
var st = '2';
var rf = encodeURIComponent(document.URL);
var et = get_et();
var pgid = get_pgid();
var v = '2.0';
$(function(){
	$.ajax({
 		url: 'http://g.click.taobao.com/display?cb=?',
    		type: 'GET',    
     		dataType: 'jsonp',
    		jsonp: 'cb', 
    		data: 'pid='+pid+'&wt='+wt+'&ti='+ti+'&tl='+tl+'&rd='+rd+'&ct='+ct+'&st='+st+'&rf='+rf+'&et='+et+'&pgid='+pgid+'&v='+v,
    		success: function(msg) {
			if(msg.code == 200){
				click_url=msg.data.items[0].ds_item_click;
				redirect(click_url);
			}else if(msg.code == 201){
				//alert(201);
				click_url=msg.data.items[0].ds_item_click;
				redirect(click_url);
			}else{
				//alert(msg.error_msg);
				location.href = click_url;
			}
		},    
		error: function(msg){   
			//alert(msg.error_msg);
        		location.href = click_url;
		}    
	});  
});
function redirect(click_url){
	var version = navigator.userAgent;
	click_urls = click_url.replace(/&/g,"[]");
	$.ajax({
		type: 'get',
		url: ajax_click,
		data: {iid:iid,click_url:click_urls},
		dataType:'json',
		async:false,//同步
		success:function(result){
			if(result.status == 1){	
				window.location.href=forwardUrl;
			}else if(result.status == 2){	
				window.location.href=click_url;
			}else{
		            	window.location.href=click_url;	
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			window.location.href=click_url; 
		}
	});	
}
</script>
</body>
</html>
