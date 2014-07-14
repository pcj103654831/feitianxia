<include file="public:header" />

<div class="subnav">
	<div class="content_menu ib_a blue line_x">
		<a class="add fb J_showdialog" href="javascript:void(0);" data-uri="{:U('plugin/link',array('action'=>'add'))}" data-title="添加链接" data-id="add" data-width="500" data-height="160"><em>添加链接</em></a>
	</div>
</div>


<div class="pad_lr_10" >
    
    <div class="J_tablelist table_list" data-acturi="{:U('plugin/ajax_edit',array('action'=>'link'))}">
    <table width="100%" cellspacing="0">
        <thead>
            <tr>
                <th width=25><input type="checkbox" id="checkall_t" class="J_checkall"></th>
                <th><span tdtype="order_by" fieldname="id">ID</span></th>
                <th align="left"><span data-tdtype="order_by" data-field="name">链接名称</span></th>
                <th align="left"><span data-tdtype="order_by" data-field="url">链接地址</span></th>
				<th align="left"><span data-tdtype="order_by" data-field="ordid">排序</span></th>
                <th width="40"><span data-tdtype="order_by" data-field="status">{:L('status')}</span></th>
                <th width="80">{:L('operations_manage')}</th>
            </tr>
        </thead>
    	<tbody>
            <volist name="list" id="val" >
            <tr>
                <td align="center">
                <input type="checkbox" class="J_checkitem" value="{$val.id}"></td>
                <td align="center">{$val.id}</td>
                <td align="left"><span data-tdtype="edit" data-field="name" data-id="{$val.id}" class="tdedit">{$val.name}</span></td>
                <td align="left"><span data-tdtype="edit" data-field="url" data-id="{$val.id}" class="tdedit">{$val.url}</span></td>
				<td align="left"><span data-tdtype="edit" data-field="ordid" data-id="{$val.id}" class="tdedit">{$val.ordid}</span></td>
                <td align="center"><img data-tdtype="toggle" data-id="{$val.id}" data-field="status" data-value="{$val.status}" src="__STATIC__/images/admin/toggle_<if condition="$val.status eq 0">disabled<else/>enabled</if>.gif" /></td>
                <td align="center">
					<a href="javascript:;" class="J_showdialog" data-uri="{:U('plugin/edit', array('action'=>'link','id'=>$val['id']))}" data-title="{:L('edit')} - {$val.name}"  data-id="edit" data-acttype="ajax" data-width="500" data-height="160">{:L('edit')}</a> | 
                    <a href="javascript:;" class="J_confirmurl" data-acttype="ajax" data-uri="{:U('plugin/delete', array('action'=>'link','id'=>$val['id']))}" data-msg="{:sprintf(L('confirm_delete_one'),$val['name'])}">{:L('delete')}</a>
					</td>
            </tr>
            </volist>
    	</tbody>
    </table>
    </div>
	<div class="btn_wrap_fixed">
    	<label><input type="checkbox" name="checkall" class="J_checkall">{:L('select_all')}/{:L('cancel')}</label>
    	<input type="button" class="btn" data-tdtype="batch_action" data-acttype="ajax" data-uri="{:U('plugin/delete',array('action'=>'link'))}" data-name="id" data-msg="{:L('confirm_delete')}" value="{:L('delete')}" />
    	<div id="pages">{$page}</div>
    </div>
</div>
<include file="public:footer" />
<script src="/static/js/jquery/plugins/listTable.js"></script>
<script>
$(function(){
	$('.J_tablelist').listTable();
});
</script>
</body>
</html>