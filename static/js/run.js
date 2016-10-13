$(document).ready(function(){

    // state pattern created with one of the implementation
    var state = new State(new DataBaseImp());
    // start the page
    state.runBoardPage();


    // create button got an event
    $('#add-board').click(function(){
        // inputf field's values
        var inputTitle = $('#input-board-title').val();
        var inputBody = $('#input-board-body').val();
        if (inputTitle && inputBody){
            // save the board
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
