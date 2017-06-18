define(['jquery', 'template'], function ($, template) {

  // 第一步，获取讲师个人资料
  $.get('/api/teacher/profile', function ( data ) {
    var html = template('person_tpl', data.result);
    $(".settings").html( html );
  });
  
});