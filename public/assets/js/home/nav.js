$.get('/categories', response => {
	const tpl_categories = `
	{{each response}}
	<li><a href="list.html?id={{@$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
	{{/each}}`;
	$('#hd_nav').html(template.render(tpl_categories, { response }));
	$('#top_nav').html(template.render(tpl_categories, { response }));
})