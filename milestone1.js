// show source depending on selection
function show(){ 
    option = $('[name=source-list]').val();
    if(option == '-'){
        hideAll();
    }
    else if(option == 'it-books-single'){
        hideAll();
        $("[id=itbs]").show();
    }
    else if(option == 'it-books-list'){
        hideAll();
        $("[id=itbl]").show();
    }
    else if(option == 'google-single'){
        hideAll();
        $("[id=gs]").show();
    }
    else if(option == 'google-list'){
        hideAll();
        $("[id=gl]").show();
    }
}

function hideAll(){
    $("[id=itbs]").hide();
    $("[id=itbl]").hide();
    $("[id=gs]").hide();
    $("[id=gl]").hide();
}

// intially hide all the sources
hideAll();

// source 1
$.getJSON("books/it-books-single.json", function(data){
    $("[id=itbsImg]").attr("src",data.image);
    $("[id=itbsTitle]").html(data.title);
    $("[id=itbsSubTitle]").html(data.subtitle);

    $("[id=itbsAuth]").html(data.authors);
    $("[id=itbsDesc]").html(data.desc);
    $("[id=itbsYear]").html(data.year);
    $("[id=itbsISBN10]").html(data.isbn10);
    $("[id=itbsISBN13]").html(data.isbn13);
    $("[id=itbsLang]").html(data.language);
    $("[id=itbsPages]").html(data.pages);
    $("[id=itbsPrice]").html(data.price);
    $("[id=itbsPub]").html(data.publisher);
    $("[id=itbsRating]").html(data.rating);
});

// source 2
$.getJSON("books/it-books-list.json", function(data){
    for(let i=0;i<10;i++){
        $(`[id=${i}img]`).attr("src",data.books[i].image);
        $(`[id=${i}title]`).html(data.books[i].title);
        $(`[id=${i}subtitle]`).html(data.books[i].subtitle);
        $(`[id=${i}isbn13]`).html(data.books[i].isbn13);
        $(`[id=${i}price]`).html(data.books[i].price);
    }
});

// source 3
$.getJSON("https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC", function(data){
    console.log(data);
    $("[id=gsImg]").attr("src",data.volumeInfo.imageLinks.thumbnail);
    $("[id=gsTitle]").html(data.volumeInfo.title);
    $("[id=gsSubtitle]").html(data.volumeInfo.subtitle);

    $("[id=gsAuth]").html(data.volumeInfo.authors);
    $("[id=gsYear]").html(data.volumeInfo.publishedDate);
    $("[id=gsISBN10]").html(data.volumeInfo.industryIdentifiers[0].identifier);
    $("[id=gsISBN13]").html(data.volumeInfo.industryIdentifiers[1].identifier);
    $("[id=gsLang]").html(data.volumeInfo.language);
    $("[id=gsPages]").html(data.volumeInfo.pageCount);
    $("[id=gsPub]").html(data.volumeInfo.publisher);
    $("[id=gsRating]").html(data.volumeInfo.averageRating);
    $("[id=gsDesc]").html(data.volumeInfo.description);
});

// source 4
$.getJSON("https://www.googleapis.com/books/v1/volumes?q=modern%20web", function(data){
    for(let i=0;i<10;i++){
        $(`[id=g${i}img]`).attr("src",data.items[i].volumeInfo.imageLinks.smallThumbnail);
        $(`[id=g${i}title]`).html(data.items[i].volumeInfo.title);
        $(`[id=g${i}subtitle]`).html(data.items[i].volumeInfo.subtitle);
        $(`[id=g${i}isbn13]`).html(data.items[i].volumeInfo.industryIdentifiers[0].identifier);
        $(`[id=g${i}isbn10]`).html(data.items[i].volumeInfo.industryIdentifiers[1].identifier);
    }
});



