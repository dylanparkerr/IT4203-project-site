console.log("test");

const itBooksSingle = $.getJSON("books/it-books-single.json", function(data){
    console.log(data);
});
console.log(typeof(itBooksSingle));

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

        // $("[id=itbsImg]").attr("alt","test");
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