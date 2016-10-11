// LocalStorageImp constructor implementation (State)
function LocalStorageImp() {
    // BOARD

    this.runBoardPage = function(){
        this.getandshowBoard();

    };
    // get data
    this.getandshowBoard = function(){
        if (!localStorage.boards){
            var boardDict = {"nextId": 1, "boards" : []};
            localStorage.boards = JSON.stringify(boardDict);
        }
        else {
            var boardDict = JSON.parse(localStorage.getItem("boards"));
        }
        $.each(boardDict.boards, function(i, board){
            displayBoard(board)
        });
    };
    // del data
    this.delandshowBoard = function(boardId){
        var dictBoard = JSON.parse(localStorage.boards)

        for (var i in dictBoard.boards) {
            if (dictBoard.boards[i].id === boardId){
                dictBoard.boards.splice(i, 1);
                // delete all cards of given board
                localStorage.removeItem("cards_" + boardId)
                break;
            }
        }
        localStorage.boards = JSON.stringify(dictBoard)
    };
    // save data
    this.postandshowBoard = function(inputTitle, inputBody){
        var boardDict = JSON.parse(localStorage.boards)
        var boardObject = new Board(boardDict.nextId, inputTitle, inputBody)
        var cardDict = {"nextId": 1, "boardId": boardObject.id, cards: []};
        localStorage.setItem("cards_" + boardObject.id, JSON.stringify(cardDict));
        boardObject.display();
        boardDict.nextId += 1
        boardDict.boards.push(boardObject)
        localStorage.boards = (JSON.stringify(boardDict))

    };
    //CARD
    this.runCardPage = function(boardId){
        this.getandshowCard(boardId);
        var state = new State(new LocalStorageImp());
        $('#add-card').click(function(){
            var inputTitle = $('#input-card-title').val();
            var inputBody = $('#input-card-body').val();
            if (inputTitle && inputBody){
                state.postandshowCard(inputTitle, inputBody, boardId);


            }
            else {
                alert("Pls fill all!")
            }
            // empty board input field after submit
            resetInputField();
        });


    };
    // get data
    this.getandshowCard = function(boardId){
        var cardDict = JSON.parse(localStorage.getItem("cards_" + boardId));
        $.each(cardDict.cards, function(i, card){
            displayCard(card)
        });

    };
    // del data
    this.delandshowCard = function(boardId, cardId){
        var cardDict = JSON.parse(localStorage.getItem("cards_" + boardId));
        for (var i in cardDict.cards) {
            if (cardDict.cards[i].id === cardId){
                cardDict.cards.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("cards_" + boardId, JSON.stringify(cardDict))
    };

    // save data
    this.postandshowCard = function(inputTitle, inputBody, boardId){
        var cardDict = JSON.parse(localStorage.getItem("cards_" + boardId))
        var cardObject = new Card(cardDict.nextId, boardId, inputTitle, inputBody)
        cardDict.cards.push(cardObject)
        cardDict.nextId += 1
        cardObject.display()
        localStorage.setItem("cards_" + boardId, JSON.stringify(cardDict))
    };

};
