define(['jquery', 'template', 'ckeditor', 'layer', 'form'], function ($, template, CKEDITOR, layer) {
  
  // 设置左侧菜单高亮
  var nav = $(".navs").find("[href = '../course/course_add']").addClass("active");
  nav.closest('ul').show();
  nav.closest('ul').parent('li').find(".arrow").addClass("fa-angle-down");
  
  var cs_id = getQueryString('cs_id');
  //调用渲染函数
  render();
  // 获取二级目录
  getChild();
  // 更新页面
  update();


  // 更新页面
  function update() {
    $(".steps").on('submit', 'form', function () {

      $(this).ajaxSubmit({
        url: '/api/course/update/basic',
        type: 'post',
        dataType: 'json',
        success: function (data) {
           if ( data.code === 200 ) {
              setTimeout(function () {
                layer.msg("更新成功");
              }, 500);
                
              setTimeout(function () {
                location.href="../course/course_add_step2?cs_id=" + cs_id;
              }, 1000);
              
           } 
        }
      });

      return false;

    });
  }

  // 渲染页面
  function render () {
 
   $.ajax({
     url: '/api/course/basic?cs_id='+ cs_id,
     type: 'get',
     dataType: 'json',
     success: function ( data ) {
        if ( data.code === 200 ) {
          var html = template('course_basic_tpl', data.result);
          $(".steps").html(html);
          //设置富文编辑
          CKEDITOR.replace('cs_brief',{
            skin: 'moono-lisa'});
          // CKEDITOR.instances.tc_introduce.updateElement();

          //设置默认选中项
          $("#teacher").val(data.result.cs_tc_id);
          $("#top_cal").val(data.result.cs_cg_pid);
          $("#cg_child").val(data.result.cs_cg_id);

        }
     }
   });


  }

  // 二级分类页面
  function getChild() {

    // 定义一个option模版
    var opts = "{{each list}}"
      + "<option value='{{$value.cg_id}}'>{{$value.cg_name}}</option>"
      + "{{/each}}";

    $(".steps").on('change', '#top_cal', function () {
      var cg_id = $(this).val();
      $.ajax({
        url: '/api/category/child',
        data: {
          cg_id: cg_id
        },
        success: function (data) {
          if ( data.code === 200 ) {
            var html = template.render(opts, {list: data.result});
            console.log(html);
            $("#cg_child").html(html);
          }
        }
      });
    });
  }


   // 获取到 url 参数的函数
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
  }
});