$(document).ready(function(){

    $('#card-container').hide();
    var state = new State(new LocalStorageImp());
    state.runBoardPage();

    $('#add-board').click(function(){
        var inputTitle = $('#input-board-title').val();
        var inputBody = $('#input-board-body').val();
        if (inputTitle && inputBody){
            state.postandshowBoard(inputTitle, inputBody);
        }
        else {
            alert("Pls fill all!")
        }
    });



});
