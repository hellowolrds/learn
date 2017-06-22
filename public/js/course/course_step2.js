define(['jquery', 'template', 'uploadify', 'jcrop'], function ($, template) {

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
        }
      }
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
         //裁切图片
         var jcrop_api;
         $(".upfile_pic_perview img").Jcrop({
           aspectRatio: 2 ,
           setSelect: [ 175, 100, 400, 300 ],
           boxWidth: 400
         }, function () {
            jcrop_api = this;
            this.initComponent('Thumbnailer', { width: 240, height: 120, thumb: '.thumb'});

         });

       

         picCut();

        //  预览裁切

      }
    });  
  }



  // 图片裁切
  function picCut() {
    
    $(".steps").on('click', '#jcrop_btn', function () {
        alert("保存图片");
    });
   
  }

     // 获取到 url 参数的函数
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
  }
});