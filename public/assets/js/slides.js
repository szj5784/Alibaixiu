// 获取链接下拉框的内容
$.get('/posts//szj/link', response => {
	$('#link').html(template('tpl-link', { response }));
})
// 添加轮播图片
$('#bannerForm').on('submit', function() {
	const formData = serializeToJson($(this));
	if (formData.image) {
		$.ajax({
			type: 'post',
			url: '/slides',
			data: formData,
			success: function() {
				location.reload();
			},
			error: function() {
				$('#info').slideDown().children('span').text('添加失败！');
			}
		})
	} else {
		$('#info').hide().slideDown().children('span').text('请选择轮播图！');
	}
	// 阻止表单默认提交
	return false;
})
// 上传轮播图文件
$('#image').on('change', function() {
	const formData = new FormData();
	formData.append('image', this.files[0]);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function(response) {
			$('#banner').prop('src', response[0].image).on('load', function() {
				$(this).hide().slideDown();
			})
			$('#hiddenImage').val(response[0].image);
		}
	})
})
// 获取轮播图列表
$.get('/slides', response => {
	$('#bannersBox').html(template('tpl-banners', { response }));
})
//删除轮播图片
$('#bannersBox').on('click', '.delete', function() {
	const id = $(this).attr('data-id');
	if (confirm('你确定要删除吗？')) {
		$.ajax({
			type: 'delete',
			url: `/slides/${id}`,
			success: function() {
				location.reload();
			}
		})
	}
})