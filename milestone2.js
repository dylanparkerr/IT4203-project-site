console.log("milestone2");

function formSearchURL(searchTerms) {
    const URL_FRONT = "https://www.googleapis.com/books/v1/volumes?q=";
    const URL_BACK = "&key=AIzaSyAapv3F22n1UHUtHh5bnUKM3vHm62bfvXg";

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
}
