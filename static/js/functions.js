// SECTION: Append new added board to index.html
function showBoard(data){

    var ul = $('<ul></ul>')
    $.each(data, function(i, board){
        ul.append('<div class="board" id="board_div'+ board.id +'">' +
                '<span class=removeOnClick><button class="btn btn-danger btn-xs remove" data-remove-id = "'+board.id+'" >x</button></span>' +
                '<p id="board_text">'+ board.title + '</p>' +
                '</div>');
        ul.appendTo('#board-container');

        $(".remove").click(function(){
            var dataBase = new LocalStorage(localStorage)
            var removeId = $(this).data('remove-id')
            dataBase.deleteData(removeId);
            $('#board_div'+ removeId).hide();

        })
    });


}

// SECTION: Add unique id to the board
function getUniqueId(dataBase){

    var objectList = dataBase.getData();
    var boardIdList = [];

    $.each(objectList, function(i, board){
        boardIdList.push(Number(board.id));
    });

    if (boardIdList.length > 0) {
        var maxId = Math.max.apply(null, boardIdList);
        return maxId += 1
    }
    else {
        return 1;
    }
}

// // SECTION: Remove given board
// function removeBoard(dataBase) {
//
//     var objectList = dataBase.getData();
//     // $.each(objectList, function(i, board){
//         // ask the user wheter to delete or not the board
//
//         // $('#').remove();
//
//     });
//
// }
