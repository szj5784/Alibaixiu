// 获取随机推荐
$.get('/posts/random', response => {
	const tpl_random = `
	{{each response}}
	<li>
	  <a href="detail.html?id={{@$value._id}}">
	    <p class="title">{{$value.title}}</p>
	    <p class="reading">阅读({{$value.meta.views}})</p>
	    <div class="pic">
	      <img src="{{$value.thumbnail}}" alt="">
	    </div>
	  </a>
	</li>
	{{/each}}`;
	$('#randomBox').html(template.render(tpl_random, { response }));
})