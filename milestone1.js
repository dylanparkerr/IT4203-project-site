$.getJSON("books/it-books-single.json", function(data){
    console.log(data);
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

$.getJSON("books/it-books-list.json", function(data){
    console.log(data);
    $("[id=0img]").attr("src",data.books[0].image);
    $("[id=0title]").html(data.books[0].title);
    $("[id=0subtitle]").html(data.books[0].subtitle);
    $("[id=0isbn13]").html(data.books[0].isbn13);
    $("[id=0price]").html(data.books[0].price);

    $("[id=1img]").attr("src",data.books[1].image);
    $("[id=1title]").html(data.books[1].title);
    $("[id=1subtitle]").html(data.books[1].subtitle);
    $("[id=1isbn13]").html(data.books[1].isbn13);
    $("[id=1price]").html(data.books[1].price);

    $("[id=2img]").attr("src",data.books[2].image);
    $("[id=2title]").html(data.books[2].title);
    $("[id=2subtitle]").html(data.books[2].subtitle);
    $("[id=2isbn13]").html(data.books[2].isbn13);
    $("[id=2price]").html(data.books[2].price);

    $("[id=3img]").attr("src",data.books[3].image);
    $("[id=3title]").html(data.books[3].title);
    $("[id=3subtitle]").html(data.books[3].subtitle);
    $("[id=3isbn13]").html(data.books[3].isbn13);
    $("[id=3price]").html(data.books[3].price);

    $("[id=4img]").attr("src",data.books[4].image);
    $("[id=4title]").html(data.books[4].title);
    $("[id=4subtitle]").html(data.books[4].subtitle);
    $("[id=4isbn13]").html(data.books[4].isbn13);
    $("[id=4price]").html(data.books[4].price);

    $("[id=5img]").attr("src",data.books[5].image);
    $("[id=5title]").html(data.books[5].title);
    $("[id=5subtitle]").html(data.books[5].subtitle);
    $("[id=5isbn13]").html(data.books[5].isbn13);
    $("[id=5price]").html(data.books[5].price);

    $("[id=6img]").attr("src",data.books[6].image);
    $("[id=6title]").html(data.books[6].title);
    $("[id=6subtitle]").html(data.books[6].subtitle);
    $("[id=6isbn13]").html(data.books[6].isbn13);
    $("[id=6price]").html(data.books[6].price);

    $("[id=7img]").attr("src",data.books[7].image);
    $("[id=7title]").html(data.books[7].title);
    $("[id=7subtitle]").html(data.books[7].subtitle);
    $("[id=7isbn13]").html(data.books[7].isbn13);
    $("[id=7price]").html(data.books[7].price);

    $("[id=8img]").attr("src",data.books[8].image);
    $("[id=8title]").html(data.books[8].title);
    $("[id=8subtitle]").html(data.books[8].subtitle);
    $("[id=8isbn13]").html(data.books[8].isbn13);
    $("[id=8price]").html(data.books[8].price);

    $("[id=9img]").attr("src",data.books[9].image);
    $("[id=9title]").html(data.books[9].title);
    $("[id=9subtitle]").html(data.books[9].subtitle);
    $("[id=9isbn13]").html(data.books[9].isbn13);
    $("[id=9price]").html(data.books[9].price);
});

$.getJSON("https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC", function(data){
    console.log(data);

    $("[id=gsImg]").attr("src",data.volumeInfo.imageLinks.small);
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

$.getJSON("https://www.googleapis.com/books/v1/volumes?q=modern%20web", function(data){
    console.log(data);

    $("[id=g0img]").attr("src",data.items[0].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g0title]").html(data.items[0].volumeInfo.title);
    $("[id=g0subtitle]").html(data.items[0].volumeInfo.subtitle);
    $("[id=g0isbn13]").html(data.items[0].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g0isbn10]").html(data.items[0].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g1img]").attr("src",data.items[1].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g1title]").html(data.items[1].volumeInfo.title);
    $("[id=g1subtitle]").html(data.items[1].volumeInfo.subtitle);
    $("[id=g1isbn13]").html(data.items[1].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g1isbn10]").html(data.items[1].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g2img]").attr("src",data.items[2].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g2title]").html(data.items[2].volumeInfo.title);
    $("[id=g2subtitle]").html(data.items[2].volumeInfo.subtitle);
    $("[id=g2isbn13]").html(data.items[2].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g2isbn10]").html(data.items[2].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g3img]").attr("src",data.items[3].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g3title]").html(data.items[3].volumeInfo.title);
    $("[id=g3subtitle]").html(data.items[3].volumeInfo.subtitle);
    $("[id=g3isbn13]").html(data.items[3].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g3isbn10]").html(data.items[3].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g4img]").attr("src",data.items[4].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g4title]").html(data.items[4].volumeInfo.title);
    $("[id=g4subtitle]").html(data.items[4].volumeInfo.subtitle);
    $("[id=g4isbn13]").html(data.items[4].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g4isbn10]").html(data.items[4].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g5img]").attr("src",data.items[5].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g5title]").html(data.items[5].volumeInfo.title);
    $("[id=g5subtitle]").html(data.items[5].volumeInfo.subtitle);
    $("[id=g5isbn13]").html(data.items[5].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g5isbn10]").html(data.items[5].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g6img]").attr("src",data.items[6].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g6title]").html(data.items[6].volumeInfo.title);
    $("[id=g6subtitle]").html(data.items[6].volumeInfo.subtitle);
    $("[id=g6isbn13]").html(data.items[6].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g6isbn10]").html(data.items[6].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g7img]").attr("src",data.items[7].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g7title]").html(data.items[7].volumeInfo.title);
    $("[id=g7subtitle]").html(data.items[7].volumeInfo.subtitle);
    $("[id=g7isbn13]").html(data.items[7].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g7isbn10]").html(data.items[7].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g8img]").attr("src",data.items[8].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g8title]").html(data.items[8].volumeInfo.title);
    $("[id=g8subtitle]").html(data.items[8].volumeInfo.subtitle);
    $("[id=g8isbn13]").html(data.items[8].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g8isbn10]").html(data.items[8].volumeInfo.industryIdentifiers[1].identifier);

    $("[id=g9img]").attr("src",data.items[9].volumeInfo.imageLinks.smallThumbnail);
    $("[id=g9title]").html(data.items[9].volumeInfo.title);
    $("[id=g9subtitle]").html(data.items[9].volumeInfo.subtitle);
    $("[id=g9isbn13]").html(data.items[9].volumeInfo.industryIdentifiers[0].identifier);
    $("[id=g9isbn10]").html(data.items[9].volumeInfo.industryIdentifiers[1].identifier);

});

hideAll();

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