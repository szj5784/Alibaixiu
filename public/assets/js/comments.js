// 获取评论列表
function load(page) {
	$.get('/comments', { page }, response => {
		console.log(response);
		$('#commentsBox').html(template('tpl-comments', response));
		$('ul.pagination').html(template('tpl-pagination', response));
	})
}
load();
// 分页
$('ul.pagination').on('click', 'a', function() {
	const page = $(this).attr('data-page');
	load(page);
})
// 更改评论状态
$('#commentsBox').on('click', '.shift', function() {
	const id = $(this).attr('data-id');
	const page = $(this).attr('data-page');
	let state = 1;
	if ($(this).text() == '驳回') state = 0;
	$.ajax({
		type: 'put',
		url: `/comments/${id}`,
		data: { state },
		success: function(response) {
			load(page);
		}
	})
})
// 根据 id 删除评论
$('#commentsBox').on('click', '.delete', function() {
	const id = $(this).siblings().attr('data-id');
	const page = $(this).siblings().attr('data-page');
	if (confirm('你确定要删除吗？')) {
		$.ajax({
			type: 'delete',
			url: `/comments/${id}`,
			success: function() {
				load(page);
			}
		})
	}
})
/* // 添加评论
if (confirm('添加')) {
	$.post('/comments', {content: '文章很精彩', post: '5f75795c4729f9346cc26545', state: '0'}, response => {
		console.log(response);
	})
} */