function Board(title, id) {
    this.title = title;
    this.id = id;
    // this.cardList = [];
}

// function Card (title) {
//     this.title = title;
//     this.id = id;
// }


// localStorage prototype (implementation part of state design pattern)
function LocalStorage(localStorage) {
    this.localStorage = localStorage;

    this.getData = function(){
        var dataList = [];
        for(var i = 0; i < this.localStorage.length; i++) {
            dataList.push(JSON.parse(this.localStorage[this.localStorage.key(i)]));
        }
        return dataList;
    };

    this.saveData = function(obj) {
        this.localStorage.setItem(String(obj.id), JSON.stringify(obj));
    }
}
