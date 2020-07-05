const axios = require("axios");
export function getBookList(pageNo) {
    return axios({
        method: "get",
        url: "http://localhost:8080/bookstore/books/" + pageNo
    });
}

export function getSearchedBooks(attribute, pageNo) {
    return axios({
        method: "get",
        url: "http://localhost:8080/bookstore/search/" + attribute + "/" + pageNo
    });
}

export function getBooksCount(attribute) {
    return axios({
        method: "get",
        url: "http://localhost:8080/bookstore/count/" + attribute
    });
}

export function getSortAttribute() {
    return axios({
        method: "get",
        url: "http://localhost:8080/bookstore/sortattribute"
    });
}

export function getSortedBookList(attribute, pageNo) {
    return axios({
        method: "get",
        url: "http://localhost:8080/bookstore/sort/" + attribute + "/" + pageNo
    });
}

export function addOrderData(object) {
    return axios({
        method: "post",
        url: "http://localhost:8080/bookstore/customerbookdetails",
        data: object
    });
}