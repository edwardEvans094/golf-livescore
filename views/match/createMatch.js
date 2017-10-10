
jQuery(document).ready(function($){
  const searchGolferUrl = '/golfer/search-in-team/';

  function addLiToUl(UlQuery, data, teamId){
    if(!data || !data.length) return;

    for(let i=0; i< data.length; i++){
      $(UlQuery).append(`<li class="list-group-item">${data[i].name}<i class="fa fa-plus-square-o button-add-golfer" onclick="addGolferToMemberList('${encodeURIComponent(JSON.stringify(data[i]))}', '${teamId}')" aria-hidden="true" style="float: right;"></i></li>`);
    }
  }


  var searchGolfer = function(name){
    let teamId = this.id;
    var searchString = this.value;
    // console.log(searchString);
    $.get(searchGolferUrl + teamId + '?q=' + searchString, function(data, status){
      $('#suggest-' + teamId).empty();
      addLiToUl('#suggest-' + teamId, data, teamId)
    });
    
  }
  var lazySearch = _.debounce(searchGolfer, 300);
  $("input[name='golfer']").keyup(lazySearch);
});

function addGolferToMemberList(golfer, teamId){
  let golferObj = JSON.parse(decodeURIComponent(golfer));
  if(!memberObj[teamId]){
    memberObj[teamId] = [golferObj._id];
  } else {
    if(memberObj[teamId].indexOf(golferObj._id) >= 0) return;
    memberObj[teamId].push(golferObj._id);
  }
  console.log(memberObj);
  
  $('#input-' + teamId).val(memberObj[teamId]);
  $('#list-' + teamId).append('<li class="list-group-item">' + golferObj.name +'<i class="fa fa-times button-add-golfer" aria-hidden="true" style="float: right;"></i></li>');
}
