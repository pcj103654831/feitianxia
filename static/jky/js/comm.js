(function($) {
 
	$('.J_coupon').live('click', function(){
		if(!$.ftxia.dialog.islogin()) return !1;
		var link=$(this).data('href');
		$(this).attr({'href':link,'target':'_blank'}); 
	});

	var sign = $("div.sign");
	sign.hover(function() {
		$(this).find(".box-sign").show();
	}, function() {
		$(this).find(".box-sign").hide();
	});

})(jQuery);