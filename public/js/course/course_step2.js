define(['jquery', 'template', 'layer', 'uploadify', 'jcrop'], function ($, template, layer) {

  var cs_id = getQueryString('cs_id');

  // 渲染页面
  render();

  // 渲染页面函数
  function render () {
    $.ajax({
      url: '/api/course/picture',
      type: 'get',
      dataType: 'json',
      data: {
        cs_id: cs_id
      },
      success: function ( data ) {
        if ( data.code ) {
          var html = template('pic_tpl', data.result);
          $('.steps').html(html);
          // 上传图片
          upload();
          if ( data.result.cs_cover_original ) {
            $("#jcrop_btn").prop('disabled', false);
          }
          
          //剪裁图片
          cutPic();
        }
      }
    });
  }
  
  // 剪裁图片的函数
  function cutPic () {
    var jcrop_api;
    // 给裁切按钮注册单击事件
    $("#jcrop_btn").on('click', function () {
      // 判断按钮的值
      switch ( $(this).val() ) {
        case '裁切图片':
          $(this).val('保存图片');
          $(".upfile_pic_perview > img").Jcrop({
            boxWidth: 400,
            aspectRatio: 2
          }, function () {
            jcrop_api = this;
            // 新建一个缩略图，修改了一下源码thumb:'.thumb'，添加的一个属性， thumb属性是将
            // 缩略图放到指定的位置。
            this.initComponent('Thumbnailer', {width: 240, height: 120, thumb:'.thumb'});
            this.newSelection();
            var height = this.ui.stage.height - 100;
            var width = this.ui.stage.width;
            this.setSelect([0, 50, width, height]);
          });
          
          break;
        case '保存图片':
          // 发送ajax请求，将坐标发送
          var x = $('#cropx').val(),
            y = $('#cropy').val(),
            w = $('#cropw').val(),
            h = $('#croph').val();
            
          $.ajax({
            url: '/api/course/update/picture',
            type: 'post',
            dataType: 'json',
            data: {
              cs_id: cs_id,
              x: x,
              y: y,
              w: w,
              h: h
            },
            success: function ( data ) {
              // console.log(data);
              if ( data.code === 200 ) {
                layer.msg("剪裁成功");
                setTimeout(function () {
                  location.href = "../course/course_add_step3"
                }, 1500);
              }
            }
          });
          break;
      }
    });
    
    $(".upfile_pic_perview").on('cropstart cropmove cropend', function (e, s, c) {
      $('#cropx').val(c.x);
      $('#cropy').val(c.y);
      $('#cropw').val(c.w);
      $('#croph').val(c.h);
    });
  }
  
  // 上传图片的函数
  function upload() {

   // 头像上传：
    $('#upfile_pic').uploadify({
      height: 30,
      width: 70,
      swf: '/public/assets/uploadify/uploadify.swf',
      uploader: '/api/uploader/cover',
      method: 'post',
      buttonClass: 'btn btn-success btn-sm', 
      buttonText: '选择图片',
      formData: {
        cs_id: cs_id
      },
      fileObjName: 'cs_cover_original',
      // fileTypeDesc : 'Any old file you want...',
      // 限制 上传文件的格式（后缀名）
      fileTypeExts: '*.jpg; *.gif; *.png',
      // 上传模板
      itemTemplate: '<span></span>',
      // 上传文件大小限制
      fileSizeLimit: '1MB',

      // 文件上传成功的回调函数
      onUploadSuccess: function (file, data, response) {
        // file 被选择图片的信息
        // data 服务端返回的数据
        // reponse 是一个布尔值
        data = JSON.parse(data);
        var path = data.result.path;
        // console.log(file);
        $('.upfile_pic_perview').empty().html('<img src='+ path +' />');
        // 让按钮可用
        $('#jcrop_btn').prop('disabled', false);
        // 裁切图片
        $("#jcrop_btn").val('裁切图片');
        
      }
    });  
  }

  
  // 获取到 url 参数的函数
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
  }
  
});