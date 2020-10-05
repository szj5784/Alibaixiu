// 获取最新评论
$.get('/comments/lasted', response => {
	const tpl_newComments = `
	{{each response}}
	<li>
	  <a href="javascript:;">
	    <div class="avatar">
	      <img src="{{$value.author.avatar}}" alt="">
	    </div>
	    <div class="txt">
	      <p>
	        <span>{{$value.author.nickName}}</span>{{$value.createAt.substr(0, 10)}}说:
	      </p>
	      <p>{{$value.content.substr(0, 10)}}</p>
	    </div>
	  </a>
	</li>
	{{/each}}`;
	$('#newCommentsBox').html(template.render(tpl_newComments, { response }));
})