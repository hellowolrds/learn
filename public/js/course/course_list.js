/**
 * Created by chen on 2017/6/23.
 */
define(['jquery', 'template', 'lazyload'], function ($, template) {
  // $(".navs").find("[href = '../course/course_list']").addClass("active");
  // 获取数据
  $.get('/api/course', function (data) {
    var html = template('course_list_tpl', data.result);
    $("#course_list").html(html);
    $('.lazy').lazyload();
  });
});
