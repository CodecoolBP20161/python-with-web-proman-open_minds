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
          url: '/api/delete',
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
        var state = new State(new DataBaseImp());
        $('#add-card').click(function(){
            var inputTitle = $('#input-card-title').val();
            var inputBody = $('#input-card-body').val();
            if (inputTitle && inputBody){
                state.postandshowCard(inputTitle, inputBody, boardId);
            }
        })
    }
    this.getandshowCard = function(boardId){
        console.log("getandshowCard")

        $.ajax({
          method: "GET",
          url: '/board/'+ String(boardId)
        })
        .done(function( cardJsonList ) {
            // console.log(cardJsonList)
            var cardList = JSON.parse(cardJsonList);
            $.each(cardList, function(i, cardObject){

                // id, boardId, title, body
                var card = new Card(cardObject.id, cardObject.board.id, cardObject.title, cardObject.body);
                console.log(card)
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
    this.postandshowCard = function(inputTitle, inputBody, boardId){
        var cardObject = new Card(null, boardId, inputTitle, inputBody)

        $.ajax({
          method: "POST",
          url: '/board/'+ String(boardId),
          data: { card: JSON.stringify(cardObject) }
        })
        .done(function( msg ) {
            console.log( "Data Saved: " + msg );

            cardObject.display();
        })
        .fail(function() {
            console.log( "error" );
        });
    }
};
