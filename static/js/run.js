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
        console.log(inputBody)
        console.log(inputTitle)

        if (inputTitle && inputBody){
            // save the board
            state.postandshowBoard(inputTitle, inputBody);
            // empty board input field after submit
            resetInputField();
            // modal avground prohibited
            $('#add-board').unbind('avgrund', onDocumentClick)

        }
        else {
            $('#add-board').avgrund({
                height: 200,
                holderClass: 'custom',
                closeByEscape: true, // enables closing popup by 'Esc'..
                closeByDocument: true, // ..and by clicking document itself
                openOnEvent: true, // set to 'false' to init on load
                showClose: true,
                showCloseText: 'close',
                onBlurContainer: '.container',
                template: '<div><h1 id="avgrund">Please fill all! </h1></div>'
            });

        }
    });

    // reset button event
    $('.reset').on('click', function(){
        resetInputField();
    });
});
