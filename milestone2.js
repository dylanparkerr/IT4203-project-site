// used to set the number of results per page
const resultsPerPage = 10;
// store the JSON returned by a search for use when pulling detailed info
let searchResultsJSON;
// using a current page lets the user click the back button to return
// to the same page they were on instead of re running the search
let currentPage = 0;

function hideAll() {
    $("[id=bookList]").hide();
    $("[id=bookDetails]").hide();
    $("[id=bookshelf]").hide();
    $("[id=backBtn]").hide();
    $("[id=pageNumberRow]").hide();
}

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
    return url;
}

function search() {
    const searchTerms = $("[id=searchInput]").val();
    const url = formSearchURL(searchTerms);

    $.get(url, function (data) {
        searchResultsJSON = data;
        console.log(data);
    }).then(function (response) {
        showList();
    });
}

function populateList(pageNumber) {
    let numResultsToDisplay = resultsPerPage;
    let remainder = searchResultsJSON.items.length % resultsPerPage;
    if (
        remainder > 0 &&
        pageNumber ==
            Math.ceil(searchResultsJSON.items.length / resultsPerPage) - 1
    ) {
        numResultsToDisplay = remainder;
    }

    let pageOffset = pageNumber * resultsPerPage;

    //empty any book results in the list before repopulating
    $("[id=bookList]").empty();

    for (let i = 0; i < numResultsToDisplay; i++) {
        //create containers for the number of results
        $("[id=bookList]").append(
            `<div class="bookRes" id="res${i}" onclick="showDetails(${i})"></div>`
        );
        $(`[id=res${i}]`).append(
            `<img id="img${i}" src="-" alt="" />`,
            `<p id="title${i}"></p>`
        );

        //populate the newly created elements
        $(`[id=img${i}]`).attr(
            "src",
            searchResultsJSON.items[i + pageOffset].volumeInfo.imageLinks
                ? searchResultsJSON.items[i + pageOffset].volumeInfo.imageLinks
                      .smallThumbnail
                : "/images/no-image-icon.png"
        );
        $(`[id=title${i}]`).html(
            searchResultsJSON.items[i + pageOffset].volumeInfo.title
        );
    }
    //remove the bottom border that acts like a seperator from the last result
    $(`[id=res${numResultsToDisplay - 1}]`).css("border-bottom", "none");
}

function populateNumberRow(pageNumber) {
    let numberOfPages = Math.ceil(
        searchResultsJSON.items.length / resultsPerPage
    );

    $("[id=pageNumberRow]").empty();
    console.log(searchResultsJSON.items.length);

    for (let i = 0; i < numberOfPages; i++) {
        if (i === pageNumber) {
            $("[id=pageNumberRow]").append(
                `<p class="pageNumber" class="activePage" onclick="showList(${i})">${
                    i + 1
                }</p>`
            );
        } else {
            $("[id=pageNumberRow]").append(
                `<p class="pageNumber" onclick="showList(${i})">${i + 1}</p>`
            );
        }
    }
}

// default paramenter indicates if no pageNumber is passed, use the currentPage
function showList(pageNumber = currentPage) {
    hideAll();
    currentPage = pageNumber;

    populateNumberRow(pageNumber);
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

//initially hide the three main containers on the page
hideAll();
