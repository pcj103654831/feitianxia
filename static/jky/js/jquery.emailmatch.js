(function($){
	$.fn.emailMatch= function(settings){
		var defaultSettings = {
			emailTip:"",
			aEmail:["qq.com","gmail.com","126.com","163.com","hotmail.com","live.com","sohu.com","sina.com"], //邮件数组
			wrapLayer:"body",
			className:"mailListBox",
			emailRemember:true,
			autoCursor:false,
			position:"bottom" // bottom, left , right
		};
		/* 合并默认参数和用户自定义参数 */
		settings = settings ? $.extend(defaultSettings,settings):defaultSettings;
		return this.each(function(){
			var elem = $(this),t=0,l=0,
			w = elem.outerWidth(), 
			h = elem.outerHeight(),
			selectVal = sMail = inputVal = "",arrayNum = 0,
			isIndex = -1;
			
			switch(settings.position){  // 判断 列表位置
				case "bottom":
					t = elem.position().top;
					l = elem.position().left;
				break;
				case "left":
					t = elem.position().top - h;
					l = elem.position().left - w;
				break;
				case "right":
					t = elem.position().top - h;
					l = elem.position().left + w;
				break;
				default:
					t = elem.position().top;
					l = elem.position().left;
			}
			
			var mailWrap = document.createElement("div");
			$(mailWrap).attr({"id":elem.attr("id"),"class":settings.className})
			$(settings.wrapLayer).append(mailWrap);
			if($.trim(elem.val()) == ""){elem.val(settings.emailTip);};
			elem.focus(function(){
				arrayNum = 0;
				if($.trim(elem.val()) == settings.emailTip){elem.val('');}; // 清空 输入框 提示内容
				if($.trim(elem.val()) !=""){
					inputVal = $.trim(elem.val());
					isIndex = inputVal.indexOf("@");
					if(isIndex >= 0 ){
						sMail = inputVal.substr(isIndex + 1);
						inputVal = inputVal.substring(0,isIndex);
						if(sMail !=""){
							arrayNum = parseInt(!position(settings.aEmail,sMail)?0:position(settings.aEmail,sMail));
						}
					}
					if(settings.autoCursor){
						elem.val(inputVal);
						if($.browser.msie ){
							setCaretAtEnd(elem.attr("id"));
						}
					}
					showList($(mailWrap),w,h,t,l);
					createMailList(mailWrap,inputVal,sMail,settings.aEmail,arrayNum);
				};
			}).blur(function(){
				if(elem.val() == ''){
					elem.val(settings.emailTip);
					hideList($(mailWrap));
					return false;
				}; // 还原 输入框 提示内容
				enterVal(mailWrap,elem);
				hideList($(mailWrap));
			});
			elem.keyup(function(e){
				var suffixArray = [], eKey = e && (e.which || e.keyCode);
				//console.log(eKey);
				switch(eKey){
					case 9: // tab 按键
						return;
						break;
					case 13: { // 回车 
							enterVal(mailWrap,elem);
							hideList($(mailWrap));
					}break;
					case 38:{ // 方向键 上
						showList($(mailWrap),w,h,t,l);
						cursorMove(mailWrap,-1);
					}break;
					case 40: {// 方向键 下
						showList($(mailWrap),w,h,t,l);
						cursorMove(mailWrap,+1);
					}break;
					default:{
							inputVal = $.trim(elem.val());
						var	keyIndex = inputVal.indexOf("@");
						var suffix = "",suffixState = true;		
						if(keyIndex >= 0){
							suffix = inputVal.substr(keyIndex + 1);
							inputVal = inputVal.substring(0,keyIndex);
							$("#t2").text("BBB" + inputVal);
							if(suffix != '' && settings.emailRemember){ // 过滤数组
								for (var i = 0; i < settings.aEmail.length; i++) {
									if (settings.aEmail[i].indexOf(suffix) == 0) {
										suffixArray.push(settings.aEmail[i]);
										suffixState = false;
									}
								}				
							}
							if(suffix != '' && !settings.emailRemember){ // 当前高亮 选项 
								for (var i = 0; i < settings.aEmail.length; i++) {
									if (settings.aEmail[i].indexOf(suffix) == 0) {
										arrayNum = i;
										suffixState = false;
										break;
									}
								}
							}
						}
						
						suffixArray = suffixArray.length > 0 ? suffixArray:settings.aEmail;
						if(inputVal=="" && suffix == ""){
							hideList($(mailWrap));
							arrayNum = 0;
							createMailList(mailWrap,inputVal,suffix,settings.aEmail,arrayNum);
						}else{
							showList($(mailWrap),w,h,t,l);
							createMailList(mailWrap,inputVal,suffix,suffixArray,arrayNum);
						}
					}
				}
				
			});
			
			$(mailWrap).find("li:not('.first')").live('mouseover',function(){
				$(this).addClass("hover").siblings().removeClass("hover"); 
			});
			$(mailWrap).find("li:not('.first')").live('mousedown',function(){
				$(this).addClass("current").siblings().removeClass("current");
				enterVal(mailWrap,elem);
				hideList($(mailWrap));
			});
			$(mailWrap).bind("mouseout",function(){
				$(mailWrap).find("li:not('.first')").removeClass("hover");
			});
		});
	};
	
	function cursorMove(o,n){
		var cursorList = $(o).find("li:not('.first')"),k = new Number();
		for(i=0;i<cursorList.length;i++){
			if(cursorList[i].className == "current"){
				k = i+n
				cursorList[i].className = "";
			};
		}
		if(k < 0) k =0;
		if(k >= cursorList.length - 1 ) k = cursorList.length - 1;
		cursorList[k].className = "current";
	}
	
	function setCaretAtEnd(field){ // IE 系列浏览器 在自动光标跳回文档首问题
		var b = document.getElementById(field);
		if (b.createTextRange){
			var r = b.createTextRange(); 
			r.moveStart('character',  b.value.length); 
			r.collapse(); 
			r.select();
		} 
	}
	
	function position(array,value){  // 取得 元素在数组中的位置
		for(var i in array){
			if(array[i]==value){
				return i;break;
			}
		}
	};	
	function enterVal(oWrap,elem){
		elem.val($(oWrap).find("li.current").text()); // 获取高亮内容 到 输入框
	};
	
	function showList(oElem,w,h,t,l){ // 显示 邮箱框架 并定位.
		oElem.css({"display":"block","top":h + t,"left":l,"width":w-2});
	};
	
	function hideList(oElem){ // 显示 邮箱框架 
		oElem.css({"display":"none"});
	};
	
	function createMailList(oWrap,sVal,suffix,aEail,nK){ // 创建 候选列表
		if(nK < 0 ) {nK = 0;}
		if(nK > aEail.length-1) {nK = aEail.length - 1;}
		var mailList = "<li class='first'><span style='display:block;'>请选择邮箱类型</span></li>";
		var State = true; // 用户键入 后缀 是否匹配候选后缀 的状态
		
		for(k=0; k<aEail.length;k++){
			if(suffix!= '' && aEail[k].indexOf(suffix) == 0){
				State = false;
			}
		}
		
		nK = parseInt(suffix!= '' && State && !position(aEail,suffix)?0:nK);
		
		if(suffix !='' && State ){
			if(nK == 0){
				mailList += '<li class="current"><span>'+sVal+'</span>@'+suffix+'</li>';
			} else {
				mailList += '<li><span>'+sVal+'</span>@'+suffix+'</li>';
			}
		}
		if($.isArray(aEail)){
			$.each(aEail, function(i){
				if(State && suffix !=''){
					if(i == (nK-1) ){
						mailList += '<li class="current"><span>'+sVal+'</span>@'+aEail[i]+'</li>';	
					} else {
						mailList += '<li><span>'+sVal+'</span>@'+aEail[i]+'</li>';	
					}
				} else{
					if(i == nK){
						mailList += '<li class="current"><span>'+sVal+'</span>@'+aEail[i]+'</li>';	
					} else {
						mailList += '<li><span>'+sVal+'</span>@'+aEail[i]+'</li>';	
					}
				}
			});
		}
		mailList = "<ul>" + mailList + "</ul>";
		$(oWrap).html(mailList);
	};
})(jQuery);
//注意删除
$("#emailMatch").emailMatch({wrapLayer:"#emailMatch_list"});