// Board constructor
function Board(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.display = function() {
        displayBoard(this);
    }
}

// Card constructor
function Card (id, boardId, title, body) {
    this.id = id;
    this.boardId = boardId;
    this.title = title;
    this.body = body;
    this.display = function() {
        displayCard(this);
    }
}
