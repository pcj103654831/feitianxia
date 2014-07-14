<div id="J_report" class="dialog_check_item clearfix">
<input type="hidden" value="{$item.id}" id="report_deal_id">
	<div class="clearfix" style="line-height:20px;">
		<span id="display_user">{$visitor.username}</span>，您好，您举报"<a href="{:U('item/index',array('id'=>$item['id']))}">{$item.title}</a>"的原因是:
    	
		<p><li>
    <input type="radio" name="report_reason" value="1" checked="">商品已卖光
    </li>
    <li>
    <input type="radio" name="report_reason" value="2">抢购提前开始
    </li>
    <li>
    <input type="radio" name="report_reason" value="3">商品链接不正确
    </li>
    <li>
    <input type="radio" name="report_reason" value="4">商品分类不正确
    </li>
    <li>
    <input type="radio" name="report_reason" value="5">价格与网站不一致(VIP折扣登录淘宝后才能看到，请登录后查看价格是否一致)
    </li>
    <li>
    <input type="radio" name="report_reason" value="6">商品描述有误
    </li>
    <li>
    <input type="radio" name="report_reason" value="7">其他原因（请填写）
    </li>
  <li>
  <textarea rows="7" cols="77" id="report_comment"></textarea>
  </li>	 
         <input type="hidden" name="znid" value="{$item.id}">
		 <p style="padding-top:20px">留下邮箱以便联系：<input type="text" style="width:200px" id="report_user_email"><span id="login_to" style="display: none; ">或者直接<a href="{:U('user/login')}">登录</a></span><br/>
    <input class="smit" type="button" value="提交" onclick="send_to_ju_report()">
    <em id="report_prompt"></em></p>
    </div>	
	<div class="cx" style="padding:20px 0 10px 30px">
		<div class="explain-col">
		<font color="red"><b>注：为保证您的合法权益，请如实填写您所遇到的情况。</b></font>
		</div>
	</div>
</div>
<script>
function send_to_ju_report() {
    var report_deal_id = $('#report_deal_id').val();	
    var report_comment = $('#report_comment').val();
    var report_user_email = $('#report_user_email').val();
    var report_reason = $('input[name="report_reason"]:checked').val();
    $.ajax({
			url: FTXIAER.root + "/?m=ju_reports&a=add",
			type: 'post',
			data: {report_deal_id: report_deal_id, report_comment: report_comment, report_user_email: report_user_email, report_reason: report_reason},
			success: function(d){
				$('em#report_prompt').empty();
				if(d == "1") {
					$('em#report_prompt').append('<span style="color:red">举报成功，感谢您的举报！请直接关闭本页，或者<a href="{:U('index/index')}">去首页</a>逛逛</span>');
				}else if(d == "2") {
					$('em#report_prompt').append("<font color='red'>请输入正确的邮箱地址</font>");
				}
			}
		});
	}

</script>