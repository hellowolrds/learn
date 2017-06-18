define(['jquery', 'nprogress', 'template', 'layer','cookie'],
	function ($, NProgress, template, layer) {

	NProgress.start();

	NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	
	$("#exit").click(function () {
		// 询问是否要退出
		layer.confirm('您确定退出吗？', {
			btn: ['确定','取消'] //按钮
		}, function(){
			layer.msg('已经退出', {icon: 1});	
			$.ajax({
				url: '/api/logout',
				type: 'get',
				dataType: 'json',
				success: function (data) {
					if ( data.code === '200') {
						setTimeout(function () {
							location.href = "/index.php/index/login";
						}, 1500);
						
					}
				}
			});

		}, function(){
			
		});
		
	});


  // 退出事件
  if( location.pathname !== '/index.php/index/login' && !$.cookie('PHPSESSID') ) {
		location.href = '/index.php/index/login';
	}

		// 更换头像
	// var imgUrl = $.cookie('img'),
	// 	name = $.cookie("name");
	// $(".avatar>img").attr("src", imgUrl);
	// $(".profile>h4").text( name );
	var userInfo = $.cookie();

	var str = '<div class="avatar img-circle">'+
      			'<img src="{{img}}">'+
    				'</div>'+
   	 				'<h4>{{name}}</h4>';
	// 将个人信息进行渲染						
	var htmlStr = template.render(str, {
		name: userInfo.name,
		img: userInfo.img
	});		
	
	$("#profile").html(htmlStr);
})
