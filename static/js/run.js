$(document).ready(function(){
    var state = new State(new DataBaseImp());
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

        // empty board input field after submit
        resetInputField();
    });

    // reset button event
    $('.reset').on('click', function(){
        resetInputField();
    });


});
