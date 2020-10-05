// json化表单参数
function serializeToJson(form) {
	const arr = form.serializeArray();
	let o = {};
	arr.forEach(item => {
		o[item.name] = item.value;
	})
	return o;
}
// 获取地址栏参数
function getUrlParams(name) {
	const paramsArr = location.search.substr(1).split('&');
	let o = {};
	paramsArr.forEach(value => {
		const arr = value.split('=');
		o[arr[0]] = arr[1];
	})
	return o[name];
}
// 格式化日期
function dateFormat(date) {
	const dates = date.substr(0, 10).split('-').join('/');
	const time = date.substr(11, 5);
	return dates + ' ' + time;
}
template.defaults.imports.dateFormat = dateFormat;
// 登录退出
$('#loginOut').on('click', function() {
	const isConfirm = confirm('你真的要退出吗？');
	if (isConfirm) {
		$.post('/logout', response => {
			window.location.href = 'login.html';
		})
	}
})
// 修改密码
$('#modifyPwdForm').on('submit', function() {
	const formData = serializeToJson($(this));
	if (formData.userPass.trim().length == 0 || formData.newPass.trim().length == 0) {
		$('#info').slideDown().children('span').text('密码不能为空！');
	} else if (formData.confirmPass != formData.newPass) {
		$('#info').slideDown().children('span').text('两次输入的密码不一致！');
	} else {
		$.ajax({
			type: 'put',
			url: '/users/password',
			data: formData,
			success: function(response) {
				location.href = 'login.html';
			},
			error: function(xhr) {
				const errMsg = JSON.parse(xhr.responseText).message;
				$('#info').slideDown().children('span').text(errMsg);
			}
		})
	}
	// 阻止表单默认提交
	return  false;
})
// 展示登录用户信息
$.get(`/users/${userId}`, response => {
	$('.profile .avatar').prop('src', response.avatar ? response.avatar : '../assets/img/default.png');
	$('.profile .name').text(response.nickName);
	// 判断用户身份
	if (response.role == 'normal') {
		location.href = '../index.html';
	}
})
// 去展示页面
$('.navbar-btn').on('click', function() {
	location.href = '../index.html';
})