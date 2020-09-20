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

const itBooksList = $.getJSON("books/it-books-list.json", function(data){
    console.log(data);
});

const googleSingle = $.getJSON("https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC", function(data){
    console.log(data);
});

const googleList = $.getJSON("https://www.googleapis.com/books/v1/volumes?q=modern%20web", function(data){
    console.log(data);
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