<notempty name="ad_list">
<div class="box-play">
	<div id="img-list">
		<ul class="img-list">
		<volist name="ad_list" id="ad" key="i">
			<li <if condition="$i eq 1">class="cur" </if>style="background:url('{:attach($ad['content'],'advert')}') 49.99% top no-repeat;"><a class="{:C('ftx_site_width')}" href="{$ad.url}" target="_blank" hidefocus="true"  alt="{$ad.desc}"></a></li>
		</volist>
			 
		</ul>
		<ul class="count-num"></ul>
		<div class="{:C('ftx_site_width')} bc pr">
			<i class="ban-close" id="close_play" title="关闭幻灯片"></i>
		</div>
	</div>
	<div class="{:C('ftx_site_width')} bc pr">
		<i class="ban-open" id="open_play" title="打开幻灯片"></i>
	</div>
</div>
 
</notempty>
