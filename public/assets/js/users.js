$('#userForm').html(template('tpl-userForm'));
// 表单提交发送请求
$('#userForm').on('submit', function() {
	const formData = $(this).serialize();
	if ($('#submitBtn').text() == '添加') {
		$.ajax({
			type: 'post',
			url: '/users',
			data: formData,
			success: function() {
				location.reload();
			},
			error: function() {
				$('#errorInfo').slideDown(function() {
					setTimeout(() => {
						$(this).slideUp();
					}, 3000);
				}).children('span').text('添加失败！');
			}
		})
	} else {
		const id = $('#submitBtn').attr('data-id');
		$.ajax({
			type: 'put',
			url: `/users/${id}`,
			data: formData,
			success: function() {
				location.reload();
			},
			error: function() {
				$('#errorInfo').slideDown(function() {
					setTimeout(() => {
						$(this).slideUp();
					}, 3000);
				}).children('span').text('修改失败！');
			}
		})
	}
	// 阻止表单默认提交
	return false;
})
// 提交二进制文件
// 这里也要用事件委派
$('#userForm').on('change', '#avatar', function() {
	// files是dom对象下面的方法, 不能用jquery对象去使用它
	let formData = new FormData();
	formData.append('avatar', this.files[0]);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型，因为请求参数的类型在formData中已经设置了
		contentType: false,
		success: function(response) {
			$('#preview').prop('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar);
		}
	})
})
// 获取用户列表
$.get('/users', response => {
	$('#usersBox').html(template('tpl-users', { response }));
})
// 根据 id 查询用户
// 这里需要用到事件委派
$('#usersBox').on('click', '.edit', function() {
	const id = $(this).attr('data-id');
	$.get(`/users/${id}`, response => {
		$('#userForm').html(template('tpl-userForm', { response }));
	})
})
// 根据 id 删除用户
$('#usersBox').on('click', '.delete', function() {
	const id = $(this).siblings().attr('data-id');
	const isConfirm = confirm('你确定要删除吗？');
	if (isConfirm) {
		$.ajax({
			type: 'delete',
			url: `/users/${id}`,
			success: function(response) {
				location.reload();
			},
			error: function() {
				$('#errorInfo').slideDown(function() {
					setTimeout(() => {
						$(this).slideUp();
					}, 3000);
				}).children('span').text('删除失败！');
			}
		})
	}
})
// 批量删除用户
$('#deleteMany').on('click', function() {
	let idArr = [];
	$('.delSelected:checked').each((i, domEle) => {
		const id = $(domEle).parent().siblings('.operator').children('.edit').attr('data-id');
		idArr.push(id);
	})
	const id = idArr.join('-');
	const isConfirm = confirm('你确定要删除吗？');
	if (isConfirm) {
		$.ajax({
			type: 'delete',
			url: `/users/${id}`,
			success: function(response) {
				location.reload();
			},
			error: function() {
				$('#errorInfo').slideDown(function() {
					setTimeout(() => {
						$(this).slideUp();
					}, 3000);
				}).children('span').text('删除失败！');
			}
		})
	}
})
// 全选按钮
$('#checkAll').on('change', function() {
	const status = $(this).prop('checked');
	if (status) {
		$('#deleteMany').slideDown();
	} else {
		$('#deleteMany').slideUp();
	}
	$('.delSelected').prop('checked', status);
})
$('#usersBox').on('change', '.delSelected', function() {
	if ($('.delSelected:checked').length != 0) {
		$('#deleteMany').slideDown();
	} else {
		$('#deleteMany').slideUp();
	}
	$('.delSelected').each((i, domEle) => {
		if (!$(domEle).prop('checked')) {
			$('#checkAll').prop('checked', false);
			// 跳出整个循环，相当于break; --- return true; 跳出当前循环，相当于continue;
			return false;
		}
		$('#checkAll').prop('checked', true);
	})
})