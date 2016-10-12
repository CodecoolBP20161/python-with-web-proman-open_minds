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
        var boardObject = new Board(null, inputTitle, inputBody)

        $.ajax({
          method: "POST",
          url: '/',
          data: { board: JSON.stringify(boardObject) }
        })
        .done(function( msg ) {
            console.log( "Data Saved: " + msg );
            boardObject.display();
        })
        .fail(function() {
            console.log( "error" );
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
