$('#settingForm').on('submit', function() {
	const formData = serializeToJson($(this));
	formData.comment = $('#comment').prop('checked');
	formData.review = $('#review').prop('checked');
	$.ajax({
		type: 'post',
		url: '/settings',
		data: formData,
		success: function() {
			location.reload();
		},
		error: function() {
			$('#info').hide().slideDown().children('span').text('保存失败！');
		}
	})
	// 阻止表单默认提交
	return false;
})
// 提交网站图标
$('#settingForm').on('change', '#logo', function() {
	const formData = new FormData();
	formData.append('logo', this.files[0]);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function(response) {
			$('#logoImg').prop('src', response[0].logo);
			$('#hiddenLogo').val(response[0].logo);
		}
	})
})
// 获取网站配置
$.get('/settings', response => {
	$('#settingForm').html(template('tpl-settings', response));
})