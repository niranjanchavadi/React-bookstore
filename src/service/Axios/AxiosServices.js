import axios from 'axios';
var url = "http://localhost:8080/";

export default class AxiosServices {
    axiosPost(url, data, token) {
        return axios.post(url, data, token);
    }

    axiosGet(url, data, token) {
        return axios.get(url, data, token);
    }

    axiosPut(url, data, token) {
        return axios.put(url, data, token);
    }

    axiosDelete(url, data, token) {
        return axios.delete(url, data, token);
    }

    Post(path, data, token) {
        return axios.post(url + path, data, token);
    }

    GET(path, data, token) {
        return axios.get(url + path, data, token);
    }

    PUT(path, data, token) {
        return axios.put(url + path, data, token)
    }

    DELETE(path, token) {
        return axios.delete(url + path, token);
    }

}