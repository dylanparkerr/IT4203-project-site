console.log("test");

$.getJSON("books/it-books-single.json", function(data){
    console.log(data);
});

$.getJSON("books/it-books-list.json", function(data){
    console.log(data);
});

$.getJSON("https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC", function(data){
    console.log(data);
});

$.getJSON("https://www.googleapis.com/books/v1/volumes?q=modern%20web", function(data){
    console.log(data);
});