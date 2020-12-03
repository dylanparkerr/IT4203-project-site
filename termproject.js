let resultsJSON;

function formSearchURL(searchTerms) {
    const URL_FRONT = "https://api.themoviedb.org/3/search/movie?api_key=29c078526c3def639d7446d64fd1bee7&query=";
    let queryTerms = "";
    const URL_PAGE = "&page=";
    let pageNumber = 1;
    const URL_END = "&include_adult=false";
    const terms = searchTerms.split(" ");

    for (let i = 0; i < terms.length; i++) {
        queryTerms += terms[i];
        if (i < terms.length - 1) {
            queryTerms += "+";
        }
    }

    let url =`${URL_FRONT}${queryTerms}${URL_PAGE}${pageNumber}${URL_END}`;

    return url;
}

function search() {
    const searchTerms = $("[id=searchInput]").val();
    const url = formSearchURL(searchTerms);

    console.log(url);
    $.get(url, function (data) {
        resultsJSON = data;
    }).then(function (response) {
        //hide details so searching after looking at bookshelf removes old details
        console.log(resultsJSON);
        populateList();
        populateGrid();
    });
}


function popular(){
    let pageNumber = 1;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US&page=${pageNumber}`;

    console.log(url);
    $.get(url, function (data) {
        resultsJSON = data;
    }).then(function (response) {
        //hide details so searching after looking at bookshelf removes old details
        console.log(resultsJSON);
    });
}

function populateList() {

    $("[id=movieList]").empty();

    if(resultsJSON.results.length === 0){
        //todo
    }

    //create and populate list
    for (let i = 0; i < resultsJSON.results.length; i++) {
        //create containers for the number of results
        $("[id=movieList]").append(
            `<div class="movieListRes" id="listRes${i}" ></div>`
        );
        $(`[id=listRes${i}]`).append(
            `<p id="title${i}"onclick="showDetails()"></p>`
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

// populate the grid view for search results
function populateGrid(){
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
            `<div class="colWrap" id="colWrap${i}" onclick="showDetails()"></div>`
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
$.get("https://api.themoviedb.org/3/configuration?api_key=29c078526c3def639d7446d64fd1bee7", function (data) {
    console.log(data);
})