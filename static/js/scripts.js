// parsing
function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

// add new board
function add() {
    var task = document.getElementById('task').value;

    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

// remove existing board
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

//  showing the boards
function show() {
    var todos = get_todos();

    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<div class="board">' +
            '<button  class="btn btn-danger btn-xs remove" id="' + i  + '">x</button>' +
        '<p id="board_text">'+ todos[i] + '</p>' +
            '<buttons class="btn btn-default btn-block show-cards" ' +
            'data-toggle="modal" ' +
            'data-target="#boardModal">show cards' +
            '</buttons></div>';
    }
    html += '</ul>';

    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var n=0; n < buttons.length; n++) {
        buttons[n].addEventListener('click', remove);
    }
}


document.getElementById('add').addEventListener('click', add);
show();

var $modal = $('.modal').modal({
    show: false
});
$('.board').on('click', function() {
    $modal.modal('show');
});
