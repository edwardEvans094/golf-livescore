$(document).ready(function() {

  // Place JavaScript code here...

});
function showdetail(obj){
    switch(obj){
        case 1:
            $('.box-match-1').hide();
            $('.box-match-2').show();
            break;
        default:
            $('.box-match-2').hide();
            $('.box-match-1').show();
            break;
    }
}