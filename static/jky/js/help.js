function getRecommendCode(){
    var recommend = '';
	var href = window.location.href.split("#");
	if (href.length==2) {
		if (href[1].substring(0,1)!='_'){
		   recommend = decodeURI(href[1]);
		}
	}
	return recommend;	
}
$(function(){
	$(".help_list .title").each( function(){
		$(this).bind('click' , function(){
			if( $(this).parent().attr('class') == 'on' ){
				$(this).parent().attr('class' , '');
			}else{
				$(this).parent().attr('class' , 'on');
			}
			var now = $(this).html();
			$(".help_list .title").each( function(){
				if( now != $(this).html() ){
					$(this).parent().attr('class' , '');
				}
			});
		});
	});
	var code = getRecommendCode();
	if( code  != '' ){
		$('#'+code).attr('class' , 'on') ;
	}
});
