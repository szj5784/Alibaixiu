// 轮播图数据展示
$.get('/slides', response => {
	$('#slidesBox').html(template('tpl-banners', { response }));
	let html = '';
	response.forEach(() => {
		html += '<span></span>';
	})
	$('.swipe .cursor').html(html).children().eq(0).addClass('active');
	// 轮播图特效
	var swiper = Swipe(document.querySelector('.swipe'), {
	  auto: 3000,
	  transitionEnd: function (index) {
	    // index++;
	    $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
	  }
	});
	// 上/下一张
	$('.swipe .arrow').on('click', function () {
	  var _this = $(this);
	  if(_this.is('.prev')) {
	    swiper.prev();
	  } else if(_this.is('.next')) {
	    swiper.next();
	  }
	})
})
// 获取最新发布文章
$.get('/posts/lasted', response => {
	$('#latestBox').html(template('tpl-latest', { response }));
})