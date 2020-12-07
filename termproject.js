//global JSON storage
let resultsJSON;
//magic strings for search methods
const SEARCH_METHOD = "search";
const POPULAR_METHOD = "popular"
const DISCOVER_METHOD = "discover";
//global tracking of current search method
let currentMethod = SEARCH_METHOD;

//magic strings for layour views
const LIST_LAYOUT = "list";
const GRID_LAYOUT = "grid";

//forms url with search terms 
function formSearchURL(searchTerms, pageNumber) {
    const URL_FRONT = "https://api.themoviedb.org/3/search/movie?api_key=29c078526c3def639d7446d64fd1bee7&query=";
    let queryTerms = "";
    const URL_PAGE = "&page=";
    const URL_END = "&include_adult=false";
    const terms = searchTerms.split(" ");

    for (let i = 0; i < terms.length; i++) {
        queryTerms += terms[i];
        if (i < terms.length - 1) {
            queryTerms += "+";
        }
    }

    return `${URL_FRONT}${queryTerms}${URL_PAGE}${pageNumber}${URL_END}`;
}

//forms url based on user input from drop down selects
function formDiscoverURL(pageNumber){
    const URL_FRONT = "https://api.themoviedb.org/3/discover/movie?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US&sort_by="
    const sort = $("#sortList option:selected").val();
    const direction = $("#sortDirection option:selected").val();
    const URL_MIDDLE = "&include_adult=false&page=";
    const URL_GENRE = "&with_genres=";
    const genre = $("#genreList option:selected").val();

    return `${URL_FRONT}${sort}.${direction}${URL_MIDDLE}${pageNumber}${URL_GENRE}${genre}`;
}

//fetches JSON object from TMDb api
function search(pageNumber,searchMethod = SEARCH_METHOD) {
    let url;
    
    //form API url based on the search method
    if (searchMethod === POPULAR_METHOD){
        url = `https://api.themoviedb.org/3/movie/popular?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US&page=${pageNumber}`;
        currentMethod = POPULAR_METHOD;
    }
    else if (searchMethod === SEARCH_METHOD){
        if ($("[id=searchInput]").val()===""){
            return -1;
        }
        const searchTerms = $("[id=searchInput]").val();
        url = formSearchURL(searchTerms,pageNumber);
        currentMethod = SEARCH_METHOD;
    }
    else if(searchMethod === DISCOVER_METHOD){
        url = formDiscoverURL(pageNumber);
        currentMethod = DISCOVER_METHOD;
    }

    //retrieve the movie results
    $.get(url, function (data) {
        resultsJSON = data;
    }).then(function (response) {
        //populate views with results and pagination view
        populateList();
        populateGrid();
        populateNumberRow(resultsJSON.page, resultsJSON.total_pages)
        // console.log(resultsJSON);
    });
}

// first search after loading the page is necessary because some things are initially hidden
function firstSearch(button) {
    if(button==="search"){
        //this will run the call, and return -1 if no search terms are provided
        //resulting in no action
        if(search(1,SEARCH_METHOD)===-1){
            return;
        }
    }
    else if(button==="popular"){
        search(1,POPULAR_METHOD);
    }
    else if(button==="discover"){
        search(1,DISCOVER_METHOD);
    }

    //initiall view is the list view, redifine button click functions
    $("[id=movieList]").show();
    $("[id=searchBtn]").attr("onclick","search(1,SEARCH_METHOD)");
    $("[id=popularBtn]").attr("onclick","search(1,POPULAR_METHOD)");
    $("[id=discoverBtn]").attr("onclick","search(1,DISCOVER_METHOD)");
    $("[id=layoutBar]").show();
}

//populates the list view with movie results
function populateList() {
    //empty any previous results before loading new ones
    $("[id=movieList]").empty();

    //can only happen from search term, results in no diplay
    if(resultsJSON.results.length === 0){
        return;
    }

    //create and populate list
    for (let i = 0; i < resultsJSON.results.length; i++) {
        //create containers for the number of results
        $("[id=movieList]").append(
            `<div class="movieListRes" id="listRes${i}" ></div>`
        );
        $(`[id=listRes${i}]`).append(
            `<p id="title${i}"onclick="showDetails(${i})"></p>`
        );

        //populate the newly created elements
        $(`[id=title${i}]`).html(
            resultsJSON.results[i].title
        );
    }
    //remove the bottom border that acts like a seperator from the last result
    $(`[id=res${resultsJSON.results.length - 1}]`).css("border-bottom", "none");
    $(`[id=res${resultsJSON.results.length - 1}]`).css("border-radius", "0px 0px 10px 10px");
}

//populates grid view with results
function populateGrid(){
    //empty any previous results before loading new ones
    $("[id=movieGrid]").empty();

    const itemsPerRow =3;
    const numGridRows = Math.ceil(resultsJSON.results.length/itemsPerRow);
    //create the correct number of grid rows
    for(let i = 0; i < numGridRows; i++){
        $("[id=movieGrid]").append(
            `<div class="movieGridRow" id="movieGridRow${i}"></div>`
        ); 
    }

    //create and populate grid results
    for (let i = 0; i < resultsJSON.results.length; i++) {
        //find what row a given index should be located in
        let resultRow = Math.floor(i/itemsPerRow);
        
        $(`[id=movieGridRow${resultRow}]`).append(
            `<div class="colWrap" id="colWrap${i}" onclick="showDetails(${i})"></div>`
        ); 
        $(`[id=colWrap${i}]`).append(
            `<div class="movieGridCol" id="gridRes${i}"></div>`
        );
        $(`[id=gridRes${i}]`).append(
            `<img id="gridImg${i}" src="#" alt="">
            <p class="gridTitle">${resultsJSON.results[i].title}</p>`
        );

        const url = `http://image.tmdb.org/t/p/w154${resultsJSON.results[i].poster_path}`
        // ensure the result has an image
        $(`[id=gridImg${i}]`).attr(
            "src",
            resultsJSON.results[i].poster_path ? 
            url:
            "/images/no-image-icon.png"
        );
    }
}

//dynamically change the page numbers shown based on what page the user is looking at.
function populateNumberRow(currentPage, lastPage) {
    //empty previous pages numbers before loading new ones
    $("[id=pageNumberRow]").empty();

    const delta = 2;
    let leftEnd = currentPage - delta;
    let rightEnd = currentPage + delta + 1;
    let pageRange = [];
    let formattedPageRange = [];
    let temp;

    //add the page numbers
    for (let i=1;i<=lastPage;i++){
        if (i == 1 || i == lastPage || i >= leftEnd && i < rightEnd) {
            pageRange.push(i);
        }
    }

    //add ellipses where necessary
    for (let i of pageRange) {
        if (temp) {
            if (i - temp === 2) {
                formattedPageRange.push(temp + 1);
            } else if (i - temp !== 1) {
                formattedPageRange.push('...');
            }
        }
        formattedPageRange.push(i);
        temp = i;
    }

    //format active page and format search functions
    for(let page of formattedPageRange){
        if (page == currentPage) {
            $("[id=pageNumberRow]").append(
                `<p class="pageNumber activePage" onclick="search(${page},'${currentMethod}')">${page}</p>`
            );
        } else {
            $("[id=pageNumberRow]").append(
                `<p class="pageNumber" onclick="search(${page},'${currentMethod}')">${page}</p>`
            );
        }
    }
}

//changes between result layout views
function changeLayout(layout){
    if(layout===LIST_LAYOUT){
        currentLayout = LIST_LAYOUT;
        $("[id=listOption]").addClass("activeLayout");
        $("[id=gridOption]").removeClass("activeLayout");
        $("[id=movieList]").show();
        $("[id=movieGrid]").hide();
    }else if(layout===GRID_LAYOUT){
        currentLayout = GRID_LAYOUT;
        $("[id=listOption]").removeClass("activeLayout");
        $("[id=gridOption]").addClass("activeLayout");
        $("[id=movieList]").hide();
        $("[id=movieGrid]").show();
    }
}

//creates popup details modal window
function showDetails(i){
    $("[id=detailsModal]").css("display","block");
    $(`[id=movie-details]`).show();
    $(`[id=credit-details]`).hide();
    $(`[id=review-details]`).hide();
    $(`[id=detailsBack]`).hide();

    const imgURL = `http://image.tmdb.org/t/p/w154${resultsJSON.results[i].poster_path}`
    $(`[id=detailsImg]`).attr(
        "src",
        resultsJSON.results[i].poster_path ? 
        imgURL:
        "/images/no-image-icon.png"
    );

    $(`[id=movieTitle]`).html(
        resultsJSON.results[i].title ? resultsJSON.results[i].title : ""
    );

    $(`[id=detailsTitle]`).html(
        resultsJSON.results[i].title ? resultsJSON.results[i].title : ""
    );
    $(`[id=detailsOGTitle]`).html(
        resultsJSON.results[i].original_title ? resultsJSON.results[i].original_title : ""
    );
    $(`[id=detailsReleaseDate]`).html(
        resultsJSON.results[i].release_date ? resultsJSON.results[i].release_date : ""
    );
    $(`[id=detailsRating]`).html(
        resultsJSON.results[i].vote_average ? resultsJSON.results[i].vote_average : ""
    );
    $(`[id=detailsNumRatings]`).html(
        resultsJSON.results[i].vote_count ? resultsJSON.results[i].vote_count : ""
    );
    $(`[id=detailsPop]`).html(
        resultsJSON.results[i].popularity ? resultsJSON.results[i].popularity : ""
    );
    $(`[id=detailsOverview]`).html(
        resultsJSON.results[i].overview ? resultsJSON.results[i].overview : ""
    );
    
    //populate the hidden cast and reviews divs for the modal based on the movie selected
    populateCredits(resultsJSON.results[i].id);
    populateReviews(resultsJSON.results[i].id);
}

//closes modal window
function closeDetails(){
    document.getElementById("detailsModal").style.display = "none";
    $(`[id=creditsTable]`).empty();
    $(`[id=review-details]`).empty();
}

//populates modal table with list of cast members for a given movie
function populateCredits(id){
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US`;
    let creditsJSON;

    $.get(url, function (data) {
       creditsJSON = data;
    }).then(function (response) {
        // console.log(creditsJSON);
        $(`[id=castLink]`).html(`Cast (${creditsJSON.cast.length})`);
        for(let i=0;i<creditsJSON.cast.length;i++){
            $(`[id=creditsTable]`).append(`<tr><td onclick="populatePersonDetails(${creditsJSON.cast[i].id})">${creditsJSON.cast[i].name}</td></tr>`)
        }
        //initially populate the details area with the first cast members info
        populatePersonDetails(creditsJSON.cast[0].id)
    });
}

//populates modal table with cast memeber details when a user clicks on a cast memeber
function populatePersonDetails(id){
    let url = `https://api.themoviedb.org/3/person/${id}?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US`
    let personJSON;

    $.get(url, function (data) {
       personJSON = data;
    }).then(function (response) {
        // console.log(personJSON);
        $(`[id=personName]`).html(personJSON.name);
        $(`[id=personBirthday]`).html(
            personJSON.birthday ? personJSON.birthday : ""
        );
        $(`[id=personPlaceOfBirth]`).html(
            personJSON.place_of_birth ? personJSON.place_of_birth : ""
        );
        $(`[id=personDeathDate]`).html(
            personJSON.deathday ? personJSON.deathday : ""
        );
        $(`[id=personPop]`).html(
            personJSON.popularity ? personJSON.popularity : ""
        );
        $(`[id=personBio]`).html(
            personJSON.biography ? personJSON.biography : ""
        );
    });
}

//populates the reviews modal screen based on the movie the user has selected
function populateReviews(id){
    let url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US`
    let reviewsJSON;

    $.get(url, function (data) {
       reviewsJSON = data;
    }).then(function (response) {
        // console.log(reviewsJSON);
        $(`[id=reviewsLink]`).html(`Reviews (${reviewsJSON.results.length})`);

        if(reviewsJSON.results.length===0){
            $(`[id=review-details]`).append(`<h1 style="text-align:center;">No reviews available</h1>`);
        }else{
            $(`[id=review-details]`).append(`<h1>Reviews</h1>`);
        }

        for(let i=0;i<reviewsJSON.results.length;i++){
            $(`[id=review-details]`).append(`<div class="review" id="review${i}"></div>`);
            $(`[id=review${i}]`).append(`<h3>Author: ${
                reviewsJSON.results[i].author ? reviewsJSON.results[i].author :""
            }</h3>`);
            $(`[id=review${i}]`).append(`<p >Rating: ${
                reviewsJSON.results[i].author_details.rating ? reviewsJSON.results[i].author_details.rating : ""
            }</p>`);
            $(`[id=review${i}]`).append(`<p>Review: ${
                reviewsJSON.results[i].content ? reviewsJSON.results[i].content : ""
            }</p>`);
        }
    });
}

//shows the cast list and details on the modal screen
function showCredits(){
    $(`[id=movie-details]`).hide();
    $(`[id=credit-details]`).show();
    $(`[id=review-details]`).hide();
    $(`[id=detailsBack]`).show();
}

//shows the reviews for a given movie on the modal screen
function showReviews(){
    $(`[id=movie-details]`).hide();
    $(`[id=credit-details]`).hide();
    $(`[id=review-details]`).show();
    $(`[id=detailsBack]`).show();
}

//allows the user to return to the movie details screen from the cast or reviews screen
function backtoDetails(){
    $(`[id=movie-details]`).show();
    $(`[id=credit-details]`).hide();
    $(`[id=review-details]`).hide();
    $(`[id=detailsBack]`).hide();
}

//initially hide some page elements
$("[id=movieList]").hide();
$("[id=movieGrid]").hide();
$("[id=layoutBar]").hide();
