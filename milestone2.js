// used to set the number of results per page
const resultsPerPage = 10;
// store the JSON returned by a search for use when pulling detailed info
let searchResultsJSON;
// using a current page lets the user click the back button to return
// to the same page they were on instead of re running the search
let currentPage = 0;


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

function populateNumberRow(pageNumber) {
    let numberOfPages = Math.ceil(
        searchResultsJSON.items.length / resultsPerPage
    );

    $("[id=pageNumberRow]").empty();
    console.log(searchResultsJSON.items.length);

    for (let i = 0; i < numberOfPages; i++) {
        if (i == pageNumber) {
            $("[id=pageNumberRow]").append(
                `<p class="pageNumber activePage" onclick="showList(${i})">${
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
            `<div class="bookRes" id="res${i}" ></div>`
        );
        $(`[id=res${i}]`).append(
            `<img id="img${i}" src="-" alt="" />`,
            `<p id="title${i}"onclick="showDetails(${i})"></p>`
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

function populateDetails(index){
    $(`[id=detailsImg]`).attr(
        "src",
        searchResultsJSON.items[index].volumeInfo.imageLinks
            ? searchResultsJSON.items[index].volumeInfo.imageLinks
                  .smallThumbnail
            : "/images/no-image-icon.png"
    );
    $(`[id=detailsTitle]`).html(
        searchResultsJSON.items[index].volumeInfo.title
    );

    //clears previous value if the next book doesnt have one for
    $(`[id=detailsSubTitle]`).empty();
    $(`[id=detailsSubTitle]`).html(
        searchResultsJSON.items[index].volumeInfo.subtitle
    );
    $(`[id=detailsAuth]`).empty();
    $(`[id=detailsAuth]`).html(
        searchResultsJSON.items[index].volumeInfo.authors
    );
    $(`[id=detailsYear]`).empty();
    $(`[id=detailsYear]`).html(
        searchResultsJSON.items[index].volumeInfo.publishedDate
    );
    $(`[id=detailsISBN10]`).empty();
    $(`[id=detailsISBN10]`).html(
        searchResultsJSON.items[index].volumeInfo.industryIdentifiers[0].identifier
    );
    $(`[id=detailsISBN13]`).empty();
    $(`[id=detailsISBN13]`).html(
        searchResultsJSON.items[index].volumeInfo.industryIdentifiers[1].identifier
    );
    $(`[id=detailsLang]`).empty();
    $(`[id=detailsLang]`).html(
        searchResultsJSON.items[index].volumeInfo.language
    );
    $(`[id=detailsPages]`).empty();
    $(`[id=detailsPages]`).html(
        searchResultsJSON.items[index].volumeInfo.pageCount
    );
    $(`[id=detailsPub]`).empty();
    $(`[id=detailsPub]`).html(
        searchResultsJSON.items[index].volumeInfo.publisher
    );
    $(`[id=detailsCat]`).empty();
    $(`[id=detailsCat]`).html(
        searchResultsJSON.items[index].volumeInfo.categories
    );
    $(`[id=detailsMaturity]`).empty();
    $(`[id=detailsMaturity]`).html(
        searchResultsJSON.items[index].volumeInfo.maturityRating
    );
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
    const actualIndex = relativeIndex+(currentPage*resultsPerPage);

    populateDetails(actualIndex);

    $("[id=bookDetails]").show();
    $("[id=backBtn]").show();
}

function showBookshelf() {
    hideAll();

    console.log("set bookshelf results here");

    $("[id=bookshelf]").show();
    $("[id=backBtn]").show();
}

function hideAll() {
    $("[id=bookList]").hide();
    $("[id=bookDetails]").hide();
    $("[id=bookshelf]").hide();
    $("[id=backBtn]").hide();
    $("[id=pageNumberRow]").hide();
}


//initially hide the three main containers on the page
hideAll();
