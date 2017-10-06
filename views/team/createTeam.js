const arrayMember = [];
jQuery(document).ready(function($){
  const searchGolferUrl = '/golfer/search-name';
  

  $("input[name='myFile']").change(function() { 
    var formData = new FormData('#myFile');
    //- formData.append('section', 'general');
    //- formData.append('action', 'previewImg');
    formData.append('myFile', $("input[name='myFile']")[0].files[0]);
    $.ajax({
      url : '/api/upload',
      type : 'POST',
      data : formData,
      contentType: 'multipart/form-data',
      async: true,
      cache: false,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      timeout: 60000,
      success : function(data) {
        console.log(data);
        $("#golferAvar").attr("src","/uploads/" + data.filename);
        $('input[name=userAvatar]').val(data.filename);
      }
    });
  })   
  

  var availableTags = [
    "ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++",
    "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran",
    "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl",
    "PHP", "Python", "Ruby", "Scala", "Scheme"
  ]
  // $("input[name='golfer']").autocomplete({
  //   source: availableTags
  // });
  function addLiToUl(UlQuery, data){
    if(!data || !data.length) return;

    for(let i=0; i< data.length; i++){
      $(UlQuery).append(`<li class="list-group-item">${data[i].name}<i class="fa fa-plus-square-o button-add-golfer" onclick="addGolferToMemberList('${encodeURIComponent(JSON.stringify(data[i]))}')" aria-hidden="true" style="float: right;"></i></li>`);
    }
  }

  

  

  var searchGolfer = function(name){
    console.log("debouce search golfer");
    var searchString = $('#golfer').val();
    $.get(searchGolferUrl + '?q=' + searchString, function(data, status){
      $('.suggest-list').empty();
      addLiToUl('.suggest-list', data)
    });
    
  }
  var lazySearch = _.debounce(searchGolfer, 300);
  $("input[name='golfer']").keyup(lazySearch);
});

function addGolferToMemberList(golfer){
  let golferObj = JSON.parse(decodeURIComponent(golfer));
  if(arrayMember.indexOf(golferObj._id) >= 0) return;
  arrayMember.push(golferObj._id);
  $('input[name=member]').val(arrayMember);
  $('.member-list').append('<li class="list-group-item">' + golferObj.name +'<i class="fa fa-times button-add-golfer" aria-hidden="true" style="float: right;"></i></li>');
}
