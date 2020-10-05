// 根据分类获取文章列表
// 获取类别id
const id = getUrlParams('id');
$.get(`/posts/category/${id}`, response => {
	const category = response[0].category.title;
	$('#listBox').html(template('tpl-list', { response, category }));
})