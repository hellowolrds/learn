define(['jquery', 'val'], function ($) {

  // 表单验证
  $('#course_form').validate({
    // 在 表单提交的时候，验证！
    onSubmit: true,
    // 阻止表单提交
    sendForm: false,
    // 所有的表单元素 验证成功，会调用这个回调函数
    valid: function () {

      // 表单验证成功，执行提交操作
      $.ajax({
        url: '/api/course/create',
        type: 'post',
        data: {
          cs_name: $('#cs_name').val()
        },
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if( data.code === 200 ) {
            location.href = '../course/course_add_step1?cs_id=' + data.result.cs_id;
          }
        }
      });
    },
    // 表单元素验证失败执行的回调函数
    eachInvalidField: function () {
      this.parent().parent().addClass('has-error').removeClass('has-success');
    },
    // 表单元素验证成功执行的回调函数
    eachValidField: function () {
      this.parent().parent().addClass('has-success').removeClass('has-error');
    },
    // 验证描述信息
    description: {
      cs_name: {
        required: '课程名称为必填项'
      }
    }
  });
  
});