import axios from 'axios'
import AxiosServices1 from "../Axios/AxiosServices1";
import AxiosServices from "../Axios/AxiosServices";

var axiosService = new AxiosServices();

var axiosService1 = new AxiosServices1();

export function userRegistration(registrationDto) {
    console.log(registrationDto);
    return axiosService1.axiosPost(
        "http://localhost:8080/user/register",
        registrationDto, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }
    );
}


export function userLogin(loginDTO) {
    return axiosService.axiosPost(
        "http://localhost:8080/user/login",
        loginDTO, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }
    );
}

export function forgotPassword(forgotPasswordDto) {
    return axiosService.axiosPost(
        "http://localhost:8080/user/forgotpassword",
        forgotPasswordDto, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",

            },
        }
    );
}

export function resetPassword(resetPasswordDTO, token) {
    return axiosService.axiosPost(
        "http://localhost:8080/user/resetpassword?token=" + token,
        resetPasswordDTO, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                token: token,
            },
        }
    );
}