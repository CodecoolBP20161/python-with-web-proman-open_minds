// dataBase constructor implementation  (State)
function DataBaseImp(){
    //BOARD
    this.runBoardPage = function() {
        this.getandshowBoard()
    }
    this.getandshowBoard = function() {
        console.log("getandshowBoard")

        $.ajax({
          method: "GET",
          url: '/api/'
        })
        .done(function( boardJsonList ) {
            // console.log(boardJsonList)
            var boardList = JSON.parse(boardJsonList);
            $.each(boardList, function(i, boardObject){

                var board = new Board(boardObject.id, boardObject.title, boardObject.body);
                board.display();
            })
        })
        .fail(function() {
            console.log( "error" );
        });
    }

    this.delandshowBoard = function(boardId) {
        $.ajax({
          method: "POST",
          url: '/api/',
          data: { board: JSON.stringify(boardId) }
        })
        .done(function( msg ) {
            console.log( "Data Deleted: " + msg );
            // boardObject.display();
        })
        .fail(function() {
            console.log( "error" );
        });

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
    this.runCardPage = function(boardId) {
        this.getandshowCard(boardId)
    }
    this.getandshowCard = function(boardId){
        console.log("getandshowCard")

        $.ajax({
          method: "GET",
          url: '/api/'+ String(boardId)
        })
        .done(function( cardJsonList ) {
            // console.log(boardJsonList)
            var cardList = JSON.parse(cardJsonList);
            $.each(cardList, function(i, cardObject){

                var card = new Board(cardObject.id, cardObject.title, cardObject.body);
                card.display();
            })
        })
        .fail(function() {
            console.log( "error" );
        });
    }
    // this.delandshowCard = function(boardId, cardId){
    //
    // }
    // this.postandshowCard = function(inputTitle, inputBody, boardId){
    //
    // }
};
