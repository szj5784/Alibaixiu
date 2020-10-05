// 查询分类列表
$.get('/categories', response => {
	const categoriesData = response;
	$('#category').html(template('tpl-categories', { categoriesData }));
})
// 查询文章列表
function load(data) {
	$.get('/posts', data, response => {
		console.log(response);
		const articlesData = response.records;
		const page = response.page;
		$('#articlesBox').html(template('tpl-articles', { articlesData, page }));
		// 分页模板
		$('ul.pagination').html(template('tpl-pagination', { response }));
	})
}
load();
// 分页
let category = '';
let state = '';
$('ul.pagination').on('click', 'a', function() {
	const page = $(this).attr('data-page');
	const data = { page };
	if (state) data.state = state;
	if (category) data.category = category;
	load(data);
})
// 筛选
$('#screenForm').on('submit', function() {
	const formData = serializeToJson($(this));
	state = formData.state;
	category = formData.category;
	if (!formData.state) delete formData.state;
	if (!formData.category) delete formData.category;
	load(formData);
	// 阻止表单默认提交
	return false;
})
// 根据 id 删除文章
$('#articlesBox').on('click', '.delete', function() {
	const id = $(this).attr('data-id');
	const page = $(this).attr('data-page');
	const data = { page };
	if (state) data.state = state;
	if (category) data.category = category;
	$.ajax({
		type: 'delete',
		url: `/posts/${id}`,
		success: function() {
			load(data);
		}
	})
})