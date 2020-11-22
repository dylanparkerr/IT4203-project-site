// used to set the increment of results per load
const resultsIncrement = 10;
let currentNumResults = resultsIncrement;
// magic strings to let populateDetails() know what JSON to use
const SEARCH_JSON = 'search';
const RECOMMEND_JSON = 'recommend';
// store the JSON returned by a search for use when pulling detailed info
let searchResultsJSON;
// store the JSON returned from the bookshelf to keep seperate from search
let recommendJSON;
// using a current page lets the user click the back button to return
// to the same page they were on instead of re-running the search
const LIST_LAYOUT = 100;
const GRID_LAYOUT = 200;
let currentLayout = LIST_LAYOUT;



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
function search(numResults = 10, currentLayout = LIST_LAYOUT) {
    currentNumResults = numResults;
    //creates the API url dynamically 
    const searchTerms = $("[id=searchInput]").val();
    const url = formSearchURL(searchTerms);

    $.get(url, function (data) {
        searchResultsJSON = data;
        console.log(data);
    }).then(function (response) {
        showResults(currentNumResults,currentLayout,SEARCH_JSON);
    });
}

// retrieves the bookshelf JSON and displays it as a list
function recommend(){
    const maxRecomendResults = 5;
    const url = "https://www.googleapis.com/books/v1/users/108498590000483866475/bookshelves/1001/volumes?&key=AIzaSyAapv3F22n1UHUtHh5bnUKM3vHm62bfvXg"
    $.get(url, function (data) {
        recommendJSON = data;
        console.log(data);
    }).then(function (response) {
        showResults(maxRecomendResults,currentLayout,RECOMMEND_JSON);
        $("[id=loadMoreBtn]").hide();
        $("[id=backBtn]").show();
    });
}

//grab more the results from the JSON
function loadMore(){
    currentNumResults = (currentNumResults+resultsIncrement <= 40) ? currentNumResults+=resultsIncrement:currentNumResults;
    search(currentNumResults,currentLayout);
}

//changes which layout the user is using to view results
function changeLayout(layout){
    if(layout===LIST_LAYOUT){
        currentLayout = LIST_LAYOUT;
        $("[id=listOption]").addClass("activeLayout");
        $("[id=gridOption]").removeClass("activeLayout");
        $("[id=bookList]").show();
        $("[id=bookGrid]").hide();
    }else if(layout===GRID_LAYOUT){
        currentLayout = GRID_LAYOUT;
        $("[id=listOption]").removeClass("activeLayout");
        $("[id=gridOption]").addClass("activeLayout");
        $("[id=bookList]").hide();
        $("[id=bookGrid]").show();
    }
}

function back(){
    showResults(currentNumResults,currentLayout,SEARCH_JSON);
    $("[id=backBtn]").hide();
}

function showResults(numResults,currentLayout,jsonToUse) {
    populateList(numResults,jsonToUse);
    populateGrid(numResults,jsonToUse);
    changeLayout(currentLayout);
    $("[id=layoutBar]").show();
    $("[id=loadMoreBtn]").show();
}

// populate the list used for search results before displaying
function populateList(numResults,jsonToUse) {

    let sourceJSON;
    if(jsonToUse===SEARCH_JSON){
        sourceJSON = searchResultsJSON;
    }else if(jsonToUse===RECOMMEND_JSON){
        sourceJSON = recommendJSON;
    }

    $("[id=bookList]").empty();

    for (let i = 0; i < numResults; i++) {
        //create and populate list
        let listTemplate = ``
                        + `<div class="listBookRes" id="res${i}" onclick="showDetails(${i})">`
                            + `<p>{{volumeInfo.title}}</p>`
                        +`</div>`;
        $("[id=bookList]").append(
            Mustache.render(listTemplate,sourceJSON.items[i])
        ); 
    }   
}

function populateGrid(numResults,jsonToUse){
    let sourceJSON;
    if(jsonToUse===SEARCH_JSON){
        sourceJSON = searchResultsJSON;
    }else if(jsonToUse===RECOMMEND_JSON){
        sourceJSON = recommendJSON;
    }

    $("[id=bookGrid]").empty();

    const itemsPerRow =3;
    const numGridRows = Math.ceil(numResults/itemsPerRow);
    //create the correct number of grid rows
    for(let i = 0; i < numGridRows; i++){
        let = gridRowTemplate = `<div class="bookGridRow" id="bookGridRow${i}"></div>`
        $("[id=bookGrid]").append(gridRowTemplate); 
    }

    for (let i = 0; i < numResults; i++) {
        //create and populate grid results
        let resultRow = Math.floor(i/itemsPerRow);
        let gridResultTemplate = ``
                            + `<div class="colWrap" onclick="showDetails(${i})">`
                                + `<div class="bookGridCol">`
                                    + `<img id="gridImg${i}" src="#" alt="">`
                                    + `<p class="gridTitle">{{volumeInfo.title}}</p>`;
                                + +`</div>`
                            + +`</div>`;
        
        $(`[id=bookGridRow${resultRow}]`).append(
            Mustache.render(gridResultTemplate,sourceJSON.items[i])
        ); 
        //ensure there is an img in the JSON
        $(`[id=gridImg${i}]`).attr(
            "src",
            sourceJSON.items[i].volumeInfo.imageLinks
                ? sourceJSON.items[i].volumeInfo.imageLinks
                    .smallThumbnail
                : "/images/no-image-icon.png"
        );
    }
}

$("[id=bookList]").hide();
$("[id=bookGrid]").hide();
$("[id=layoutBar]").hide();
$("[id=loadMoreBtn]").hide();
$("[id=backBtn]").hide();


console.log(this);


