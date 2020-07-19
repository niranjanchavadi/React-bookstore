import AxiosServices from '../service/Axios/AxiosServices';
import axios from 'axios';
import AxiosServices1 from '../service/Axios/AxiosServices1';

var axiosService1 = new AxiosServices1();
var axiosService = new AxiosServices();



export function getAllUnverifiedBookList(token) {
    return axiosService.axiosGet('http://localhost:8080/sellers/getUnverifiedBooks', {
        headers: { token: token },
    });
}


export function getAdminUnverifiedBookList(token) {
    return axiosService.axiosGet('http://localhost:8080/admin/getBooksForVerification', {
        headers: { token: token },
    });
}


export function getUserDashboardBookList() {
    return axiosService1.axiosGet('http://localhost:8080/user/getallBooks', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}




export function getAllItemsFromCart(token) {
    return axiosService.axiosGet('http://localhost:8080/user/getAllFromCart', {
        headers: {
            token: token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}

export function addToCart(cart, token) {

    let data = cart.bookId;
    return axiosService.axiosPost('http://localhost:8080/user/AddToCart?bookId=' + data, null, {
        headers: {
            token: token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}


export function addToWishlist(wishlist1, token) {
    let data = wishlist1.bookId;
    return axiosService.axiosPost('http://localhost:8080/user/addToWishlist?bookId=' + data, null, {
        headers: {
            token: token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

}










export function getWishListBooks(token) {
    return axiosService.axiosGet('http://localhost:8080/user/getWishListBooks', {
        headers: {
            token: token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}

export function addFromWishlistToCart(data, token) {

    return axiosService.axiosPut('http://localhost:8080/user/addFromWishlistToCart?bookId=' + data, null, {
        headers: {
            'token': token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}


export function deleteFromWishlist(data, token) {
    return axiosService.axiosDelete('http://localhost:8080/user/deleteFromWishlist?bookId=' + data, {
        headers: {
            'token': token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}







export function getUpdateBooks(updateBookDto, data, token) {

    return axiosService.axiosPut('http://localhost:8080/sellers/updateBook?bookId=' + data, updateBookDto, {
        headers: {
            token: token,
            'Content-Type': 'application/json;charset=utf-8',
        },

    });
}






export function getDeleteBooks(bookidnew, token) {
    return axiosService.axiosDelete('http://localhost:8080/sellers/DeleteBook?bookId=' + bookidnew.bookId, {
        headers: { token: token },
    });
}

export function bookVerification(cart, token) {
    console.log(token);
    return axios.put('http://localhost:8080/admin/bookVerification?bookId=' + cart.bookId, null, {
        headers: { token: token },
    });
}

export function bookUnVerification(bookidnew, token) {
    return axiosService.axiosPut('http://localhost:8080/admin/bookUnVerification?bookId=' + bookidnew.bookId, null, {
        headers: { token: token },
    });
}

export function addUserDetails(userDetailsDto, token) {
    return axiosService.axiosPost(' http://localhost:8080/user/addUserDetails', userDetailsDto, {
        headers: { token: token },
    });
}

export function removeBookFromCart(data, token) {
    return axiosService.axiosDelete('http://localhost:8080/user/removeFromCart?bookId=' + data, {
        headers: {
            'token': token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}

export function addMoreItems(data, token) {
    return axiosService.axiosPost('http://localhost:8080/user/addMoreItems?bookId=' + data, null, {
        headers: {
            'token': token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}

export function removeFromCart(data, token) {
    return axiosService.axiosPost('http://localhost:8080/user/removeFromCart?bookId=' + data, null, {
        headers: {
            'token': token,
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
}




export function findByAuthorname(search) {
    return axios.get('http://localhost:8080/user/findByauthorname?authorname=' + search, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

}


export function findByTitle(search) {
    return axios.get('http://localhost:8080/user/findbytitle?title=' + search, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

}

export function getOrderId() {
    return axios.get('http://localhost:8080/user/orderId', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

}