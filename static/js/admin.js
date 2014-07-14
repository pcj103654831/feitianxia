/**
 * **********************后台操作JS************************
 * ajax 状态显示
 * confirmurl 操作询问
 * showdialog 弹窗表单
 * attachment_icon 附件预览效果
 * preview 预览图片大图
 * cate_select 多级菜单动态加载
 * 
 * http://www.ftxia.com
 * author: andery@foxmail.com
 */
;$(function($){
	//AJAX请求效果
	$('#J_ajax_loading').ajaxStart(function(){
		$(this).show();
	}).ajaxSuccess(function(){
		$(this).hide();
	});

	//确认操作
	$('.J_confirmurl').live('click', function(){
		var self = $(this),
			uri = self.attr('data-uri'),
			acttype = self.attr('data-acttype'),
			title = (self.attr('data-title') != undefined) ? self.attr('data-title') : lang.confirm_title,
			msg = self.attr('data-msg'),
			callback = self.attr('data-callback');
		$.dialog({
			title:title,
			content:msg,
			padding:'10px 20px',
			lock:true,
			ok:function(){
				if(acttype == 'ajax'){
					$.getJSON(uri, function(result){
						if(result.status == 1){
							$.ftxia.tip({content:result.msg});
							if(callback != undefined){
								eval(callback+'(self)');
							}else{
								window.location.reload();
							}
						}else{
							$.ftxia.tip({content:result.msg, icon:'error'});
						}
					});
				}else{
					location.href = uri;
				}
			},
			cancel:function(){}
		});
	});
	
	//弹窗表单
	$('.J_showdialog').live('click', function(){
		var self = $(this),
			dtitle = self.attr('data-title'),
			did = self.attr('data-id'),
			duri = self.attr('data-uri'),
			dwidth = parseInt(self.attr('data-width')),
			dheight = parseInt(self.attr('data-height')),
			dpadding = (self.attr('data-padding') != undefined) ? self.attr('data-padding') : '',
			dcallback = self.attr('data-callback');
		$.dialog({id:did}).close();
		$.dialog({
			id:did,
			title:dtitle,
			width:dwidth ? dwidth : 'auto',
			height:dheight ? dheight : 'auto',
			padding:dpadding,
			lock:true,
			ok:function(){
				var info_form = this.dom.content.find('#info_form');
				if(info_form[0] != undefined){
					info_form.submit();
					if(dcallback != undefined){
						eval(dcallback+'()');
					}
					return false;
				}
				if(dcallback != undefined){
					eval(dcallback+'()');
				}
			},
			cancel:function(){}
		});
		$.getJSON(duri, function(result){
			if(result.status == 1){
				$.dialog.get(did).content(result.data);
			}
		});
		return false;
	});
	
	//附件预览
	$('.J_attachment_icon').live('mouseover', function(){
		var ftype = $(this).attr('file-type');
		var rel = $(this).attr('file-rel');
		switch(ftype){
			case 'image':
				if(!$(this).find('.attachment_tip')[0]){
					$('<div class="attachment_tip"><img src="'+rel+'" /></div>').prependTo($(this)).fadeIn();
				}else{
					$(this).find('.attachment_tip').fadeIn();
				}
				break;
		}
	}).live('mouseout', function(){
		$('.attachment_tip').hide();
	});
	
	$('.J_attachment_icons').live('mouseover', function(){
		var ftype = $(this).attr('file-type');
		var rel = $(this).attr('file-rel');
		switch(ftype){
			case 'image':
				if(!$(this).find('.attachment_tip')[0]){
					$('<div class="attachment_tip" style="width:160px; height:80px;"><img width="160" height="80" src="'+rel+'" /></div>').prependTo($(this)).fadeIn();
				}else{
					$(this).find('.attachment_tip').fadeIn();
				}
				break;
		}
	}).live('mouseout', function(){
		$('.attachment_tip').hide();
	});
});

//显示大图
;(function($){
	$.fn.preview = function(){
		var w = $(window).width();
		var h = $(window).height();
		
		$(this).each(function(){
			$(this).hover(function(e){
				if(/.png$|.gif$|.jpg$|.bmp$|.jpeg$/.test($(this).attr("data-bimg"))){
					$("body").append("<div id='preview'><img src='"+$(this).attr('data-bimg')+"' /></div>");
				}
				var show_x = $(this).offset().left + $(this).width();
				var show_y = $(this).offset().top;
				var scroll_y = $(window).scrollTop();
				$("#preview").css({
					position:"absolute",
					padding:"4px",
					border:"1px solid #f3f3f3",
					backgroundColor:"#eeeeee",
					top:show_y + "px",
					left:show_x + "px",
					zIndex:1000
				});
				$("#preview > div").css({
					padding:"5px",
					backgroundColor:"white",
					border:"1px solid #cccccc"
				});
				if (show_y + 230 > h + scroll_y) {
					$("#preview").css("bottom", h - show_y - $(this).height() + "px").css("top", "auto");
				} else {
					$("#preview").css("top", show_y + "px").css("bottom", "auto");
				}
				$("#preview").fadeIn("fast")
			},function(){
				$("#preview").remove();
			})					  
		});
	};
})(jQuery);

;(function($){
    //联动菜单
    $.fn.cate_select = function(options) {
        var settings = {
            field: 'J_cate_id',
            top_option: lang.please_select
        };
        if(options) {
            $.extend(settings, options);
        }

        var self = $(this),
            pid = self.attr('data-pid'),
            uri = self.attr('data-uri'),
            selected = self.attr('data-selected'),
            selected_arr = [];
        if(selected != undefined && selected != '0'){
        	if(selected.indexOf('|')){
        		selected_arr = selected.split('|');
        	}else{
        		selected_arr = [selected];
        	}
        }
        self.nextAll('.J_cate_select').remove();
        $('<option value="">--'+settings.top_option+'--</option>').appendTo(self);
        $.getJSON(uri, {id:pid}, function(result){
            if(result.status == '1'){
                for(var i=0; i<result.data.length; i++){
                $('<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>').appendTo(self);
                }
            }
            if(selected_arr.length > 0){
            	//IE6 BUG
            	setTimeout(function(){
            		self.find('option[value="'+selected_arr[0]+'"]').attr("selected", true);
	        		self.trigger('change');
            	}, 1);
            }
        });

        var j = 1;
        $('.J_cate_select').die('change').live('change', function(){
            var _this = $(this),
            _pid = _this.val();
            _this.nextAll('.J_cate_select').remove();
            if(_pid != ''){
                $.getJSON(uri, {id:_pid}, function(result){
                    if(result.status == '1'){
                        var _childs = $('<select class="J_cate_select mr10" data-pid="'+_pid+'"><option value="">--'+settings.top_option+'--</option></select>')
                        for(var i=0; i<result.data.length; i++){
                            $('<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>').appendTo(_childs);
                        }
                        _childs.insertAfter(_this);
                        if(selected_arr[j] != undefined){
                        	//IE6 BUG
                        	//setTimeout(function(){
			            		_childs.find('option[value="'+selected_arr[j]+'"]').attr("selected", true);
				        		_childs.trigger('change');
			            	//}, 1);
			            }
                        j++;
                    }
                });
                $('#'+settings.field).val(_pid);
				var cateNameInfo = this.options[this.selectedIndex].text;
                $('#'+settings.field).attr('info',cateNameInfo);
            }else{
            	$('#'+settings.field).val(_this.attr('data-pid'));
            }
        });
    }
})(jQuery);



;(function($){
    //联动菜单
    $.fn.tejia_select = function(options) {
        var settings = {
            field: 'J_tejia_cate_id',
            top_option: lang.please_select
        };
        if(options) {
            $.extend(settings, options);
        }

        var self = $(this),
            pid = self.attr('data-pid'),
            uri = self.attr('data-uri'),
            selected = self.attr('data-selected'),
            selected_arr = [];
        if(selected != undefined && selected != '0'){
        	if(selected.indexOf('|')){
        		selected_arr = selected.split('|');
        	}else{
        		selected_arr = [selected];
        	}
        }
        self.nextAll('.J_tejia_select').remove();
        $('<option value="">--'+settings.top_option+'--</option>').appendTo(self);
        $.getJSON(uri, {id:pid}, function(result){
            if(result.status == '1'){
                for(var i=0; i<result.data.length; i++){
                $('<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>').appendTo(self);
                }
            }
            if(selected_arr.length > 0){
            	//IE6 BUG
            	setTimeout(function(){
            		self.find('option[value="'+selected_arr[0]+'"]').attr("selected", true);
	        		self.trigger('change');
            	}, 1);
            }
        });

        var j = 1;
        $('.J_tejia_select').die('change').live('change', function(){
            var _this = $(this),
            _pid = _this.val();
            _this.nextAll('.J_tejia_select').remove();
            if(_pid != ''){
                $.getJSON(uri, {id:_pid}, function(result){
                    if(result.status == '1'){
                        var _childs = $('<select class="J_tejia_select mr10" data-pid="'+_pid+'"><option value="">--'+settings.top_option+'--</option></select>')
                        for(var i=0; i<result.data.length; i++){
                            $('<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>').appendTo(_childs);
                        }
                        _childs.insertAfter(_this);
                        if(selected_arr[j] != undefined){
                        	//IE6 BUG
                        	//setTimeout(function(){
			            		_childs.find('option[value="'+selected_arr[j]+'"]').attr("selected", true);
				        		_childs.trigger('change');
			            	//}, 1);
			            }
                        j++;
                    }
                });
                $('#'+settings.field).val(_pid);
				var cateNameInfo = this.options[this.selectedIndex].text;
                $('#'+settings.field).attr('info',cateNameInfo);
            }else{
            	$('#'+settings.field).val(_this.attr('data-pid'));
            }
        });
    }
})(jQuery);


(function($){
    //U站采集联动菜单
    $.fn.uzhan_select = function(options) {
        var settings = {
            field: 'uzhan_id',
            top_option: lang.please_select
        };
        if(options) {
            $.extend(settings, options);
        }
        var self = $(this),
            pid = self.attr('data-pid'),
            uri = self.attr('data-uri'),
            selected = self.attr('data-selected'),
            selected_arr = [];
        if(selected != undefined && selected != '0'){
        	if(selected.indexOf('|')){
        		selected_arr = selected.split('|');
        	}else{
        		selected_arr = [selected];
        	}
        }
        self.nextAll('.uzhan_select').remove();
        $('<option value="0">--'+settings.top_option+'--</option>').appendTo(self);
        $.getJSON(uri,{}, function(result){
            if(result.status == '1'){
                for(var i=0; i<result.data.length; i++){
                  $('<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>').appendTo(self);
                }
            }
            if(selected_arr.length > 0){
            	//IE6 BUG
            	setTimeout(function(){
            		self.find('option[value="'+selected_arr[0]+'"]').attr("selected", true);
	        		self.trigger('change');
            	}, 1);
            }
        });

        var j = 1;
        $('.uzhan_select').die('change').live('change', function(){
            var _this = $(this),
            _pid = _this.val();
            var theCateBody = $('#td_uzhan_cate');
        	theCateBody.html('');
        	$('#uzhan_id').val(_pid);
            
        	if(_pid=='0'||_pid==''){
            	uzhanId = _pid;
            	uzhanCateId='';
            	uzhanCateSelected=[];
            	uzhanCates=[];
            	$('#td_uzhan_cate').html('');
            	$('#cateMatch').html('');
            }else{
            	uzhanId = _pid;
            	uzhanCateId='';
            	uzhanCateSelected=[];
            	uzhanCates=[];
            	$('#cateMatch').html('');
            	$.getJSON(uzhanCateUrl,{uzhan_id:uzhanId}, function(result){
                    if(result.status == '1'){
                    	uzhanCates = result.data;
                    	var bodyStr = '';
                        for(var i=0; i<result.data.length; i++){
                        	bodyStr+='<input type="checkbox" class="uzhan_cate" name="uzhanCate" id="cb_'+result.data[i].id+'" value="'+result.data[i].id+'"/> '+result.data[i].name+' ';
                        }
                        theCateBody.html(bodyStr);
                    } 
                });	
            } 
        });
        $('.uzhan_cate').live('click', function(){
        	var _this = $(this),_uzhanCateId = _this.val();
        	if(_uzhanCateId==uzhanCateId){
        		if(!this.checked){
        			uzhanCateId = '';
        			_this.attr('checked',this.checked);
        		}
        	}else{
        		uzhanCateId = _uzhanCateId;
        		$('.uzhan_cate').attr('checked', false);
    			_this.attr('checked', true);
        	}
			
		}); 
    }
})(jQuery);
 (function($) {

$.fn.ajaxSubmit = function(options) {
    if (typeof options == 'function')
        options = { success: options };

    options = $.extend({
        url:  this.attr('action') || window.location,
        type: this.attr('method') || 'GET'
    }, options || {});

    var a = this.formToArray(options.semantic);
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) return this;

    var veto = {};
    $.event.trigger('form.submit.validate', [a, this, options, veto]);
    if (veto.veto)
        return this;

    var q = $.param(a);//.replace(/%20/g,'+');

    if (options.type.toUpperCase() == 'GET') {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
        options.data = null;  
    }
    else
        options.data = q; 

    var $form = this, callbacks = [];
    if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
    if (options.clearForm) callbacks.push(function() { $form.clearForm(); });
    if (!options.dataType && options.target) {
        var oldSuccess = options.success;// || function(){};
        callbacks.push(function(data) {
            $(options.target).attr("innerHTML", data).evalScripts().each(oldSuccess, arguments);
        });
    }
    else if (options.success)
        callbacks.push(options.success);

    options.success = function(data, status) {
        for (var i=0, max=callbacks.length; i < max; i++)
            callbacks[i](data, status, $form);
    };

    var files = $('input:file', this).fieldValue();
    var found = false;
    for (var j=0; j < files.length; j++)
        if (files[j]) 
            found = true;

    if (options.iframe || found) 
        fileUpload();
    else
        $.ajax(options);
    $.event.trigger('form.submit.notify', [this, options]);
    return this;
    function fileUpload() {
        var form = $form[0];
        var opts = $.extend({}, $.ajaxSettings, options);
        
        var id = 'jqFormIO' + $.fn.ajaxSubmit.counter++;
        var $io = $('<iframe id="' + id + '" name="' + id + '" />');
        var io = $io[0];
        var op8 = $.browser.opera && window.opera.version() < 9;
        if ($.browser.msie || op8) io.src = 'javascript:false;document.write("");';
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

        var xhr = { // mock object
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: 'n/a',
            getAllResponseHeaders: function() {},
            getResponseHeader: function() {},
            setRequestHeader: function() {}
        };
        
        var g = opts.global;
        if (g && ! $.active++) $.event.trigger("ajaxStart");
        if (g) $.event.trigger("ajaxSend", [xhr, opts]);
        
        var cbInvoked = 0;
        var timedOut = 0;
       
        setTimeout(function() {
            $io.appendTo('body');
            io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
            
            var encAttr = form.encoding ? 'encoding' : 'enctype';
            var t = $form.attr('target');
            $form.attr({
                target:   id,
                method:  'POST',
                encAttr: 'multipart/form-data',
                action:   opts.url
            });

            if (opts.timeout)
                setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

            form.submit();
            $form.attr('target', t); // reset target
        }, 10);
        
        function cb() {
            if (cbInvoked++) return;
            
            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

            var ok = true;
            try {
                if (timedOut) throw 'timeout';
                // extract the server response from the iframe
                var data, doc;
                doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                xhr.responseText = doc.body ? doc.body.innerHTML : null;
                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                
                if (opts.dataType == 'json' || opts.dataType == 'script') {
                    var ta = doc.getElementsByTagName('textarea')[0];
                    data = ta ? ta.value : xhr.responseText;
                    if (opts.dataType == 'json')
                        eval("data = " + data);
                    else
                        $.globalEval(data);
                }
                else if (opts.dataType == 'xml') {
                    data = xhr.responseXML;
                    if (!data && xhr.responseText != null)
                        data = toXml(xhr.responseText);
                }
                else {
                    data = xhr.responseText;
                }
            }
            catch(e){
                ok = false;
                $.handleError(opts, xhr, 'error', e);
            }
            if (ok) {
                opts.success(data, 'success');
                if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
            }
            if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
            if (g && ! --$.active) $.event.trigger("ajaxStop");
            if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

            setTimeout(function() { 
                $io.remove(); 
                xhr.responseXML = null;
            }, 100);
        };
        
        function toXml(s, doc) {
            if (window.ActiveXObject) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(s);
            }
            else
                doc = (new DOMParser()).parseFromString(s, 'text/xml');
            return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
        };
    };
};
$.fn.ajaxSubmit.counter = 0; 

$.fn.ajaxForm = function(options) {
    return this.ajaxFormUnbind().submit(submitHandler).each(function() {
        // store options in hash
        this.formPluginId = $.fn.ajaxForm.counter++;
        $.fn.ajaxForm.optionHash[this.formPluginId] = options;
        $(":submit,input:image", this).click(clickHandler);
    });
};

$.fn.ajaxForm.counter = 1;
$.fn.ajaxForm.optionHash = {};

function clickHandler(e) {
    var $form = this.form;
    $form.clk = this;
    if (this.type == 'image') {
        if (e.offsetX != undefined) {
            $form.clk_x = e.offsetX;
            $form.clk_y = e.offsetY;
        } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
            var offset = $(this).offset();
            $form.clk_x = e.pageX - offset.left;
            $form.clk_y = e.pageY - offset.top;
        } else {
            $form.clk_x = e.pageX - this.offsetLeft;
            $form.clk_y = e.pageY - this.offsetTop;
        }
    }
    // clear form vars
    setTimeout(function() { $form.clk = $form.clk_x = $form.clk_y = null; }, 10);
};

function submitHandler() {
    // retrieve options from hash
    var id = this.formPluginId;
    var options = $.fn.ajaxForm.optionHash[id];
    $(this).ajaxSubmit(options);
    return false;
};

$.fn.ajaxFormUnbind = function() {
    this.unbind('submit', submitHandler);
    return this.each(function() {
        $(":submit,input:image", this).unbind('click', clickHandler);
    });

};

$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        var inputs = form.getElementsByTagName("input");
        for(var i=0, max=inputs.length; i < max; i++) {
            var input = inputs[i];
            var n = input.name;
            if(n && !input.disabled && input.type == "image" && form.clk == input)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};


$.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
        var n = this.name;
        if (!n) return;
        var v = $.fieldValue(this, successful);
        if (v && v.constructor == Array) {
            for (var i=0,max=v.length; i < max; i++)
                a.push({name: n, value: v[i]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: this.name, value: v});
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
};

$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
            continue;
        v.constructor == Array ? $.merge(val, v) : val.push(v);
    }
    return val;
};

$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                // extra pain for IE...
                var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

$.fn.clearForm = function() {
    return this.each(function() {
        $('input,select,textarea', this).clearFields();
    });
};

$.fn.clearFields = $.fn.clearInputs = function() {
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (t == 'text' || t == 'password' || tag == 'textarea')
            this.value = '';
        else if (t == 'checkbox' || t == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};

$.fn.resetForm = function() {
    return this.each(function() {
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
            this.reset();
    });
};
})(jQuery);


(function($)
{ 
	$.fn.LMContainer = function(options)
	{ 
		var defaults =
		{ 
			width:"600px", 
			height:"225px",
			time:"5000"
		}
		
		//绑定选择器的DOM对象
		var $this = $(this);
		var $picContainer = "ul.pic li";
		var $navContainer = "ul.nav li";
		$($this).append("<ul class='nav'></ul>");
		$NumF = $this.find("ul.pic li").size()+1;
		for(i=1;i<$NumF;i++)
		{
			$this.find("ul.nav").append("<li><a>"+i+"</a></li>");
		}
		$this.find("ul.nav").find("a").attr("href","javascript:void(0);");
		var options = $.extend(defaults, options); 
		
		return this.each(function()
		{			
			BuildHtmlElement();
			BuildCssStyle();
			main(0);
			
			function main($aaa)
			{
				$start = $aaa;
				timerID = setInterval("$.fnaaa($start)",options.time);
			}
			$($this).find($navContainer).each(function(i)
			{
				$($this).find($navContainer+":eq("+i+")").click(function()
				{
					clearInterval(timerID);
					determine(i);
					main(i);
				});
			});//each ul.nav li
			
			$.extend
			({			
				fnaaa:function(btnNum)
				{
					determine(btnNum);
					$start++;
					//alert($('ul.pic li').size());
					if($start>=$this.find("ul.pic li").size()){$start = 0;}
				}//end fnaaa()
			});//end extend

			//选择函数
			function determine(btnNum)
			{
				for(var i=0;i<$this.find($picContainer).size();i++)
				{
					if(btnNum == i)
					{
						$($picContainer+":eq("+i+")").fadeIn(1000);
						$($navContainer+":eq("+i+") a").css("background","#f00");
					}
					else
					{
						$($picContainer+":eq("+i+")").fadeOut(500);
						$($navContainer+":eq("+i+") a").css("background","#000");
					}
				}//end for
			}//end determine
			
			//构建HTML元素
			function BuildHtmlElement()
			{
				$this.find($picContainer).not(":eq(0)").hide();
				$this.find($navContainer+":eq(0) a").css("background","#f00");
			};//end BuildHtmlElement
			
			//构建HTML元素的CSS样式
			function BuildCssStyle()
			{
				$($this).css(
				{
					width:options.width,
					height:options.height,
					background:options.background
				});
			};//end BuildCssStyle
			
		});//each $(this)		
	}//end LMContainer

//闭包结束
})(jQuery);
 
var ftxiaAdmin = {
	update: function() {
		document.getElementById('site_noticeid').style.display='none';
		$.dialog({id:'update',title: '在线升级',content: '在线升级前请备份程序，以便更新失败时来快速恢复，是否继续升级操作？',padding: '20px 20px',lock: true,
			ok: function() {
				$.getJSON(updateurl, 
				function(result) {
					if (result.status == 1) {
						$.ftxia.tip({content: result.msg});
						$('#J_flush_cache').click();
					} else {
						$.ftxia.tip({
							content: result.msg,
							icon: 'error'
                        })
                    }
				})
			},
			cancel: function() {}
		})
	}

};