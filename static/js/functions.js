// outsource from model.js the different functions

function displayBoard(boardObject) {

    var divBoard = $('<div class="board" id=board_'+ boardObject.id +'></div>');
    divBoard.append("<p>BOARD</p>");
    divBoard.append("<p>"+ boardObject.title +" </p>");
    divBoard.append("<p>"+ boardObject.body +" </p>");
    var btnDelete = $('<button class="btn btn-danger">Delete</button>')
    var state = new State(new LocalStorageImp());
    btnDelete.on('click', function(){

        state.delandshowBoard(boardObject.id);
        var board = $('#board_'+ boardObject.id)
        board.hide();
    });
    divBoard.append(btnDelete)
    var showCard = $('<button id="cards" class="btn btn-default">Card(s)</button>')
    divBoard.append(showCard)
    divBoard.appendTo('#board-container');
    showCard.on('click', function(){
        $('#board-container').hide();
        $('#card-container').show();
        state.runCardPage(boardObject.id);
    });
}


function displayCard(cardObject) {
    var divCard = $('<div class="card" id=card_'+ cardObject.id +'></div>');
    divCard.append("<p>CARD</p>");
    divCard.append("<p>"+ cardObject.title +" </p>");
    divCard.append("<p>"+ cardObject.body +" </p>");
    var btnDelete = $('<button class="btn btn-danger">Delete</button>')
    btnDelete.on('click', function(){
        var state = new State(new LocalStorageImp());

        state.delandshowCard(cardObject.boardId, cardObject.id);
        var card = $('#card_'+ cardObject.id)
        card.hide();
    });
    divCard.append(btnDelete)

    divCard.appendTo('#card-container');
}


function resetInputField(){
    $(':input').val('');
}
