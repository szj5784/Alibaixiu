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
// 文章搜索 **************
$('.search form').on('submit', function() {
	const formData = serializeToJson($(this));
	const key = formData.key;
	location.href = `search.html?key=${key}`;
	// 阻止表单默认提交
	return false;
})