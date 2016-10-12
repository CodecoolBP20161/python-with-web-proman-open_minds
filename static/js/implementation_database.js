// dataBase constructor implementation  (State)
function DataBaseImp(){
    //BOARD
    this.runBoardPage = function() {
        this.getandshowBoard()
    }
    this.getandshowBoard = function() {
        console.log("getandshowBoard")
    }
    this.delandshowBoard = function(boardId) {
        console.log("delete")
    }

    this.postandshowBoard = function(inputTitle, inputBody) {
        var boardObject = new Board(inputTitle, inputBody)

        $.ajax({
          method: "POST",
          url: '/api/',
          data: { board: JSON.stringify(boardObject) }
        })
        .done(function( msg ) {
            alert( "Data Saved: " + msg );
            boardObject.display();
        })
        .fail(function() {
            alert( "error" );
        });



    }

    // CARD
    // this.runCardPage = function(boardId) {
    //
    // }
    // this.getandshowCard = function(boardId){
    //
    // }
    // this.delandshowCard = function(boardId, cardId){
    //
    // }
    // this.postandshowCard = function(inputTitle, inputBody, boardId){
    //
    // }
};
