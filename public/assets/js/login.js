$('#loginBtn').on('click', function() {
	const email = $('#email').val();
	const password = $('#password').val();
	if (email.trim().length == 0 || password.trim().length == 0) {
		$('#errorInfo').slideDown().children('span').text('用户名或密码为空！');
		return;
	} else {
		$.ajax({
			type: 'post',
			url: '/login',
			data: {
				email,
				password
			},
			success: function(response) {
				if (response.status == 0) 
				return $('#errorInfo').slideDown().children('span').text('账号未激活！');
				if (response.role == 'admin') {
					location.href = 'index.html';
				} else {
					location.href = '../index.html';
				}
			},
			error: function(xhr) {
				$('#errorInfo').slideDown().children('span').text('用户名或密码错误！');
			}
		})
	}
})
$('#email').on('blur', function() {
	const email = $(this).val();
	if (email) {
		$.get(`/users/szj/${email}`, response => {
			$('img.avatar').prop('src', response);
		})
	}
})