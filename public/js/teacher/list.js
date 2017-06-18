define(['jquery', 'template', 'layer', 'bootstrap'], function ($, template, layer) {
  //通过ajax发送ajax请求
  // $.get('/api/teacher',function (data) {
  //   console.log(data);
  //   if ( data.code == 200 ) {
  //     var str = template("teacher_list_tpl", {list: data.result});
  //     $("#teacher-list").html(str);
  //   }
  // });
  var index;

  $.ajax({
    url: '/api/teacher',
    type: 'get',
    dataType: 'json',
    beforeSend: function () {
      index = layer.load(0, {shade: false}); 
      console.log(index);
    },
    success: function (data) {
      if ( data.code == 200 ) {
        var str = template("teacher_list_tpl", {list: data.result});
        $("#teacher-list").html(str);  
      }
    },
    complete: function () {
      layer.close(index);
    }

  });
  
  //单击显示模态框,通过事件委托的方式,因为表格中数据是通过ajax异步获取的数据
  $("#teacher-list").on('click', '.preview', function () {

    var tc_id = $(this).parent().data('id');
    $.get('/api/teacher/view?tc_id=' + tc_id, function (data) {

      var str = template('teacher_view_tpl', data.result);
      $("#teaInfo").html(str);
      $("#teacherModal").modal();
    });
  });

  // 登录状态切换

  $("#teacher-list").on('click', '.status', function () {
    var status = $(this).parent().data('status'),
      $this = $(this),
      tc_id = $(this).parent().data('id');
    $.ajax({
      url: '/api/teacher/handle',
      type: 'post',
      data: {
        tc_id: tc_id,
        tc_status: status
      },
      datatype: 'json',
      success: function (data) {
        if ( data.code ) {
          status = data.result.tc_status;
          status == 0 ? $this.text('注销') : $this.text("启用");
          $this.parent().data('status', status);
        }
      }
    });
  });
  
});