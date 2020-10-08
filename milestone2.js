function hideAll() {
    $("[id=bookList]").hide();
    $("[id=bookDetails]").hide();
    $("[id=bookshelf]").hide();
    $("[id=backBtn]").hide();
    $("[id=pageNumberRow]").hide();
}
hideAll();

//form the url used to call the Google Books api
function formSearchURL(searchTerms) {
    const URL_FRONT = "https://www.googleapis.com/books/v1/volumes?q=";
    const URL_BACK =
        "&maxResults=40&key=AIzaSyAapv3F22n1UHUtHh5bnUKM3vHm62bfvXg";
    const terms = searchTerms.split(" ");

    let url = "";
    url += URL_FRONT;
    for (let i = 0; i < terms.length; i++) {
        url += terms[i];
        if (i < terms.length - 1) {
            url += "+";
        }
    }
    url += URL_BACK;
    // console.log(url);
    return url;
}

// store the JSON returned by a search for use when pulling detailed info
let searchResultsJSON;
function search() {
    const searchTerms = $("[id=searchInput]").val();
    const url = formSearchURL(searchTerms);
    $.get(url, function (data) {
        searchResultsJSON = data;
        console.log(data);
    }).then(function (response) {
        showList();
    });

    //pretty sure i dont need these
    // currentPage = 0;
    // showList();
}

function populateList(pageNumber) {
    const resultsPerPage = 10;
    let pageOffset = pageNumber * resultsPerPage;

    // let i = 0;
    // $(`[id=img${i}]`).attr(
    //     "src",
    //     searchResultsJSON.items[i + pageOffset].volumeInfo.imageLinks
    //         .smallThumbnail
    // );
    // $(`[id=title${i}]`).html(
    //     searchResultsJSON.items[i + pageOffset].volumeInfo.title
    // );

    //empty any book results in the list before repopulating
    $("[id=bookList]").empty();

    for (let i = 0; i < resultsPerPage; i++) {
        //create containers for the number of results
        $("[id=bookList]").append(
            `<div class="bookRes" id="res${i}" onclick="showDetails(${i})"></div>`
        );
        $(`[id=res${i}]`).append(
            `<img id="img${i}" src="-" alt="" />`,
            `<a id="title${i}"></a>`
        );

        //populate the newly created elements
        $(`[id=img${i}]`).attr(
            "src",
            searchResultsJSON.items[i + pageOffset].volumeInfo.imageLinks
                .smallThumbnail
        );
        $(`[id=title${i}]`).html(
            searchResultsJSON.items[i + pageOffset].volumeInfo.title
        );
    }
}

//intialize current page to 0 so that the first call shows the first page
let currentPage = 0;
/*using a current page lets the user click the back button to return
to the same page they were on instead of re running the search

default paramenter indicates if no pageNumber param is passed, use the
currentPage*/
function showList(pageNumber = currentPage) {
    hideAll();
    currentPage = pageNumber;

    populateList(pageNumber);

    $("[id=bookList]").show();
    $("[id=pageNumberRow]").show();
}

function showDetails(relativeIndex) {
    hideAll();

    console.log("set book details here");

    $("[id=bookDetails]").show();
    $("[id=backBtn]").show();
}

function showBookshelf() {
    hideAll();

    console.log("set bookshelf results here");

    $("[id=bookshelf]").show();
    $("[id=backBtn]").show();
}

hideAll();
