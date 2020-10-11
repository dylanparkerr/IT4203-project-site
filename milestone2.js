// used to set the number of results per page
const resultsPerPage = 10;
// magic strings to let populateDetails() know what JSON to use
const SEARCH_JSON = 'search';
const BOOKSHELF_JSON = 'bookshelf';
// store the JSON returned by a search for use when pulling detailed info
let searchResultsJSON;
// store the JSON returned from the bookshelf to keep seperate from search
let bookshelfJSON;
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

// retrieves the search JSON and displays it as a list
function search() {
    currentPage = 0;
    //creates the API url dynamically 
    const searchTerms = $("[id=searchInput]").val();
    const url = formSearchURL(searchTerms);

    $.get(url, function (data) {
        searchResultsJSON = data;
        console.log(data);
    }).then(function (response) {
        showList();
    });
}

// retrieves the bookshelf JSON and displays it as a list
function bookshelf(){
    const url = "https://www.googleapis.com/books/v1/users/108498590000483866475/bookshelves/1001/volumes?&key=AIzaSyAapv3F22n1UHUtHh5bnUKM3vHm62bfvXg"
    $.get(url, function (data) {
        bookshelfJSON = data;
        console.log(data);
    }).then(function (response) {
        showBookshelf();
    });
}

// dynamically creates page numbers and highlights which page is actice
function populateNumberRow(pageNumber) {
    let numberOfPages = Math.ceil(
        searchResultsJSON.items.length / resultsPerPage
    );

    //clear the current numbers including the 'active' page before repopulating
    $("[id=pageNumberRow]").empty();

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

// populate the list used for search results before displaying
function populateList(pageNumber) {
    //ensures the corect number of book results are created based on the set results per page
    //needed for showing number of results per page that is not evenly divided into 40
    let numResultsToDisplay = resultsPerPage;
    let remainder = searchResultsJSON.items.length % resultsPerPage;
    if (
        remainder > 0 &&
        pageNumber ==
            Math.ceil(searchResultsJSON.items.length / resultsPerPage) - 1
    ) {
        numResultsToDisplay = remainder;
    }

    // offset to add to the relative index on the page to get the actual index in the JSON object
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
            `<p id="title${i}"onclick="showDetails(${i},'${SEARCH_JSON}')"></p>`
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

// populate the list used to show results on the bookshelf before displaying
function populateBookshelf(){
    const numOfBooks = bookshelfJSON.totalItems;

    // clear any old results before repopulating
    $("[id=bookshelf]").empty();

    for(let i=0;i<numOfBooks;i++){
        $("[id=bookshelf]").append(
            `<div class="bookRes" id="shelfRes${i}" ></div>`
        );
        $(`[id=shelfRes${i}]`).append(
            `<img id="shelfImg${i}" src="-" alt="" />`,
            `<p id="shelfTitle${i}"onclick="showDetails(${i},'${BOOKSHELF_JSON}')"></p>`
        );

        //populate the newly created elements
        $(`[id=shelfImg${i}]`).attr(
            "src",
            bookshelfJSON.items[i].volumeInfo.imageLinks
                ? bookshelfJSON.items[i].volumeInfo.imageLinks
                      .smallThumbnail
                : "/images/no-image-icon.png"
        );
        $(`[id=shelfTitle${i}]`).html(
            bookshelfJSON.items[i].volumeInfo.title
        );
    }
    //remove the bottom border that acts like a seperator from the last result
    $(`[id=shelfRes${numOfBooks - 1}]`).css("border-bottom", "none");
}

// populate the details from an entry before display
function populateDetails(index,jsonToUse){
    //sets the correct source JSON to use
    let sourceJSON;
    if(jsonToUse===SEARCH_JSON){
        sourceJSON = searchResultsJSON;
    }else if(jsonToUse===BOOKSHELF_JSON){
        sourceJSON = bookshelfJSON;
    }

    console.log(sourceJSON);
    //set each field on the details page if the entry has it
    $(`[id=detailsImg]`).attr(
        "src",
        sourceJSON.items[index].volumeInfo.imageLinks
            ? sourceJSON.items[index].volumeInfo.imageLinks
                  .smallThumbnail
            : "/images/no-image-icon.png"
    );
    $(`[id=detailsTitle]`).html(
        sourceJSON.items[index].volumeInfo.title ? sourceJSON.items[index].volumeInfo.title : ""
    );
    $(`[id=detailsSubTitle]`).html(
        sourceJSON.items[index].volumeInfo.subtitle ? sourceJSON.items[index].volumeInfo.subtitle : ""
    );
    $(`[id=detailsAuth]`).html(
        sourceJSON.items[index].volumeInfo.authors ? sourceJSON.items[index].volumeInfo.authors : ""
    );
    $(`[id=detailsYear]`).html(
        sourceJSON.items[index].volumeInfo.publishedDate ? sourceJSON.items[index].volumeInfo.publishedDate : ""
    );
    $(`[id=detailsISBN10]`).html(
        sourceJSON.items[index].volumeInfo.industryIdentifiers ? sourceJSON.items[index].volumeInfo.industryIdentifiers[1].identifier : ""
    );
    $(`[id=detailsISBN13]`).html(
        sourceJSON.items[index].volumeInfo.industryIdentifiers ? sourceJSON.items[index].volumeInfo.industryIdentifiers[0].identifier : ""
    );
    $(`[id=detailsLang]`).html(
        sourceJSON.items[index].volumeInfo.language ? sourceJSON.items[index].volumeInfo.language : ""
    );
    $(`[id=detailsPages]`).html(
        sourceJSON.items[index].volumeInfo.pageCount ? sourceJSON.items[index].volumeInfo.pageCount : ""
    );
    $(`[id=detailsPub]`).html(
        sourceJSON.items[index].volumeInfo.publisher ? sourceJSON.items[index].volumeInfo.publisher : ""
    );
    $(`[id=detailsCat]`).html(
        sourceJSON.items[index].volumeInfo.categories ? sourceJSON.items[index].volumeInfo.categories : ""
    );
    $(`[id=detailsMaturity]`).html(
        sourceJSON.items[index].volumeInfo.maturityRating ? sourceJSON.items[index].volumeInfo.maturityRating : ""
    );
}

// show the list of search results
// default paramenter indicates if no pageNumber is passed, use the currentPage
function showList(pageNumber = currentPage) {
    hideAll();
    currentPage = pageNumber;

    populateNumberRow(pageNumber);
    populateList(pageNumber);

    $("[id=bookList]").show();
    $("[id=pageNumberRow]").show();
}

// show the details pane for a given volume
function showDetails(relativeIndex, jsonToUse) {
    hideAll();
    let actualIndex;
    if(jsonToUse===SEARCH_JSON){
        actualIndex = relativeIndex+(currentPage*resultsPerPage);
    }else if(jsonToUse===BOOKSHELF_JSON){
        actualIndex = relativeIndex;
    }
    
    populateDetails(actualIndex,jsonToUse);

    $("[id=bookDetails]").show();
    $("[id=backBtn]").show();
}

// show the bookshelf results
function showBookshelf() {
    hideAll();

    populateBookshelf();

    $("[id=bookshelf]").show();
    $("[id=backBtn]").show();
}

// hide all the major divs and controls
function hideAll() {
    $("[id=bookList]").hide();
    $("[id=bookDetails]").hide();
    $("[id=bookshelf]").hide();
    $("[id=backBtn]").hide();
    $("[id=pageNumberRow]").hide();
}

//initially hide the three main containers on the page
hideAll();
