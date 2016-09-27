// parsing
function get_boards() {
    var boards = new Array;
    var boards_str = localStorage.getItem('board');
    if (boards_str !== null) {
        boards = JSON.parse(boards_str);
    }
    return boards;
}

// add new board
function add() {
    var task = document.getElementById('task').value;
    // get_boards function is called
    var boards = get_boards();
    // append new task to boards
    boards.push(task);
    // save it and convert it  a JavaScript value to a JSON string
    localStorage.setItem('board', JSON.stringify(boards));
    // the show function is called
    show();

    return false;
}

// remove existing board
function remove() {
    // it returns the value of the attribute with the specified name
    var id = this.getAttribute('id');
    // get_boards function is called
    var boards = get_boards();
    // adds/removes items to/from an array, and returns the removed item
    boards.splice(id, 1);
    // save it and convert it  a JavaScript value to a JSON string
    localStorage.setItem('board', JSON.stringify(boards));
    // the show function is called
    show();

    return false;
}


//  showing the board
function show() {
    // get_boards function is called
    var boards = get_boards();

    // the elements of board are listed in rows (with some html tags)
    var html = '<ul>';
    for(var i=0; i<boards.length; i++) {
        html += '<li>' + boards[i] + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';

    // property sets or returns the HTML content (inner HTML) of an element
    document.getElementById('boards').innerHTML = html;

    // at this moment created remove button, and here is called
    var buttons = document.getElementsByClassName('remove');
    // set the remove button , so it will working as a delter button
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

// method to attach an event handler to the document
document.getElementById('add').addEventListener('click', add);
show();
