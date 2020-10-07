console.log("milestone2");
function hideAll() {
    $("[id=bookList]").hide();
    $("[id=bookDetails]").hide();
    $("[id=bookshelf]").hide();
    $("[id=backBtn]").hide();
    $("[id=pageNumberRow]").hide();
}
hideAll();

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

let searchResultsJSON;
function search() {
    const searchTerms = $("[id=searchInput]").val();
    const url = formSearchURL(searchTerms);
    $.get(url, function (data) {
        searchResultsJSON = data;
        console.log(data);
    });

    showList();
}

let currentPage = 0;
function showList(pageNumber = currentPage) {
    hideAll();
    currentPage = pageNumber;

    console.log(pageNumber);
    console.log("set search results here");

    $("[id=bookList]").show();
    $("[id=pageNumberRow]").show();
}

function showDetails() {
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
