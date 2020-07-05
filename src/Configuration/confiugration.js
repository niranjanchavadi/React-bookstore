import axios from 'axios'

export function addBookConfiguration(object) {
    console.log("move---->", object);
    return axios({
        method: 'post',
        url: 'http://localhost:8080/bookstore/admin/addbook',
        data: {
            bookName: object.Title,
            authorName: object.Author,
            bookPrice: object.Price,
            noOfCopies: object.Stock,
            bookDetail: object.BookDetails,
            bookImageSrc: object.files,
            publishingYear: object.Year
        }
    })
}

export function addUploadConfiguration(formData) {
    return axios({
        url: 'http://localhost:8080/bookstore/admin/uploadimage',
        method: 'POST',
        data: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })
}