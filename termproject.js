let resultsJSON;
const SEARCH_METHOD = "search";
const POPULAR_METHOD = "popular"
const LIST_LAYOUT = "list";
const GRID_LAYOUT = "grid";
let currentMethod = SEARCH_METHOD;

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

    let url =`${URL_FRONT}${queryTerms}${URL_PAGE}${pageNumber}${URL_END}`;

    return url;
}

function firstSearch(button) {
    if(button==="search"){
        if(search(1)==-1){
            return;
        }
    }
    else if(button==="popular"){
        search(1,true);
    }
    $("[id=movieList]").show();
    $("[id=searchBtn]").attr("onclick","search(1)");
    $("[id=popularBtn]").attr("onclick","search(1,true)");
}

function search(pageNumber,popularBtn = false) {
    let url;
    if (popularBtn === true){
        url = `https://api.themoviedb.org/3/movie/popular?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US&page=${pageNumber}`;
        currentMethod = POPULAR_METHOD;
    }
    else if (popularBtn === false){
        if ($("[id=searchInput]").val()===""){
            return -1;
        }
        const searchTerms = $("[id=searchInput]").val();
        url = formSearchURL(searchTerms,pageNumber);
        currentMethod = SEARCH_METHOD;
    }
    console.log(url);
    console.log(currentMethod);

    $.get(url, function (data) {
        resultsJSON = data;
    }).then(function (response) {
        //hide details so searching after looking at bookshelf removes old details
        console.log(resultsJSON);
        populateList();
        populateGrid();
        populateNumberRow(resultsJSON.page, resultsJSON.total_pages)
    });
}


// function popular(pageNumber){
//     const url = `https://api.themoviedb.org/3/movie/popular?api_key=29c078526c3def639d7446d64fd1bee7&language=en-US&page=${pageNumber}`;

//     $.get(url, function (data) {
//         resultsJSON = data;
//     }).then(function (response) {
//         //hide details so searching after looking at bookshelf removes old details
//         console.log(resultsJSON);
//         populateList();
//         populateGrid();
//         populateNumberRow(resultsJSON.page, resultsJSON.total_pages)
//     });
// }

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

function populateNumberRow(currentPage, lastPage) {
    $("[id=pageNumberRow]").empty();

    const delta = 2;
    let leftEnd = currentPage - delta;
    let rightEnd = currentPage + delta + 1;
    let pageRange = [];
    let formattedPageRange = [];
    let temp;

    for (let i=1;i<=lastPage;i++){
        if (i == 1 || i == lastPage || i >= leftEnd && i < rightEnd) {
            pageRange.push(i);
        }
    }
    console.log(pageRange);

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
    console.log(formattedPageRange);

    for(let page of formattedPageRange){
        if (page == currentPage) {
            $("[id=pageNumberRow]").append(
                `<p class="pageNumber activePage" onclick="search(${page},${currentMethod===SEARCH_METHOD?false:true})">${page}</p>`
            );
        } else {
            $("[id=pageNumberRow]").append(
                `<p class="pageNumber" onclick="search(${page},${currentMethod===SEARCH_METHOD?false:true})">${page}</p>`
            );
        }
    }
}

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

$("[id=movieList]").hide();
$("[id=movieGrid]").hide();
