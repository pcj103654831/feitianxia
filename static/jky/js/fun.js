$(document).ready(function(){
	var word_top  = '在此输入您要找的宝贝！';
	var $word_top = $('.search_box .text');
	$word_top.focusClear();

	if(!$word_top.val()){
		$word_top.val(word_top);
	}
	$word_top.focus(function(){
		if( $(this).val()==word_top){
			$(this).val('');
		}
	}).blur(function(){
		if( !$(this).val()){
			$(this).val(word_top);
		}
	});
});

function search_submit(){
	var k = $(".search_box .text").val();
	if(k == '请输入您要找的宝贝！'){
		alert("请输入要搜索的内容！");
		return false;
	}
}

function search_zhekou(){
	var k = $(".search_box .text").val();
	if(k == '请输入您要找的宝贝！'){
		alert("请输入要搜索的内容！");
		return false;
	}
	else{
		window.location.href='/index.php?q='+k;
	}
}

function formatFloat(src, pos){
	return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}

/*收藏*/
function AddFavorite(b) {
	CloseNLRAF(true);
	var c = null;
	if (b == "childreTop") {
		var c = SITEURL;
	} else {
		if (b == "welcomefavorite") {
			var c = SITEURL+"?from=fav"
		} else {
			var c = location.href + (b == true ? "?from=topfavorite": "")
		}
	}
	if ($.browser.msie) {
		try {
			window.external.addFavorite(c, ""+WEBNICK+"-省钱，从"+WEBNICK+"开始。")
		} catch(a) {
			alert("请按键盘 CTRL键 + D 把"+WEBNICK+"放入收藏夹，折扣信息一手掌握！")
		}
	} else {
		if ($.browser.mozilla) {
			try {
				window.sidebar.addPanel(""+WEBNICK+"-网购，从"+WEBNICK+"开始。", c, "")
			} catch(a) {
				alert("请按键盘 CTRL键 + D 把"+WEBNICK+"放入收藏夹，折扣信息一手掌握！")
			}
		} else {
			alert("请按键盘 CTRL键 + D 把"+WEBNICK+"放入收藏夹，折扣信息一手掌握！")
		}
	}
	return false
}

function SetHome(url){
	if (document.all) {
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage(url);
	}else{ 
		alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!"); 
	} 
}

function CloseNLRAF(a) {
	if (a) {
		$.cookie("NLRAF", "true", {
			path: "/",
			expires: 30
		})
	} else {
		$.cookie("NLRAF", "true", {
			path: "/"
		})
	}
	$("#afp").slideUp()
}

$(function(){
	//图片懒加载
	$('img.lazy').lazyload({
		threshold:200,
		failure_limit:40,
		effect : "fadeIn"
	});

	//顶部弹出收藏
	if ($.cookie("NLRAF") == null && !/favorite|desk|zt11/.test(location.search)) {
		if (!$("#afp").length) {
			$("body").prepend('<div id="afp" style="display:none;"><div class="afpc"><p>请按键盘 <strong>CTRL + D</strong> 把'+WEBNICK+'放入收藏夹，折扣信息一手掌握！<a id="af" class="afpa" href="javascript:void(0)" onclick="AddFavorite(true)">加入收藏夹</a><a href="'+SITEURL+'index.php?m=index&a=shortcut" class="desktop">添加到桌面</a></p></div><div class="close_area"><label id="nlraf" onclick="CloseNLRAF(true)" for="check_nlraf"><input type="checkbox" id="check_nlraf" />不再提醒</label><a id="cafp" href="javascript:void(0)" onclick="CloseNLRAF(false)"></a></div></div>')
		}
		$("#afp").slideDown("slow")
	}

	//跟随滚动
    var ele_fix = $("#lr_float");
    var _main = $(".main");
    if (ele_fix.length > 0) {
        var ele_offset_top = ele_fix.offset().top;
        $(window).scroll(function() {
            var scro_top = $(this).scrollTop();
            var test = ele_offset_top + scro_top;
            var fix_foot_pos = parseInt(ele_fix.height()) + parseInt(scro_top);
            var mainpos = parseInt(_main.offset().top) + parseInt(_main.height());
            if (scro_top <= ele_offset_top && fix_foot_pos < mainpos) {
                ele_fix.css({
                    position: "static",
                    top: "0"
                });
            } else if (scro_top > ele_offset_top && fix_foot_pos < mainpos) {
                $("#lr_float").css({
                    "position": "fixed",
                    "top": "0"
                });
            } else if (scro_top > ele_offset_top && fix_foot_pos > mainpos) {
                var posi = mainpos - fix_foot_pos;
                ele_fix.css({
                    position: "fixed",
                    top: posi
                });
            }
        });
    }
	
	/*底部滚动*/
	var F_scroll_pics = function(){
    	var sWidth = $(".slide-img").width();
    	var len = $("#ft-box li").length;
    	var index = 0;
    	var picsScrollTimer;

    	var leftBtnClickEvt = function(){
        	$(".left-cur").on("click" , function () {
            	index -= 1;
            	if (index == -1) { index = len - 1; }
            	showPics(index);
            	addOrRemoveBtnsClass();
        	});
    	}
    
    	var rightBtnClickEvt = function(){
        	$(".right-cur").on("click" , function () {
            	index += 1;
            	if (index == len) { index = 0; }
            	showPics(index);
            	addOrRemoveBtnsClass();
        	});
    	}
   
    	$("#ft-box").css("width", sWidth * (len));
    
    	$(".wechat").hover(function () {
        	clearInterval(picsScrollTimer);
    	}, function () {
        	picsScrollTimer = setInterval(function () {
            	showPics(index);
            	addOrRemoveBtnsClass();
            	index++;
            	if (index == len) { index = 0; }
        	}, 3000);
    	}).trigger("mouseleave");
    

    	var initBtnClickEvt = function(){
        	leftBtnClickEvt();
        	rightBtnClickEvt();
        	addRightBtnClass();
    	}

    	function addRightBtnClass() {
        	$(".right-cur").addClass("right-unactive");
        	$(".right-unactive").unbind("click");
    	}

    	function addLeftBtnClass(){
        	$(".left-cur").addClass("left-unactive");
        	$(".left-unactive").unbind("click");
    	}

    	function removeRightBtnClass(){
        	$(".right-cur").removeClass("right-unactive");
        	$(".right-cur").on("click" , rightBtnClickEvt());
    	}

    	function removeLeftBtnClass(){
        	$(".left-cur").removeClass("left-unactive");
        	$(".left-cur").on("click" , leftBtnClickEvt());
    	}
    
    	function addOrRemoveBtnsClass(){
        	if(index == 0){
             	addRightBtnClass();
             	removeLeftBtnClass();
        	}else{  
            	removeRightBtnClass();           
            	addLeftBtnClass();        
        	}
    	}
    
    	function showPics(index) {
        	var nowLeft = -index * sWidth;
        	$("#ft-box").stop(true, false).animate({ "left": nowLeft }, 300);
    	}
    	initBtnClickEvt();
    }
	
	/*返回顶部宽版*/
    var F_backToTop_k = function(){
        var $backToTopEle = $('<div class="backToTop"></div>');
        $backToTopEle.appendTo($("body"));
        var $backToTop = $(".backToTop");

        var F_backTo_hover = function(){
            $backToTop.hover(function(){
                //选中状态
                $backToTop.css("background-position","0px -51px")
            },
            function(){
                $backToTop.css("background-position","0px 0px")
            })
        }

        F_backTo_hover();

        var F_backTo_click = function(){
            $backToTopEle.click(function() {
                //飞起状态
                $backToTop.css("background-position","0px -51px");
                var native = function(){
                    //初始状态
                    $backToTop.css("background-position","0px 0px");
                }
                $("html, body").animate({scrollTop: 0}, 200, native);
            });
        }

        var F_backTo_click_tip = function(){
            $backToTopEle.click(function() {
                
                $backToTop.css("background-position","0px -51px");
                var native = function(){
                    $backToTopEle.unbind();
                    F_backTo_hover();
                    F_backTo_click();
                    $backToTop.css("background-position","0px 0px");
                }
                $("html, body").animate({ scrollTop: 0 }, 200,native);
            });
        }
        F_backTo_click_tip();

        var $backToTopFun = function() {
            var st_back = $(document).scrollTop(), winh_back = $(window).height(),footh = $("div.foot").height(),
                doch_back = $(document).height();
            
            (st_back > winh_back)? $backToTopEle.fadeIn(): $backToTopEle.hide();
            //IE6下的定位
            if (!window.XMLHttpRequest) {
                $backToTopEle.css("top", st_back + winh_back - 166);    
            }
        };
        $(window).bind("scroll", $backToTopFun);
        $backToTopFun();
    }

	F_scroll_pics();
	F_backToTop_k();
});