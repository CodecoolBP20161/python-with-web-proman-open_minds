// FUNCTIONS OUTSOURCING
var ajaxErrorHandling = function() {
    console.log( "error" );
}

// dataBase constructor implementation  (State)
function DataBaseImp(){
    //SECTION: BOARD
    this.runBoardPage = function() {
        this.getandshowBoard()
    }

    // get board(s) from central database
    this.getandshowBoard = function() {
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
        .fail(ajaxErrorHandling);
    }

    // delete board from central database
    this.delandshowBoard = function(boardId) {
        $.ajax({
          method: "POST",
          url: '/api/delete',
          data: { board: JSON.stringify(boardId) }
        })
        .done(function( msg ) {
            console.log( "Data Deleted: " + msg );
        })
        .fail(ajaxErrorHandling);
    }

    // save board to the central database
    this.postandshowBoard = function(inputTitle, inputBody) {
        // creates a boardObject with null id, beacuse the id is generated with peewee on the server side
        var boardObject = new Board(null, inputTitle, inputBody)

        $.ajax({
          method: "POST",
          url: '/',
          data: { board: JSON.stringify(boardObject) }
        })
        .done(function( boardId ) {
            // boardObject get id from server side
            boardObject.id = boardId
            boardObject.display();
        })
        .fail(ajaxErrorHandling);
    }

    //SECTION: CARD
    this.runCardPage = function(boardId) {
        this.getandshowCard(boardId)

        var state = new State(new DataBaseImp());
        // create card button got an event
        $('#add-card').click(function(){
            // input field's values
            var inputTitle = $('#input-card-title').val();
            var inputBody = $('#input-card-body').val();

            if (inputTitle == "" && inputBody ==""){
                $('#add-card').avgrund({
                    height: 200,
                    holderClass: 'custom',
                    closeByEscape: true, // enables closing popup by 'Esc'..
                    closeByDocument: true, // ..and by clicking document itself
                    openOnEvent: true, // set to 'false' to init on load
                    showClose: true,
                    showCloseText: 'close',
                    onBlurContainer: '.container',
                    template: '<div><h1 id="avgrund">Please fill all!</h1></div>'
                });

            } else {
                // save the card
                state.postandshowCard(inputTitle, inputBody, boardId);
                // empty card input field after submit
                resetInputField();
                // modal avground prohibited
                $('#add-card').unbind('avgrund', onDocumentClick)
            }
        });
    }

    // get card(s) from central database
    this.getandshowCard = function(boardId){
        $.ajax({
          method: "GET",
          url: '/board/'+ String(boardId)
        })
        .done(function( cardJsonList ) {
            var cardList = JSON.parse(cardJsonList);
            $.each(cardList, function(i, cardObject){
                var card = new Card(cardObject.id, cardObject.boardId.id, cardObject.title, cardObject.body);
                card.display();
            })
        })
        .fail(ajaxErrorHandling);
    }
    // delete card from central database
    this.delandshowCard = function(boardId, cardId){
        $.ajax({
          method: "POST",
          url: '/board/ ' +String(boardId) + '/delete',
          data: { card: JSON.stringify(cardId) }
        })
        .done(function( msg ) {
            console.log( "Data Deleted: " + msg );

        })
        .fail(ajaxErrorHandling);
    }
    // save board to the central database
    this.postandshowCard = function(inputTitle, inputBody, boardId){
        var cardObject = new Card(null, boardId, inputTitle, inputBody)

        $.ajax({
          method: "POST",
          url: '/board/'+ String(boardId),
          data: { card: JSON.stringify(cardObject) }
        })
        .done(function( cardId ) {

            cardObject.id = cardId;
            cardObject.display();
            resetInputField();
        })
        .fail(ajaxErrorHandling);
    }

};
