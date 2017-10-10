jQuery(document).ready(function($){
  

  $("#signup-form").submit( function(eventObj) {
    $('#textarea-info').val($('#editor').html());
    return true;
  });
});

text = function(){
  console.log('text');
  console.log($('#editor').html());
  $('#textarea-info').val($('#editor').html());
}