<div class="dialog_content">
<form id="info_form" action="{:u('plugin/edit',array('action'=>'link'))}" method="post">
<div class="common-form">
	<table width="100%" cellpadding="2" cellspacing="1" class="table_form">
        <tr>
			<th width="100">链接名称 :</th>
			<td><input type="text" name="name" id="name" class="input-text" size="30" value="{$info.name}"></td>
		</tr>
        <tr>
			<th width="100">链接地址 :</th>
			<td><input type="text" name="url" id="url" class="input-text" size="30" value="{$info.url}"></td>
		</tr>
        <tr>
			<th width="100">排序值 :</th>
			<td><input type="text" name="ordid" id="ordid" class="input-text" size="10" value="{$info.ordid}"></td>
		</tr>
		<tr>
			<th>{:L('enabled')} :</th>
			<td>
				<input type="radio" name="status" class="radio_style" value="1" <if condition="$info.status eq 1"> checked="checked"</if>> {:L('yes')} 
				<input type="radio" name="status" class="radio_style" value="0" <if condition="$info.status eq 0"> checked="checked"</if>> {:L('no')}
			</td>
		</tr>
	</table>
    <input type="hidden" name="id" value="{$info.id}" />
</div>
</form>
</div>
<script src="__STATIC__/js/fileuploader.js"></script>
<script type="text/javascript">
var check_name_url = "{:U('plugin/ajax_check_name',array('action'=>'link','id'=>$info['id']))}";
$(function(){
	$.formValidator.initConfig({formid:"info_form",autotip:true});
	$("#name").formValidator({onshow:"请填写链接名称",onfocus:"请填写链接名称"}).inputValidator({min:1,onerror:"请填写链接名称"}).ajaxValidator({
	    type : "get",
		url : check_name_url,
		datatype : "json",
		async:'false',
		success : function(result){	
            if(result.status == 0){
                return false;
			}else{
                return true;
			}
		},
		buttons: $("#dosubmit"),
		onerror : "链接名称已经存在",
		onwait : "正在验证"
	}).defaultPassed();
	$("#cate_id").formValidator({onshow:"请选择分类",onfocus:"请选择分类"}).inputValidator({min:1,onerror:"请选择分类"}).defaultPassed();
	$("#url").formValidator({onshow:"请填写链接地址",onfocus:"请填写链接地址"}).inputValidator({min:1,onerror:"请填写链接地址"}).defaultPassed();
	
	$('#info_form').ajaxForm({success:complate,dataType:'json'});
	function complate(result){
		if(result.status == 1){
			$.dialog.get(result.dialog).close();
			$.ftxia.tip({content:result.msg});
			window.location.reload();
		} else {
			$.ftxia.tip({content:result.msg, icon:'alert'});
		}
	}
});
</script>