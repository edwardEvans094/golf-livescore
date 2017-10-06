const updateScoreUrl = '/match/update-score'

var updateMatchScore = (matchId) => {
  // let dataScore = $('#data-score').html();
  // console.log()
  let dataScore = $('#data-score tr').map(function(x){
    return {
      golfer_id: this.id,
      team_id: this.attributes["name"].value,
      result: Array.from(this.getElementsByTagName('td')).map(function(y){ return y.innerHTML}).slice(1),
      // team: $('#team-select-' + this.id).val()
    }    
  })
  let arrayResult = Object.values(dataScore).filter(function(x){
    return x.golfer_id;
  })
  var data = {
    score: arrayResult,
    _csrf: $('input[name=_csrf]').val()
  }
  $.post(updateScoreUrl + '/' + matchId, data, function(result){
    console.log(result);
  });
}
$('#mainTable').editableTableWidget().numericInputExample().find('td:first').focus();
$('#textAreaEditor').editableTableWidget({editor: $('<textarea>')});
window.prettyPrint && prettyPrint();