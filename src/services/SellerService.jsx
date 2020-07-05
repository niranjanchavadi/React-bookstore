import Axios from 'axios'
import Constant from '../config/Constant'

export class SellerService {
    addbook=(e,data)=>{
        e.preventDefault();
        return  Axios({
            method:'post',
            url:`${Constant.apiUrl}admin/book`,
            data: data,
        })
    }

    displaybook=(page)=>{
        return Axios({
            method:'get',
            params:{PageNo:page,PageSize:8},
            url:`${Constant.apiUrl}books`,
        })
    }

    getCount=()=>{
        return Axios({
            method:'get',
            url:`${Constant.apiUrl}books/count`,
        })
    }

    searchAndFilter=(pageNo,searchText,filterName)=>{
        return Axios({
            method:'get',
            url:`${Constant.apiUrl}sort/${pageNo-1}/${searchText}/${filterName}`
        })
    }

    addToCart=(data)=>{
        // console.log("JWQ")
        // console.log(localStorage.getItem('Authorization'))
        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'post',
            url:`${Constant.apiUrl}cart`,
            data: data,
        })
    }

    myCart=()=>{
        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'get',
            url:`${Constant.apiUrl}cart`
        })
    }

    remove=(id)=>{
        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'delete',
            url:`${Constant.apiUrl}cart/${id}`
        })
    }

    updateCart=(cartValues)=>{
        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'put',
            url:`${Constant.apiUrl}cart`,
            data:cartValues
        })
    }

    customerEmail=(data)=>{
        return Axios({
            method:'post',
            url:`${Constant.apiUrl}send`,
            data:data
        })
    }

    uploadFile=(formData)=>{
        return Axios({
            method:'post',
            data:formData,
            url:`${Constant.apiUrl}admin/books/image`
        })
    }

    resgister=(registerData)=>{
        console.log(registerData)
        return Axios({
            method:'post',
            url:`${Constant.apiUrl}user/register`,
            data:registerData
        })
    }

    login=(loginData)=>{
        console.log("data: ")
        console.log(loginData)
        return Axios({
            method:'post',
            url:`${Constant.apiUrl}user/login`,
            data:loginData
        })
    }

    userDetails=()=>{
        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'get',
            url:`${Constant.apiUrl}user/customer`,
        })
    }

    placedOrder=(totalprice)=>{
        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'post',
            params:{totalprice:totalprice},
            url:`${Constant.apiUrl}order`,
        })
    }

    getDetails=(data)=>{

        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'post',
            url:`${Constant.apiUrl}user/customer`,
            data:data
        })
    }

    myOrder=()=>{
        return Axios({
            headers:{token: localStorage.getItem('Authorization')},
            method:'get',
            url:`${Constant.apiUrl}order`,
        })
    }

    forgetPassword=(emailID)=>{
        return Axios({
            method:'post',
            params:{emailID:emailID},
            url:`${Constant.apiUrl}user/forget/password`,
        })
    }

    resetPassword=(password,token)=>{
        return Axios({
            method:'post',
            params:{password:password,token:token},
            url:`${Constant.apiUrl}user/confirm/password/`,
        })
    }

    verifyEmail=(token)=>{
        return Axios({
            method:'post',
            params:{token:token},
            url:`${Constant.apiUrl}user/verify/mail`
        })
    }

    resendMail=(emailID)=>{
        return Axios({
            method:'post',
            // params:{emailID: emailID},
            url:`${Constant.apiUrl}user/resend/email/${emailID}`
        })
    }


}
