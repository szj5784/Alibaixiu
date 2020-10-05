// 根据 id 获取文章
// 获取文章id
const id = getUrlParams('id');
// 获取配置信息
let review;
$.get(`/posts/${id}`, response => {
	response.isLogin = isLogin;
	$('#articleBox').html(template('tpl-article', response));
})
// 提交评论
if (isLogin) {
	$('#commentForm').on('submit', function() {
		const formData = serializeToJson($(this));
		formData.post = id;
		formData.state = 1;
		if (review) formData.state = 0;
		$.ajax({
			type: 'post',
			url: '/comments',
			data: formData,
			success: function() {
				location.reload();
			},
			error: function(xhr) {
				const errMsg = JSON.parse(xhr.responseText).message;
				$('#errorInfo').slideDown().children('span').text(errMsg);
			}
		})
		// 阻止表单默认提交
		return false;
	})
} else {
	$('#commentBox').html('<h2><a href="/admin/login.html" style="color: #000;">去登录>></a></h2>');
}
// 文章点赞 *************
$('#articleBox').on('click', '#like', function() {
	$.post(`/posts/fabulous/${id}`, response => {
		$(this).css('color', 'red');
	})
})
// 获取网站配置信息
$.get('/settings', response => {
	review = response.review;
	if (!response.comment) $('#commentBox').hide();
})