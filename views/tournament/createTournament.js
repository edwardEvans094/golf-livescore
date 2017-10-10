var remove = function(id){
  $('.list-' + id).remove();
  arrayMember.splice(arrayMember.indexOf(id), 1);
}

jQuery(document).ready(function($){
  const searchGolferUrl = '/team/search-name';
  

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
        //console.log(data);
        $("#golferAvar").attr("src","/uploads/" + data.filename);
        $('input[name=logo]').val(data.filename);
      }
    });
  })   
  
  function addLiToUl(UlQuery, data){
    if(!data || !data.length) return;

    for(let i=0; i< data.length; i++){
      $(UlQuery).append(`<li class="list-group-item">${data[i].name}<i class="fa fa-plus-square-o button-add-golfer" onclick="addGolferToMemberList('${encodeURIComponent(JSON.stringify(data[i]))}')" aria-hidden="true" style="float: right;"></i></li>`);
    }
  }


  var searchTeam = function(name){
    console.log("debouce search golfer");
    var searchString = $('#team').val();
    $.get(searchGolferUrl + '?q=' + searchString, function(data, status){
      $('.suggest-list').empty();
      addLiToUl('.suggest-list', data)
    });
    
  }
  var lazySearch = _.debounce(searchTeam, 300);
  $("input[name='team-search']").keyup(lazySearch);
});

function addGolferToMemberList(team){
  let golferObj = JSON.parse(decodeURIComponent(team));
  if(arrayMember.indexOf(golferObj._id) >= 0) return;
  arrayMember.push(golferObj._id);
  $('input[name=teamArray]').val(arrayMember);
  $('.member-list').append('<li class="list-group-item" id="list-' + golferObj._id + '">' + golferObj.name +'<i class="fa fa-times button-add-golfer" aria-hidden="true" style="float: right;", onclick="remove(\'' + golferObj._id + '\')"></i></li>');

  $('#score-broad').append(`
  <div class="form-group list-${golferObj._id}">
    <div class="col-sm-8">${golferObj.name}</div>
    <div class="col-sm-4">
      <input type="hidden" value="${golferObj._id}" name="team" class="form-control"/>
      <input type="number" value="0" name="score" placeholder="Điểm " class="form-control"/>
    </div>
  </div>
  `)
}
