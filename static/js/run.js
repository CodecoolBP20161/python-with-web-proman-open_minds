$(document).ready(function(){
    // new localStorage "object"
    var dataBase = new LocalStorage(localStorage)

    showBoard(dataBase.getData());

    // SET unique ID
    getUniqueId(dataBase);

    // click event -- > if the "add board button"  is clicked
    $('#add-board').click(function(){

        var title = $('#input-board').val();
        if (!title) {
            alert("You have to fill the form!");
        }
        else {
            // localStorage.length is just a test, it has to be a unique !!!!!!!!
            var board = new Board(title, getUniqueId(dataBase));
            dataBase.saveData(board);

        }

    });

});
