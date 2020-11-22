// used to set the number of results per page
const resultsPerPage = 10;
// magic strings to let populateDetails() know what JSON to use
const SEARCH_JSON = 'search';
const BOOKSHELF_JSON = 'bookshelf';
// store the JSON returned by a search for use when pulling detailed info
let searchResultsJSON;
// store the JSON returned from the bookshelf to keep seperate from search
let recommendJSON;
// using a current page lets the user click the back button to return
// to the same page they were on instead of re-running the search
const LIST_LAYOUT = 100;
const GRID_LAYOUT = 200;


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
    //creates the API url dynamically 
    const searchTerms = $("[id=searchInput]").val();
    const url = formSearchURL(searchTerms);

    $.get(url, function (data) {
        searchResultsJSON = data;
        console.log(data);
    }).then(function (response) {
        showList(10);
    });
}

// retrieves the bookshelf JSON and displays it as a list
function recommend(){
    const url = "https://www.googleapis.com/books/v1/users/108498590000483866475/bookshelves/1001/volumes?&key=AIzaSyAapv3F22n1UHUtHh5bnUKM3vHm62bfvXg"
    $.get(url, function (data) {
        recommendJSON = data;
        console.log(data);
    }).then(function (response) {
        showRecommend();
    });
}

function showList(numResults) {
 
    populateList(numResults,SEARCH_JSON);
    $("[id=bookList]").show();
}

// populate the list used for search results before displaying
function populateList(numResults,jsonToUse) {
    let sourceJSON;
    if(jsonToUse===SEARCH_JSON){
        sourceJSON = searchResultsJSON;
    }else if(jsonToUse===BOOKSHELF_JSON){
        sourceJSON = bookshelfJSON;
    }


    const itemsPerRow =3;
    const numGridRows = Math.ceil(numResults/itemsPerRow);
    console.log('grid rows' + numGridRows);

    for(let i = 0; i < numGridRows; i++){
        let = gridRowTemplate = `<div class="bookGridRow" id="bookGridRow${i}"></div>`
        $("[id=bookGrid]").append(gridRowTemplate); 
    }

    for (let i = 0; i < numResults; i++) {
    
        let listTemplate = ``
                        + `<div class="listBookRes" id="res${i}" onclick="showDetails(${i})">`
                            + `<p>{{volumeInfo.title}}</p>`
                        +`</div>`;

        $("[id=bookList]").append(
            Mustache.render(listTemplate,sourceJSON.items[i])
        ); 

        let resultRow = Math.floor(i/itemsPerRow);

        console.log(resultRow);
        let gridResultTemplate = ``
                            + `<div class="colWrap">`
                                + `<div class="bookGridCol">`
                                    + `<img id="gridImg${i}" src="#" alt="">`
                                    + `<p class="gridTitle">{{volumeInfo.title}}</p>`;
                                + +`</div>`
                            + +`</div>`;
        
        $(`[id=bookGridRow${resultRow}]`).append(
            Mustache.render(gridResultTemplate,sourceJSON.items[i])
        ); 

        $(`[id=gridImg${i}]`).attr(
            "src",
            sourceJSON.items[i].volumeInfo.imageLinks
                ? sourceJSON.items[i].volumeInfo.imageLinks
                    .smallThumbnail
                : "/images/no-image-icon.png"
        );
    }


    // for(let i=0;i<itemsPerRow;i++){
    //     $(`[id=gridimg${i}]`).attr(
    //         "src",
    //         sourceJSON.items[i].volumeInfo.imageLinks
    //             ? sourceJSON.items[i].volumeInfo.imageLinks
    //                 .smallThumbnail
    //             : "/images/no-image-icon.png"
    //     );
    //     $(`[id=gridTitle${i}]`).html(
    //         sourceJSON.items[i].volumeInfo.title ? sourceJSON.items[i].volumeInfo.title : ""
    //     );
    // }
    
    
}






