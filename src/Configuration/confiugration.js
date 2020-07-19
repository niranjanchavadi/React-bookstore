import axios from 'axios'
import AxiosService from "../service/Axios/AxiosServices";
var axiosService = new AxiosService();

const getBookByPriceAscURL = 'http://localhost:8080/user/getBooksByPriceAsc';
const getBookByPriceDescURL = 'http://localhost:8080/user/getBooksByPriceDesc';


export function addBookConfiguration(object, token) {
    console.log(object);
    console.log(token);
    return axiosService.axiosPost(
        " http://localhost:8080/sellers/addBook",
        object, {

            headers: { 'token': token },

        }
    );
}


export function addUploadConfiguration(formData) {
    console.log(formData);
    return axios({
        url: 'http://localhost:8080/sellers/addImg',
        method: 'POST',
        data: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function uploadFile(formData) {
    console.log(formData);
    return axios({
        url: 'http://localhost:8080/user/uploadFile',
        method: 'POST',
        data: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })
}


export const getBookByPriceAsc = async() => {
    const response = await axios.get(getBookByPriceAscURL);
    console.log(response)
    return response;
}
export const getBookByPriceDesc = async() => {
    const response = await axios.get(getBookByPriceDescURL);
    console.log(response)
    return response;
}

export function getBookDetails(bookId) {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/user/getbookdetails/' + bookId
    });
}