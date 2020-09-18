console.log("test");

$.getJSON("http://it-ebooks-api.info/v1/search/modern%20web", function(data){
    console.log(data);
});

$.getJSON("http://it-ebooks-api.info/v1/book/2563063616", function(data){
    console.log(data);
});

$.getJSON("https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC", function(data){
    console.log(data);
});

$.getJSON("https://www.googleapis.com/books/v1/volumes?q=modern%20web", function(data){
    console.log(data);
});