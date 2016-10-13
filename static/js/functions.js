// outsource from model.js the different functions

function displayBoard(boardObject) {

    var divBoard = $('<div class="board" id=board_'+ boardObject.id +'></div>');
    // append 'view board' buttons
    var showCard = $('<button id="cards" class="btn btn-primary btn-xs showcardsbutton" data-toggle="tooltip" title="view cards on this board"><i class="fa fa-list-alt" aria-hidden="true"></i> view cards</button>')
    divBoard.append(showCard)
    divBoard.appendTo('#board-container');
    showCard.on('click', function(){
        $('#board-container').hide();
        $('#card-container').show();
        state.runCardPage(boardObject.id);
    });
    // append 'delete' buttons
    var btnDelete = $('<button class="btn btn-default btn-xs delboardbutton" data-toggle="tooltip" title="delete this board and all cards on it"><i class="fa fa-trash" aria-hidden="true"></i></button>')
    var state = new State(new DataBaseImp());
    btnDelete.on('click', function(){

        state.delandshowBoard(boardObject.id);
        var board = $('#board_'+ boardObject.id)
        board.hide();
    });
    divBoard.append(btnDelete)
    // append board title & description
    divBoard.append("<p class='titletext'> <strong>"+ boardObject.title +"</strong> </p>");
    divBoard.append("<p>"+ boardObject.body +" </p>");
}


function displayCard(cardObject) {
    var divCard = $('<div class="card" id=card_'+ cardObject.id +'></div>');
    // append 'delete' buttons
    var btnDelete = $('<button class="btn btn-default btn-xs delcardbutton" data-toggle="tooltip" title="delete this card"><i class="fa fa-trash" aria-hidden="true"></i></button>')
    btnDelete.on('click', function(){
        var state = new State(new DataBaseImp());

        state.delandshowCard(cardObject.boardId, cardObject.id);
        var card = $('#card_'+ cardObject.id)
        card.hide();
    });
    divCard.append(btnDelete)
    // append card title & description
    divCard.append("<p class='titletext'><strong>"+ cardObject.title +"</strong></p>");
    divCard.append("<p>"+ cardObject.body +" </p>");
    divCard.appendTo('#card-container');
}


function resetInputField(){
    $(':input').val('');
}
