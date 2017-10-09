jQuery(document).ready(function($){
  $('#editor').html($('#textarea-info').val());
  var quill = new Quill('#editor', {
    theme: 'snow'
  });

  $("#signup-form").submit( function(eventObj) {
    // $('<input />').attr('type', 'hidden')
    //     .attr('name', "something")
    //     .attr('value', "something")
    //     .appendTo('#form');
    // document.getElementById("myTextarea").value = "Fifth Avenue, New York City";

    $('#textarea-info').val($('#editor').html());
    return true;
  });
});

text = function(){
  console.log('text');
  console.log($('#editor').html());
  $('#textarea-info').val($('#editor').html());
}