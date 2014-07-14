function addJumpBoxDom(o){
	$('#ddjumpboxdom').html('<div class="alert_fullbg" id="LightBox"></div><div class="alert_bg alert_report" id="'+o.id+'" show="0"><div class="alert_box"><div class="alert_top"><span class="title"></span><a class="close" href="javascript:;"></a></div><div class="alert_content">内容加载中。。。。。。</div></div>');
}
function jumpBoxInitialize(o){
    o.titleWord = o.title;
    $('#' + o.id + ' .title').html(o.titleWord);
    $('#' + o.id + ' .alert_content').css('height', o.height-40);
    $('#' + o.id + ' .alert_content').css('width', o.width-40);
	$('#' + o.id).css('width', o.width).css('margin-left', '-' + (o.width / 2+6) + 'px');
    $('#' + o.id).attr('show', 1);
    g1 = (getClientHeight() - o.height) / 2-16;
    g2 = g1 / getClientHeight();
    g2 = Math.round(g2 * 100) - 1;
    $('#' + o.id).css('top', g2 + '%');
	$('.alert_fullbg').css('height',document.body.scrollHeight);
	if ($.browser.msie && $.browser.version == "6.0") {	
		default_top1=document.documentElement.scrollTop+150+"px";
		$("#"+o.id).css("top",default_top1);
		$(window).scroll(function() {
			default_top2=document.documentElement.scrollTop+150+"px";
			$("#"+o.id).css("top",default_top2);	
		})
	}
}

// JavaScript Document
// 创建一个闭包  
(function($) {
    // 插件的定义  
    $.fn.jumpBox = function(options) {
        debug(this);
        // build main options before element iteration  
        var opts = $.extend({},
        $.fn.jumpBox.defaults, options);
        // iterate and reformat each matched element  
        $('body').click(mouseLocation);
        function mouseLocation(e) {
            if (opts.easyClose == 1 && $('#' + opts.id).attr('show') == 1) {
                rightk = (document.body.offsetWidth - 950) / 2;
                rightw = (950 - opts.width) / 2;
                toright = rightk + rightw;
                totop = $('#' + opts.id).attr("offsetTop");
                if (e.pageX < toright || e.pageX > toright + opts.width || e.pageY < totop || e.pageY > totop + opts.height) {
                    $('#' + opts.id + ' .close').click();
                }
            }
        }

        return this.each(function() {
            $this = $(this);
            // build element specific options  
            var o = $.meta ? $.extend({},
            opts, $this.data()) : opts;
            // update element styles   
            /*if(o.debug==1){
	    $.fn.jumpBox.initialize(o);
	  }*/
            $this[o.method](o.bind,function(event) {  // $this[o.method](o.event,function(event) {
				$('#ddjumpboxdom').html('');
				re=1;
				if (o.reg != '') {
                    re =eval(o.reg);
                }
				if(re==2){
				    return false;
				}

                if (re==1) {
					if(o.defaultContain == 0){
					    $.fn.jumpBox.load(o);
					}

					$('select').hide();
					$('#'+o.id+' select').show();
                    if (o.button == 1) {
                        $(this).attr('disabled', true);
                    }
				    $.fn.jumpBox.initialize(o);

				    ajaxUrl = $(this).attr('href');
                    word = $(this).attr('word');
                    contain = o.contain;
				    $content=$('#' + o.id + ' .alert_content');

                    if (o.jsCode != '') {
                        eval(o.jsCode);
                    }

                    if (ajaxUrl != '' && ajaxUrl != undefined && o.a == 0) {
                        if(o.jsonp==0){
							$.post(ajaxUrl, function(data) {
                            	$('#' + o.id + ' .alert_content').html(data);
                        	});
						}
                        else{
							$.ajax({
								type:'get',
								url:ajaxUrl,
								dataType:'jsonp',
								jsonp:"callback",
								success:function(data){
									$('#' + o.id + ' .alert_content').html(data.r);
								}
							});
						}
                    } else if (word != '' && word != undefined) {
                        $('#' + o.id + ' .alert_content').html(word);
                    } else if (o.contain != '') {
                        $('#' + o.id + ' .alert_content').html(contain);
                    }
                    $('#' + o.id).show();
                    if (o.LightBox == 'show') {
                        bodyHeight = document.body.scrollHeight;
                        $('#LightBox').css('height', bodyHeight);
                        $('#LightBox').show();
                    }

                    if (o.jsCode2 != '') {
                        eval(o.jsCode2);
                    }

                    if (o.jsScript != '') {
                        $.getScript(o.jsScript);
                    }
                }

                event.stopPropagation();

                if (o.a == 0) {
                    return false;
                }
            });
			
            $.fn.jumpBox.close(o, $(this));

            //var markup = $this.html();  
            //markup = $.fn.hilight.format(markup);  
            //$this.html(markup);  
        });
    };
    // 私有函数：debugging  
    function debug($obj) {
        if (window.console && window.console.log) window.console.log('hilight selection count: ' + $obj.size());
    };

    //初始化div
    $.fn.jumpBox.initialize = function(o) {
        jumpBoxInitialize(o);
    }
    //定义加载dom函数  
    $.fn.jumpBox.load = function(o) {
		addJumpBoxDom(o); 
    };
    //关闭弹出层
    $.fn.jumpBox.close = function(o, t) {
        cl = '#' + o.id + ' .close';
        ob = '#' + o.id;
        $(cl).live('click',
        function() {
            $(ob).hide();
            $('#LightBox,#jumpbox').hide();
            $('select').show();
            $(ob).attr('show', 0);
            if (o.button == 1) {
                t.attr('disabled', false);
            }
        })
    };
    // 插件的defaults  
    $.fn.jumpBox.defaults = {
        id: 'jumpbox',
        title: '',
        titlebg: 0,
        contain: '',
        jsCode: '',
        jsCode2: '',
        jsScript: '',
        LightBox: 'none',
        a: 0,
        easyClose: 0,
        button: 0,
        height: 300,
        width: 576,
        defaultContain: 0,
		bind:'click',
		background:'',
		reg:'',
		jsonp:0,
		method:'bind'
    };
    // 闭包结束  
})(jQuery);
$(function(){
    $("body").append('<div id="ddjumpboxdom"></div>');
});
function jumpboxClose(){
    $('#LightBox,#jumpbox').hide();
}
function jumpboxOpen(contain,height,width,title){
	var domObject=new Object();
	domObject.id='jumpbox2';
	domObject.title=title;
	domObject.titlebg=0;
	domObject.height=height;
	domObject.width=width;
	domObject.background='';
	addJumpBoxDom(domObject); 
	jumpBoxInitialize(domObject);
	$('#LightBox,#jumpbox2').show();
	$(".close").on("click",function(){
		$('#LightBox,#jumpbox2').hide();
	})
	if(contain!=''){
		$('#' + domObject.id + ' .alert_content').html(contain);
	}
}