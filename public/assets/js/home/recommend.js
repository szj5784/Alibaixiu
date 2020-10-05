// 热门推荐
$.get('/posts/recommend', response => {
	// 这里使用模板字符串的原因是：模板字符串可以换行
	const tpl_recommend = `
	{{each response}}
	<li>
	  <a href="detail.html?id={{@$value._id}}">
	    <img src="{{$value.thumbnail}}">
	    <span>{{$value.title}}</span>
	  </a>
	</li>
	{{/each}}`;
	const html = template.render(tpl_recommend, { response });
	$('#recommendBox').html(html);
})