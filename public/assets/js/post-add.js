// 查询分类列表
$.get('/categories', response => {
	const categoriesData = response;
	$('#category').html(template('tpl-categories', { categoriesData }));
})
// 添加article
$('#articleForm').on('submit', function() {
	let formData = serializeToJson($(this));
	const id = $(this).find('button').attr('data-id');
	if (!formData.createAt) {
		delete formData.createAt;
	}
	if (!id) {
		// 添加
		$.ajax({
			type: 'post',
			url: '/posts',
			data: formData,
			success: function() {
				location.href = 'posts.html';
			},
			error: function() {
				$('#info').slideDown().children('span').text('添加失败！');
			}
		})
	} else {
		// 修改
		$.ajax({
			type: 'put',
			url: `/posts/${id}`,
			data: formData,
			success: function() {
				location.href = 'posts.html';
			},
			error: function() {
				$('#info').slideDown().children('span').text('修改失败！');
			}
		})
	}
	// 阻止表单默认提交
	return false;
})
// article封面上传
$('#articleForm').on('change', '#feature', function() {
	let formData = new FormData();
	formData.append('cover', this.files[0]);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function(response) {
			$('img.thumbnail').prop('src', response[0].cover).on('load', function() {
				$(this).hide().slideDown();
			});
			$('#hiddenThumbnail').val(response[0].cover);
		}
	})
})
// 获取传过来的id
const id = getUrlParams('id');
if (id) {
	$.get(`/posts/${id}`, response => {
		// 查询分类列表
		$.get('/categories', categories => {
			response.categories = categories;
			$('#articleForm').html(template('tpl-editArticle', response));
		})
	})
}