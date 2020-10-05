// 获取搜索关键字
const key = getUrlParams('key');
// 文章搜索 **************
$.get(`/posts/search/${key}`, response => {
	$('#searchListBox').html(template('tpl-searchList', { response }));
})