// 添加分类
$('#categoryForm').on('submit', function() {
	const formData = serializeToJson($(this));
	if ($(this).find('button').text() == '添加') {
		$.ajax({
			type: 'post',
			url: '/categories',
			data: formData,
			success: function() {
				location.reload();
			},
			error: function() {
				$('#info').slideDown().children('span').text('添加失败！');
			}
		})
	} else {
		const id = $(this).find('button').attr('data-id');
		$.ajax({
			type: 'put',
			url: `/categories/${id}`,
			data: formData,
			success: function() {
				location.reload();
			},
			error: function() {
				$('#info').slideDown().children('span').text('修改失败！');
			}
		})
	}
	// 阻止表单默认提交
	return false;
})
// 查询分类列表
$.get('/categories', response => {
	$('#categoriesBox').html(template('tpl-categories', { response }));
})
// 根据 id 查询分类
$('#categoriesBox').on('click', '.edit', function() {
	const id = $(this).attr('data-id');
	$.get(`/categories/${id}`, response => {
		$('#categoryForm').html(template('tpl-editCategory', response));
	})
})
// 根据 id 删除分类
$('#categoriesBox').on('click', '.delete', function() {
	const id = $(this).siblings().attr('data-id');
	if (confirm('你确定要删除吗？')) {
		$.ajax({
			type: 'delete',
			url: `/categories/${id}`,
			success: function() {
				location.reload();
			},
			error: function() {
				$('#info').slideDown().children('span').text('删除失败！');
			}
		})
	}
})
// 批量删除
$('#deleteMany').on('click', function() {
	let idArr = [];
	$('.delSelected:checked').each((i, domEle) => {
		const id = $(domEle).parent().siblings('.operator').children('.edit').attr('data-id');
		idArr.push(id);
	});
	const id = idArr.join('-');
	if (confirm('你确定要删除吗？')) {
		$.ajax({
			type: 'delete',
			url: `/categories/${id}`,
			success: function() {
				location.reload();
			},
			error: function() {
				$('#info').slideDown().children('span').text('删除失败！');
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
$('#categoriesBox').on('change', '.delSelected', function() {
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