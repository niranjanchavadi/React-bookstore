import axios from 'axios';
var url = 'http://localhost:8080/';
// var url1 = "http://localhost:8080/user/getallBooks";

export default class AxiosServices1 {
    axiosPost(url, data) {
        return axios.post(url, data);
    }

    axiosGet(url) {
        return axios.get(url);
    }

    Post(path, data, token) {
        return axios.post(url + path, data, token);
    }

    GET(path, data, token) {
        return axios.get(url + path, data, token);
    }

    PUT(path, data, token) {
        return axios.put(url + path, data, token);
    }

    DELETE(path, token) {
        return axios.delete(url + path, token);
    }
}