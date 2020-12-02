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