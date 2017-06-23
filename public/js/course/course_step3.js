/**
 * Created by chen on 2017/6/23.
 */
define(['jquery', 'template', 'bootstrap', 'form'], function ($, template) {
  // 左侧菜单默认显示
  var nav = $(".navs").find("[href = '../course/course_add']").addClass("active");
  nav.closest('ul').show();
  nav.closest('ul').parent('li').find(".arrow").addClass("fa-angle-down");
  
  
  var cs_id = getQueryString('cs_id');
  
  // 渲染页面
  render();
  
  // 给添加按钮注册事件
  $(".steps").on("click", ".course_add", function () {
    var html = template('lesson_tpl', {
      // 添加课程时长
      url: '/api/course/chapter/add',
      ct_cs_id: cs_id,
      title: '课时添加',
      btnText: '添加'
    });
    
    $("#lesson").html(html);
    $("#lesson").modal();
  });
  // 给模态框添加一个单击事件
  $("#lesson").on('click', '.btn_add_update', function () {
    var val = $("[name='ct_is_free']").prop('checked') ? '1' : '0';
    $(".upade_add_form").ajaxSubmit({
      type: 'post',
      dataType: 'json',
      data: {
        ct_is_free: val
      },
      success: function (data) {
        if ( data.code === 200 ) {
          render();
          $("#lesson").modal('hide');
        }
      }
    });
  });
  
  $(".steps").on('click', '.btn_modify', function () {
    var ct_id = $(this).parent().data('id');
    $.get('/api/course/chapter/edit?ct_id=' + ct_id, function (data) {
      
      if ( data.code === 200 ) {
        data.result.url = '/api/course/chapter/modify';
        data.result.title = '课时编辑';
        data.result.btnText = "编 辑";
        data.result.ct_id = ct_id;
        var html = template('lesson_tpl', data.result);
        // console.log(html);
        $("#lesson").html(html);
        $("#lesson").modal();
      }
    });
    
    
    
  });
  
  //渲染页面
  function render() {
    $.ajax({
      url: '/api/course/lesson',
      type: 'get',
      dataType: 'json',
      data: {
        cs_id: cs_id
      },
      success: function ( data ) {
        if ( data.code ) {
          var html = template('course_lesson_tpl', data.result);
          $('.steps').html(html);
        }
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