$(function() {
	//幻灯片
	if($(".box-play").length){
		if ($(".box-play").find(".img-list li").length != 1) {
			var n = $(".box-play"),
				b, a = "",
				h = $(".box-play").find(".img-list li"),
				k = box_play_interval = null,
				c = 0;
			for (b = 0; b < h.length; b++) {
				if (b == 0) {
					a += '<li class="cur" style=" margin-left:0;"></li>'
				} else {
					a += "<li></li>"
				}
			}
			n.find(".count-num").html(a).css({
				marginLeft: (-n.find(".count-num").width() / 2) + "px"
			});
			n.find(".count-num li").live("mouseover", function() {
				c = n.find(".count-num li").index($(this));
				k = setTimeout(function() {
					n.find(".count-num li").eq(c).addClass("cur").siblings().removeClass("cur");
					h.eq(c).fadeIn("slow").siblings().fadeOut("slow")
				}, 100)
			}).live("mouseout", function() {
				clearTimeout(k)
			});

			function m() {
				clearTimeout(box_play_interval);
				if (c < h.length - 1) {
					c++;
					n.find(".count-num li").eq(c).addClass("cur").siblings().removeClass("cur");
					h.eq(c).fadeIn("slow").siblings().fadeOut("slow")
				} else {
					c = 0;
					n.find(".count-num li").eq(c).addClass("cur").siblings().removeClass("cur");
					h.eq(c).fadeIn("slow").siblings().fadeOut("slow")
				}
				box_play_interval = setTimeout(m, 8000)
			}
			box_play_interval = setTimeout(m, 8000);
			n.live("mouseover", function() {
				clearTimeout(box_play_interval)
			}).live("mouseout", function() {
				box_play_interval = setTimeout(m, 8000)
			})
		} else {
			$(".box-play").find(".count-num").remove()
		}
	}

	//幻灯片开关
	if(getCookie('box-play')!=1){
		$("#img-list").show();
		$("#close_play").show();
	}
	else{
		$("#img-list").hide();
		$("#open_play").show();
	}
	$("#close_play").on("click",function(){
		$("#img-list").slideUp();
		$("#close_play").hide("slow");
		$("#open_play").show("slow");
		setCookie('box-play',1,7); //默认7天执行一次
	})
	$("#open_play").on("click",function(){
		$("#img-list").slideDown();
		$("#close_play").show("slow");
		$("#open_play").hide("slow");
		setCookie('box-play');
	})

	//新手引导
	var isHomeTip = getCookie("home_guide");
	if(!isHomeTip){
		var hei = $("body").height();
		$("#hover_bg").height(hei);
		setCookie("home_guide",1,7); //默认7天执行一次
		showTip(1);
	}
	
	//左侧浮动导航
    var $navFun = function() {
        var st = $(document).scrollTop(), 
            headh = $("div.head").height(),           
            $nav_classify = $("div.jiu-side-nav");

        if(st > headh){
            $nav_classify.addClass("fixed");
        } else {
            $nav_classify.removeClass("fixed");
        }
    };

    var F_nav_scroll = function () {
        if(navigator.userAgent.indexOf('iPad') > -1){
            return false;
        }      
        if (!window.XMLHttpRequest) {
           return;          
        }else{
            //默认执行一次
            $navFun();
            $(window).bind("scroll", $navFun);
        }
    }
    F_nav_scroll();
	 
	//友情链接滚动
	var lh = 0;
	var ih = $('.links_list').height();
	var link_scroll = function(){
		setTimeout(function(){
			lh+=20;
			if(lh + 5>=ih){
				lh=0;
			}
			$('.links_list').animate({top:-lh+'px'}, 500);
			link_scroll();
		}, 5000);
	};
	link_scroll();
});

function showTip(a){
	if(a==0){
		$("#hover_bg").hide();
		$("#hover_two").hide();
		//setCookie("home_tip",1,9999999);
		
	}else if(a==1){
		$("#hover_bg").show();
		$("#hover_one").show();
		$(".search_box").css('z-index','10002');
	
	}else if(a==2){
		$(".search_box").css('z-index','1');
		$("#hover_one").hide();
		$("#hover_bg").show();
		$("#hover_two").show();
		$("#zhe_body").css('z-index','10002');
	}
}