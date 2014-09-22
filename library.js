/*The library should be aware of a number of shelves.
Each shelf should know what books it contains. 
Make the book object have "enshelf" and "unshelf" methods
that control what shelf the book is sitting on. The 
library should have a method to report all books it 
contains. In addition to pushing this .js file to your
Github account, please also setup a http://jsfiddle.net/
with the solution and enter the saved URL here so we
can take a look.*/
//var library = new Library();

function Library() {
    this.shelfList = [];
}



Library.prototype.create_bookshelf = function (id) {
    var existShelf = this.shelfList.filter(function (obj) {
        if (obj.shelfId == id) {
            return obj;
        }
    })[0];
    if (existShelf === 0) {
        var shelf = new Shelf(id);
        this.shelfList.push(shelf);
        return shelf;
    } else {
        return console.log("The library already has a shelf at location", id);
    }
};

Library.prototype.list_all_books = function () {
	//console.log(this.bookList);
	var books = "";
	for(var i = 0; i<this.shelfList.length; i++){
		this.shelfList[i].list_books_on_shelf();
	}
};

function Shelf(id) {
    this.bookList = [];
    this.shelfId = id;
}

Shelf.prototype.list_books_on_shelf = function(){
	console.log(this.bookList);
	//var books = "";
	// for(var i = 0; i<this.bookList.length; i++){
		//books += this.bookList[i];
	// }	

};

function Book(name) {
    this.bookName = name;
}

Book.prototype.enshelf = function (shelfId) {
    // body...
    //     console.log(library.shelfList.bookList);
    var bList = library.shelfList.filter(function (obj) {
        if (obj.shelfId == shelfId) {
            return obj;
        }
    })[0].bookList;
    // 	var existingBook = bList.filter(function(obj) {
    // 		if(obj.bookName == this.bookName){
    // 			return obj;
    // 		}
    // 	})[0];

    // var bookIndex = bList.indexOf(function(obj) {
    // 	if(obj.bookName == this.bookName){
    // 		return obj;
    // 	}
    // });
    // 	if(typeof existingBook === 'undefined'){
    bList.push(this);
    console.log(bList.length);
    // 	}
    // 	else {
    // 		return console.log("This book already exists on this shelf");
    // 	}
};

Book.prototype.unshelf = function (shelfId) {
    // body...
    //     console.log(library.shelfList.bookList);
    var bList = library.shelfList.filter(function (obj) {
        if (obj.shelfId == shelfId) {
            return obj;
        }
    })[0].bookList;
    // 	var existingBook = bList.filter(function(obj) {
    // 		if(obj.bookName == this.bookName){
    // 			return obj;
    // 		}
    // 	})[0];

    // var bookIndex = bList.indexOf(function(obj) {
    // 	if(obj.bookName == this.bookName){
    // 		return obj;
    // 	}
    // });
    // 	if(typeof existingBook === 'undefined'){
    bList.pop(this);
    console.log(bList.length);
    // 	}
    // 	else {
    // 		return console.log("This book already exists on this shelf");
    // 	}
};
var library = new Library();
library.create_bookshelf(1);
//library.create_bookshelf(1);
library.create_bookshelf(2);
var book = new Book("Eloquent Javascript");
book.enshelf(1);