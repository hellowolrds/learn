define(['jquery', 'template', 'layer', 'ckeditor', 'region', 'validate','form', 'uploadify', 'datepicker'], 
function ($, template, layer, CKEDITOR) {

  // 第一步，获取讲师个人资料
  $.get('/api/teacher/profile', function ( data ) {
    var html = template('person_tpl', data.result);
    $(".settings").html( html );
    $('.hometown').region({
      url: '/public/assets/jquery-region/region.json'
    });

    upload();
    
    CKEDITOR.replace('tc_introduce');
    CKEDITOR.instances.tc_introduce.updateElement();

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
        $.cookie('img', path, {expires: 1, path: '/'});
      }

    });
  }

  // 再提交前，先进行表单的校验

  function jiaoyan () {
    $.validator.addMethod("isMobile", function(value, element) {
      var length = value.length;
      var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
      return this.optional(element) || (length == 11 && mobile.test(value));
	  }, "请正确填写您的手机号码");
    var validator = $("#teacher_update").validate({
      rules: {
        tc_roster: {
          required: true,
          minlength: 2,
          maxlength: 8
        },
        tc_birthday: {
          required: true,
          date: true
        },
        tc_cellphone: {
          required: true,
          isMobile: true
        },
        tc_email: {
          required: true,
          email: true
        },
        tc_join_date: {
          required: true,
          date: true
        }
      },
      messages: {
        tc_roster: {
          required: "请输入您的昵称",
          minlength: "昵称必需由两个字母组成"
        },
        tc_birthday: {
          required: "请输入您的生日",
          date: "输入正确格式的生日"
        },
        tc_cellphone: {
          required: "请输入您的手机号码"
        },
        tc_email: {
          required: "请输入您的邮箱",
          email: "输入正确的邮箱格式"
        },
        tc_join_date: {
          required: "请输入您的入职日期",
          date: "输入的日期格式不正确"
        }

      }
    });
    return validator.form();
  }



  $(".settings").on('submit', '#teacher_update', function () {
    
    var $this = $(this),
      tc_hometown = '';
        $('.hometown select').each(function () {
            tc_hometown += $(this).find('option:selected').text() + '|';
        });
        // console.log(tc_hometown);
        if ( jiaoyan () ) {
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

        }
      
    return false;
  });

   
});