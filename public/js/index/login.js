requirejs(['jquery','validate', 'cookie'],function ($) {
  // 将表单进行验证
  $("#loginForm").validate({
        rules: {
          tc_name: {
            required: true,
            minlength: 4
          },
          tc_pass: {
            required: true,
            minlength: 5
          }
        }
      });

	$("#loginForm").on('submit', function () {
//        序列化表单
        var params = $(this).serialize(),
            loginUrl = '/api/login?' + params;
        $.ajax({
          url: loginUrl,
          type: 'GET',
          dataType: 'json',
          success: function ( data ) {
            var tc_name = data.result.tc_name;
            var tc_img = data.result.tc_avatar;
            if ( data.code == 200 && tc_name != "" ) {
              location.href = "/index.php/index/index";
              $.cookie('img', tc_img, {expires: 1, path: '/'});
              $.cookie('name', tc_name, {expires: 1, path: '/'});
            }
          }
        });
        
        return false;
      });

});

