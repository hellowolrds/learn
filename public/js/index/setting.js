define(['jquery', 'template', 'region', 'form'], function ($, template) {

  // 第一步，获取讲师个人资料
  $.get('/api/teacher/profile', function ( data ) {
    var html = template('person_tpl', data.result);
    $(".settings").html( html );
    $('.hometown').region({
      url: '/public/assets/jquery-region/region.json'
    });

  });

  $(".settings").on('click', '#teacher_update', function () {
    
    var $this = $(this),
      tc_hometown = '';
      console.log($this);
        $('.hometown select').each(function () {
            tc_hometown += $(this).find('option:selected').text() + '|';
        });
        // console.log(tc_hometown);
        $this.ajaxSubmit({
            type: 'post',
            data: {tc_hometown: tc_hometown.slice(0, -1)},
            success: function (info) {
                if(info.code == 200) {
                    alert('更新成功!');
                }
            }
        });

    return false;
  });

   
});