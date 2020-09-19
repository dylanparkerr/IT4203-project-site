console.log("test");

$.getJSON("https://api.itbook.store/1.0/books/9781449334970", function(data){
    console.log(data);
});

$.getJSON("https://api.itbook.store/1.0/search/mobile%20web", function(data){
    console.log(data);
});

$.getJSON("https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC", function(data){
    console.log(data);
});

$.getJSON("https://www.googleapis.com/books/v1/volumes?q=modern%20web", function(data){
    console.log(data);
});