/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

