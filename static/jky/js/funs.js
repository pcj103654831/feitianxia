// JavaScript Document
function fenduan(val,level,arr){
	if(typeof arguments[3]!='undefined'){
		var bili=arguments[3];
	}
	else{
		var bili=1;
	}
	var re=0;
    for(var k in arr){
    	k=parseInt(k);
        if(level>=k){
        	re=val*arr[k+'a'];
            break;
		}
    }
    if(re==0){
    	re=val*arr[k+'a'];
    }
	re*=bili;
    return dataType(re,DATA_TYPE);
}

function dataType(num,type){  //本来直接用toFixed函数就可以，但是火狐浏览器不行
	if(type==1){
		num=parseInt(num);
	}
	else if(type==2){
		num=num*100;
  		num=num.toFixed(0);
  		num=Math.round(num)/100;
	}
	return num;
}

//小发泄：谷歌（火狐）不支持数组的for in 的形式，只支持对象。如果索引是数字，还会强制从最小的数字开始算第一个，不管你当初是怎么设置的，在IE中这些都不会存在。
//IE显示的js错误随便比较简单，但是很方便，谷歌虽然有控制台，但还是麻烦。毕竟很多人只是需要看一些定义方面的错误提示。
//在IE中，看一个A标签的链接，右键一下很简单，谷歌就费老劲了，由于网速慢图片没显示，IE可以手动二次加载，谷歌就没有。
//一个页面如果是post产生的，谷歌就不能查看其源码了（完全不懂为什么这个都做不到），IE好好的。
//还有好多就不说了，支持IE，虽然你们的第六代儿子给我造成了很多麻烦，虽然你们的第12胎都不一定完全支持css3，但相信你们会越做越好。

function setPic(pic,width,height,alt,classname,onerrorPic){
	pic =  decode64(pic);
	writestr = "<img src='"+pic+"' ";
	if(width!=0){
		writestr+=" width="+width;
	}
	if(height!=0){
		writestr+=" height="+height;
	}
	writestr = writestr+" alt='"+alt+"' onerror='this.src=\""+onerrorPic+"\"' class='"+classname+"' />";
	document.write(writestr);
}

function selAll(obj){
    $(obj).attr("checked",'true');//全选
}
function selNone(obj){
    $(obj).removeAttr("checked");//取消全选
}
function selfan(obj){
    $(obj).each(function(){
		if($(this).attr("checked")){
			$(this).removeAttr("checked");
		}
		else{
		    $(this).attr("checked",'true');
		}
	})
}

function parse_str(url){
    if(url.indexOf('?')>-1){
        u=url.split("?");
		var param1 = u[1];
    }else{
        var param1 = url;
    }
	var s = param1.split("&");
    var param2 = {};
    for(var i=0;i<s.length;i++){
       var d=s[i].split("=");
       eval("param2."+d[0]+" = '"+d[1]+"';");
    }
	return param2;
}

/*var arr = [];  
for(i in param2){  
   arr.push( i + "=" + param2[i]); //根据需要这里可以考虑escape之类的操作  
}  
alert(arr.join("&")) */ 

function postForm(action,input){
	var postForm = document.createElement("form");//表单对象
    postForm.method="post" ;
    postForm.action = action ;
	var k;
    for(k in input){
		if(input[k]!=''){
			var htmlInput = document.createElement("input");
			htmlInput.setAttribute("name", k) ;
            htmlInput.setAttribute("value", input[k]);
            postForm.appendChild(htmlInput) ;
		}
	}
	document.body.appendChild(postForm) ;
	//alert(document.body.innerHTML)
    postForm.submit() ;
    document.body.removeChild(postForm) ;
}

function u(mod,act,arr,wjt){
	if(!arguments[2]){
	    var arr = new Array();
	}
	if(!arguments[3]){
	    wjt=0;
	}
	var mod_act_url='';
	if(act=='' && mod=='index'){
	    mod_act_url='?';
	}
	else if(act==''){
	    mod_act_url="index.php?m="+mod+"&a=index";
	}
	else{
		if(wjt==1){
			var str='';
			for(k in arr){
			    str+='-'+arr[k];
			}
		    mod_act_url=mod+'/'+act+str+'.html';
		}
		else{
		    mod_act_url="index.php?m="+mod+"&a="+act+arr2param(arr);
		}
	}
    return mod_act_url;
}

function arr2param(arr){
	var param='';
	var k;
    for(k in arr){
		if(arr[k]!=''){
		    param+='&'+k+'='+arr[k];
		}
	}
	return param;
}


function getClientHeight()
{
  var clientHeight=0;
  if(document.body.clientHeight&&document.documentElement.clientHeight)
  {
  var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;   
  }
  else
  {
  var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;   
  }
  return clientHeight;
}


function like(id,htmlId){
	var $t=$("#"+htmlId);
	var user_hart=parseInt($t.text());
	$.ajax({
	    url: u('ajax','like'),
		data:{'id':id},
		dataType:'jsonp',
		jsonp:"callback",
		success: function(data){
			if(data.status==0){
			    alert(data.data);
			}
			else if(data.status==1){
			    $t.text(user_hart+1);
			}
		 }
	});
}


String.prototype.Trim = function() 
{ 
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 


//////右下角帮助
function miaovAddEvent(oEle, sEventName, fnHandler)
{
	if(oEle.attachEvent)
	{
		oEle.attachEvent('on'+sEventName, fnHandler);
	}
	else
	{
		oEle.addEventListener(sEventName, fnHandler, false);
	}
}
function helpWindows(word,title)
{
	$('#miaov_float_layer').remove();
	$("body").append('<div class="float_layer" id="miaov_float_layer"><h2><strong>'+title+'</strong><a id="btn_min" href="javascript:;" class="min"></a><a id="btn_close" href="javascript:;" class="close"></a></h2><div class="content"><div class="wrap">'+word+'</address></div></div></div>');
	var oDiv=document.getElementById('miaov_float_layer');
	var oBtnMin=document.getElementById('btn_min');
	var oBtnClose=document.getElementById('btn_close');
	var oDivContent=oDiv.getElementsByTagName('div')[0];
	
	var iMaxHeight=0;
	
	var isIE6=window.navigator.userAgent.match(/MSIE 6/ig) && !window.navigator.userAgent.match(/MSIE 7|8/ig);
	
	oDiv.style.display='block';
	iMaxHeight=oDivContent.offsetHeight;
	
	if(isIE6)
	{
		oDiv.style.position='absolute';
		repositionAbsolute();
		miaovAddEvent(window, 'scroll', repositionAbsolute);
		miaovAddEvent(window, 'resize', repositionAbsolute);
	}
	else
	{
		oDiv.style.position='fixed';
		repositionFixed();
		miaovAddEvent(window, 'resize', repositionFixed);
	}
	
	oBtnMin.timer=null;
	oBtnMin.isMax=true;
	oBtnMin.onclick=function ()
	{
		startMove
		(
			oDivContent, (this.isMax=!this.isMax)?iMaxHeight:0,
			function ()
			{
				oBtnMin.className=oBtnMin.className=='min'?'max':'min';
			}
		);
	};
	
	oBtnClose.onclick=function ()
	{
		oDiv.style.display='none';
	};
};

function startMove(obj, iTarget, fnCallBackEnd)
{
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	obj.timer=setInterval
	(
		function ()
		{
			doMove(obj, iTarget, fnCallBackEnd);
		},30
	);
}

function doMove(obj, iTarget, fnCallBackEnd)
{
	var iSpeed=(iTarget-obj.offsetHeight)/8;
	
	if(obj.offsetHeight==iTarget)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		if(fnCallBackEnd)
		{
			fnCallBackEnd();
		}
	}
	else
	{
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		obj.style.height=obj.offsetHeight+iSpeed+'px';
		
		((window.navigator.userAgent.match(/MSIE 6/ig) && window.navigator.userAgent.match(/MSIE 6/ig).length==2)?repositionAbsolute:repositionFixed)()
	}
}

function repositionAbsolute()
{
	var oDiv=document.getElementById('miaov_float_layer');
	var left=document.body.scrollLeft||document.documentElement.scrollLeft;
	var top=document.body.scrollTop||document.documentElement.scrollTop;
	var width=document.documentElement.clientWidth;
	var height=document.documentElement.clientHeight;
	
	oDiv.style.left=left+width-oDiv.offsetWidth+'px';
	oDiv.style.top=top+height-oDiv.offsetHeight+'px';
}

function repositionFixed()
{
	var oDiv=document.getElementById('miaov_float_layer');
	var width=document.documentElement.clientWidth;
	var height=document.documentElement.clientHeight;
	
	oDiv.style.left=width-oDiv.offsetWidth+'px';
	oDiv.style.top=height-oDiv.offsetHeight+'px';
}

//操作cookie

function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
//取得cookie
function getCookie(name){
    var str=document.cookie.split(";")
    for(var i=0;i<str.length;i++){
        var str2=str[i].split("=");
		str2[0]=str2[0].Trim();
        if(str2[0]==name){
		    return unescape(str2[1]);
	    }
    }
}
//删除cookie
function delCookie(name){
 var date=new Date();
 date.setTime(date.getTime()-10000);
 document.cookie=name+"=n;expire="+date.toGMTString();
}

//图片自适应大小
function imgAuto(img, maxW, maxH) {
	var oriImg = document.createElement("img");
	oriImg.onload = function(){oriImg.height
		if (oriImg.width == 0 || oriImg.height == 0)
			return;
		var oriW$H = oriImg.width / oriImg.height;
		//var maxW$H = maxW / maxH;

		if (oriImg.height > maxH) {
			img.style.height = maxH;
			// img.removeAttribute("width");
			img.style.width = maxH * oriW$H;
		}
		if (img.width > maxW) {
			img.style.width = maxW;
			// img.removeAttribute("height");
			img.style.height = maxW / oriW$H;
		}

		if (maxH) {// if it defined the maxH argument
			if (img.height > 0)
				img.style.marginTop = (maxH - img.height) / 2 + "px";
		}
	};
	oriImg.src = img.src;
	img.style.display="block";
}


function ajaxPost(url,query){
	var type='json';
	var test=arguments[2];
	if(test==1){
		type='html';
	}
	$.ajax({
	    url: url,
		type: "POST",
		data:query,
		dataType:type,
		success: function(data){
			if(test ==1){
			    alert(data);
			}
			
		    if(data.status==0){
			    alert(data.data);
			}
			else if(data.status==1){
			    alert('保存成功');
				location.replace(location.href);
			}
		}
	});
}

function ajaxPostForm(form){
	var query=$(form).serialize();
	var url=$(form).attr('action');
	var type='json';
	var word=arguments[2];
	var goto=arguments[1];
	if(typeof word=='undefined') word='';
	if(typeof goto=='undefined') goto='';
	$.ajax({
	    url: url,
		type: "POST",
		data:query,
		dataType:'json',
		success: function(data){//alert(data);
		    if(data.status==0){
			    alert(data.data);
			}
			else if(data.s==1){
				if(word!=''){
				    alert(word);
				}
				if(goto !=''){
	                window.location.href=goto;
					return false;
	            }
				
				if(typeof data.g=='undefined' || data.g=='' || data.g==0){
				    location.replace(location.href);
				}
				else{
				    window.location.href=data.g;
				}
			}
		},
		error: function(XMLHttpRequest,textStatus, errorThrown){
			alert(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus);
        }
	});
}

function IsUrl(str_url){
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re=new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)){
        return 1;
    }else{
        return 0;
    }
}

function isPic(a){
  	if(!a.match(/\.jpg|png|gif$/,a)){
  		return 0;
  	}
  	else{
		if(a.indexOf('taobaocdn.com')>0){
			return 2;
		}
		else{
			return 1;
		}
  	}
}

function checkForm(t){
    var subm=1;
	$(t).find('.required').each(function(){
		var word=$(this).attr('word');
		var num=$(this).attr('num');
		var url=$(this).attr('url');
		var pic=$(this).attr('pic');
		var val=$(this).val();
		if(typeof word=='undefined'){word='';}
		if(val=='' || val==word){
			$(this).focus().addClass('red_border');
			if(word!=''){
			    alert(word);
			}
		    else{
			    alert('此字段必填');
			}
			subm=0;
			return false;
		}
		if(num=='y' && isNaN(val)){
			$(this).focus().addClass('red_border');
			alert('这不是一个数字');
			subm=0;
			return false;
		}
		if(url=='y' && IsUrl(val)==0){
			$(this).focus().addClass('red_border');
			alert('这不是一个网址（http://开头）');
			subm=0;
			return false;
		}
		if(pic=='y'){
			var a=isPic(val);
			if(a==2){
				val=val.replace(/_\d+x\d+\.jpg/,'');
				val=val.replace(/_b\.jpg/,'');
				$(this).val(val);
			}
			else if(a==0){
				$(this).focus().addClass('red_border');
				alert('这不是一个图片');
				subm=0;
				return false;
			}
		}
    }).blur(function(){
	    if($(this).val()!=''){
		    $(this).removeClass('red_border');
		}
	}); 
	if(subm==0){
		return false;
	}
	else{
	    return true;
	}
}

function http_pic(pic){
    if(pic.indexOf("http://")>=0){
	    return pic;
	}
	else{
	    return '../'+pic;
	}
}

function inArray(val,array){
	for(var i in array){
	    if(array[i]!='' && val.indexOf(array[i])>=0){
		    return val;
		}
	}
	return '';
}

function backToTop(){
    var $backToTopTxt = "返回顶部";
	var $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body")).text($backToTopTxt).attr("title", $backToTopTxt).click(function() {$("html, body").animate({ scrollTop: 0 }, 120);});
	var $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $backToTopEle.show(): $backToTopEle.hide();
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
        }
    };
    $(window).bind("scroll", $backToTopFun);
    $backToTopFun();
}

function domStop(id) {  //id外围需要一个position:relative的元素定位，id最好不要有css，只起到单纯的定位作用
	var IO = document.getElementById(id),Y = IO,H = 0,IE6;
	IE6 = window.ActiveXObject && !window.XMLHttpRequest;
	while (Y) {
		H += Y.offsetTop;
		Y = Y.offsetParent
	};
	if (IE6) {
		IO.style.cssText = "position:absolute;top:expression(this.fix?(document" + ".documentElement.scrollTop-(this.javascript||" + H + ")):0)";
	} else {
		IO.style.cssText = "top:0px";
	}

	window.onscroll = function() {
		var d = document,
		s = Math.max(d.documentElement.scrollTop, document.body.scrollTop);
		if (s > H && IO.fix || s <= H && !IO.fix) return;
		if (!IE6) IO.style.position = IO.fix ? "": "fixed";
		IO.fix = !IO.fix;
	};
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch(e) {};
}

function regEmail(email){
    var reg = /^[-_A-Za-z0-9\.]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    if(reg.test(email)){
	    return true;
	}else{    
        return false;    
    } 
}

function regMobile(str){    
    if(/^1\d{10}$/g.test(str)){      
        return true;    
    }else{    
        return false;    
    }    
} 

function regAlipay(str){
    if(regMobile(str) || regEmail(str)){
	    return true;
	}else{    
        return false;    
    }
}

function regQQ(qq){
    if((!isNaN(str) && str.length.length>4 && str.length.length<15) || regEmail(str)){
	    return true;
	}else{    
        return false;    
    }
}

function fixDiv(div_id,offsetTop){
	var offset=arguments[1]?arguments[1]:0;
    var Obj=$(div_id);
	var w=Obj.width();
    var ObjTop=Obj.offset().top;
    var isIE6=$.browser.msie && $.browser.version == '6.0';
	
    if(isIE6){
        $(window).scroll(function(){
			if($(window).scrollTop()<=ObjTop){
                    Obj.css({
                        'position':'relative',
                        'top':0
                    });
            }else{
                Obj.css({
                    'position':'absolute',
                    'top':$(window).scrollTop()+offsetTop+'px',
                    'z-index':1
                });
            }
        });
    }else{
        $(window).scroll(function(){
            if($(window).scrollTop()<=ObjTop){
                Obj.css({
                    'position':'relative',
					'top':0
                });
            }else{
                Obj.css({
                    'position':'fixed',
                    'top':0+offsetTop+'px',
					'z-index':1,
					'width':w+'px',
					'overflow':'hidden'
                });
            }
        });
    }
}

function debugObjectInfo(obj) {
    traceObject(obj);

    function traceObject(obj) {
        var str = '';
        if (obj.tagName && obj.name && obj.id) str = "<table border='1' width='100%'><tr><td colspan='2' bgcolor='#ffff99'>traceObject 　　tag: &lt;" + obj.tagName + "&gt;　　 name = \"" + obj.name + "\" 　　id = \"" + obj.id + "\" </td></tr>";
        else {
            str = "<table border='1' width='100%'>";
        }
        var key = [];
        for (var i in obj) {
            key.push(i);
        }
        key.sort();
        for (var i = 0; i < key.length; i++) {
            var v = new String(obj[key[i]]).replace(/</g, "&lt;").replace(/>/g, "&gt;");
            str += "<tr><td valign='top'>" + key[i] + "</td><td>" + v + "</td></tr>";
        }
        str = str + "</table>";
        writeMsg(str);
    }
    function trace(v) {
        var str = "<table border='1' width='100%'><tr><td bgcolor='#ffff99'>";
        str += String(v).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        str += "</td></tr></table>";
        writeMsg(str);
    }
    function writeMsg(s) {
        traceWin = window.open("", "traceWindow", "height=600, width=800,scrollbars=yes");
        traceWin.document.write(s);
    }
}

function call_user_func(func){ //模拟php的call_user_func，缺点参数不能是对象，有待改进
	var l = arguments.length;
	var s='';
	var x='';

	for(var i=0;i<l;i++){
		if(isNaN(arguments[i])==false){
			x=arguments[i];
		}
		else{
			x='"'+arguments[i]+'"';
		}
		if(i==1){
			s=s+x;
		}
		else if(i>1){
			s=s+','+x;
		}
	}
	eval(func+'('+s+')');
}

/*function call_user_func (cb) {  //参数可以是数组，但是被调用的含糊不能含有jquery方法
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Diplom@t (http://difane.com/)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: call_user_func('isNaN', 'a');
  // *     returns 1: true
  var func;

  if (typeof cb === 'string') {
    func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
  }
  else if (Object.prototype.toString.call(cb) === '[object Array]') {
    func = (typeof cb[0] == 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
  }
  else if (typeof cb === 'function') {
    func = cb;
  }

  if (typeof func != 'function') {
    throw new Error(func + ' is not a valid function');
  }

  var parameters = Array.prototype.slice.call(arguments, 1);
  return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(null, parameters) : func.apply(cb[0], parameters);
}*/

function intval(v) 
{ 
    v = parseInt(v); 
    return isNaN(v) ? 0 : v; 
} 

// 获取元素信息 
function getPos(e) 
{ 
    var l = 0; 
    var t  = 0; 
    var w = intval(e.style.width); 
    var h = intval(e.style.height); 
    var wb = e.offsetWidth; 
    var hb = e.offsetHeight; 
    while (e.offsetParent){ 
        l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0); 
        t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0); 
        e = e.offsetParent; 
    } 
    l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0); 
    t  += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0); 
    return {x:l, y:t, w:w, h:h, wb:wb, hb:hb}; 
} 

// 获取滚动条信息 
function getScroll()  
{ 
    var t, l, w, h; 
     
    if (document.documentElement && document.documentElement.scrollTop) { 
        t = document.documentElement.scrollTop; 
        l = document.documentElement.scrollLeft; 
        w = document.documentElement.scrollWidth; 
        h = document.documentElement.scrollHeight; 
    } else if (document.body) { 
        t = document.body.scrollTop; 
        l = document.body.scrollLeft; 
        w = document.body.scrollWidth; 
        h = document.body.scrollHeight; 
    } 
    return { t: t, l: l, w: w, h: h }; 
} 

// 锚点(Anchor)间平滑跳转 
function scroller(el, duration,offset) 
{
    if(typeof el != 'object') { el = document.getElementById(el); } 

    if(!el) return; 

    var z = this; 
    z.el = el; 
    z.p = getPos(el);
	if(offset>0){
		z.p.y=z.p.y-offset;
	}
    z.s = getScroll(); 
    z.clear = function(){window.clearInterval(z.timer);z.timer=null}; 
    z.t=(new Date).getTime(); 

    z.step = function(){ 
        var t = (new Date).getTime(); 
        var p = (t - z.t) / duration; 
        if (t >= duration + z.t) { 
            z.clear(); 
            window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},13); 
        } else { 
            st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t; 
            sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l; 
            z.scroll(st, sl); 
        } 
    }; 
    z.scroll = function (t, l){window.scrollTo(l, t)}; 
    z.timer = window.setInterval(function(){z.step();},13); 
}

function randNum(n){
	var rnd="";
	for(var i=0;i<n;i++){
		rnd+=Math.floor(Math.random()*10);
	}
	return rnd;
}

function getMobileYzm(mobile,n){
	var rnd="";
	mobile=String(mobile);
	for(var i=0;i<n;i=i+2){
		var r=Math.floor(Math.random()*10);
		r=String(r);
		rnd+=r+String(mobile.charAt(r));
	}
	return rnd;
}

function iframe(url,width,height){
	document.write('<iframe id="testframe" scrolling="no" src="'+url+'" width="'+width+'" height="'+height+'" frameborder="0"></iframe>');
}

/*获取模板函数*/
function getTpl(_function){
	var tpl=_function.toString();
	tpl=tpl.replace(/function\s*\w+\s*\(\)\s*{\/\*/,'').replace(/\*\/;}$/,'');
	return tpl;
	//alert(tpl.match(/^[\w]+\snav_tpl\(\)\{\s+\/\*([\w\s*\/\\<>'"=#;:$.()]+)\*\/\s+\}$/i)[1]);
}

function getFuncName(_callee) {
	var ie = !-[1,];
	if(ie==true){
		var _text = _callee.toString();
		return _text.match(/^function\s*(\w+)\s*\(/)[1];
	}
	else{
		return _callee.prototype.constructor.name;
	}
}

/*循环对象模板*/
function getTplObj(tplName,obj){
	var tpl=getTpl(tplName);
	var _tpl='';
	var str='';
	
	if(typeof obj[0]=='undefined'){
		_tpl=tpl;
		for(var j in obj){
			var pattern = "\{\\$"+j+"\}";
			var reg = new RegExp(pattern, "g");
			_tpl=_tpl.replace(reg,obj[j]);
		}
		return _tpl;
	}
	else{
		for(i in obj){
			_tpl=tpl;
			for(var j in obj[i]){
				var pattern = "\{\\$"+j+"\}";
				var reg = new RegExp(pattern, "g");
				_tpl=_tpl.replace(reg,obj[i][j]);
			}
			str+=_tpl;
		}
		return str;
	}
}

$.fn.focusClear = function() {
	inputFocusTime=0;
	$(this).focus(function(){//alert(inputFocusTime);
		if(new Date().getTime()-inputFocusTime>100){$(this).val('');inputFocusTime=0;}
	});
	$(this)[0].onpaste=function(){
		inputFocusTime=new Date().getTime();
	}
}

if(typeof getCookie('userlogininfo')!='undefined'){
	IS_LOGIN=1;
}
else{
	IS_LOGIN=0;
}

if(!-[1,]==true){
	IE=1;
}
else{
	IE=0;
}

function tao_perfect_click($t){
	u=$t.attr('href').replace(/&rf=[\w-%\.]+&/,'&rf='+encodeURIComponent(SITEURL)+'&');
	setCookie('tao_click_url',u,30);
	var url=$t.attr('a_jump_click');
	if(URL_COOKIE==0){
		url+='&url='+encodeURIComponent(u);
	}
	$t.attr('href',url);
	return true;
}