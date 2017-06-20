define(['jquery', 'nprogress', 'template', 'layer','cookie'],
	function ($, NProgress, template, layer) {

	NProgress.start();

	NProgress.done();

	var index;

	var pathArr = location.pathname.split("/"),
		path = pathArr[pathArr.length-2] + '/' + pathArr[pathArr.length-1];

	//左侧菜单高亮显示
	var nav = $(".navs").find("[href $= '"+ path +"']");
	nav.addClass("active");
	// 左侧二级菜单默认显示
	// closest() 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
	nav.closest('ul').show();
	nav.closest('ul').parent('li').find(".arrow").addClass("fa-angle-down");

	// 处理加载状态
	$(document)
		.ajaxStart(function() {
			index = layer.load(0, {shade: false}); 
		})
		.ajaxStop(function() {
			setTimeout(function() {
				 layer.close(index);
			}, 300);
		});

	$('.navs ul').prev('a').on('click', function (e) {
	
		$(this).next().slideToggle();
		$(this).find(".arrow").toggleClass("fa-angle-down");

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
		img: userInfo.img || '/public/images/default.png'
	});		
	
	$("#profile").html(htmlStr);
})
