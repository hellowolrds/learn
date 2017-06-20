define(['jquery', 'template', 'layer', 'region', 'form', 'uploadify', 'datepicker'], function ($, template, layer) {

  // 第一步，获取讲师个人资料
  $.get('/api/teacher/profile', function ( data ) {
    var html = template('person_tpl', data.result);
    $(".settings").html( html );
    $('.hometown').region({
      url: '/public/assets/jquery-region/region.json'
    });

    upload();
  });
  

  function upload() {

    $("#upfile").uploadify({
      width: 120,
      height: 120,
      fileObjName : 'tc_avatar',
      // 必须要指定
      swf: '/public/assets/uploadify/uploadify.swf',
      itemTemplate: '<span></span>',
      fileSizeLimit: '1MB',
      buttonText: ' ',
      uploader: '/api/uploader/avatar',
      onUploadSuccess: function (file, data, response) {
        data =  JSON.parse(data);
        // console.log(data);
        var path = data.result.path;

        $(".preview img").attr('src', path);
        $(".avatar img").attr('src', path);
      }

    });
  }







  $(".settings").on('submit', '#teacher_update', function () {
    
    var $this = $(this),
      tc_hometown = '';
        $('.hometown select').each(function () {
            tc_hometown += $(this).find('option:selected').text() + '|';
        });
        // console.log(tc_hometown);
        $this.ajaxSubmit({
            type: 'post',
            data: {tc_hometown: tc_hometown.slice(0, -1)},
            success: function (data) {
              console.log(data);
                if(data.code == 200) {
                    setTimeout(function () {
                      layer.msg('修改成功');
                    }, 500);
                }
            }
        });

    return false;
  });

   
});