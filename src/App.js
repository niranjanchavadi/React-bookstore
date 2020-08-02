import React from 'react';
import './App.css';
// import BookStoreFronPage from './components/BookStoreFronPage';

import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';

import Footer from './components/Footer/Footer';

import Wishlist from './components/Whishlist/Wishlist';
import Admin from './components/Admin/Admin';
import Cart from './components/Cart/Cart';
import Dashboard from './components/UserDashboard/Dashboard';
import ForgotPassword from './components/UserRegistration/ForgotPassword';
import Login from './components/UserRegistration/Login';
import Logout from './components/UserRegistration/Logout';
import { OrderSuccessfull } from './components/Order/OrderSuccessfull';
import Registration from './components/UserRegistration/Registration';
import ResetPassword from './components/UserRegistration/ResetPassword';
import SellerPage from './components/Sellerfiles/SellerPage';
import VerificationSuccessful from './components/UserRegistration/Verification';

function App() {
    let token = localStorage.getItem('Token') ? true : false;
    let roletype = localStorage.getItem('RoleType');
    return ( <
        div className = "appDiv" >
        <
        BrowserRouter >
        <
        Route path = { '/' }
        exact component = { Dashboard }
        />{' '} <
        Route path = { '/ordersuccessfull/:orderId' }
        exact component = { OrderSuccessfull }
        />{' '} <
        Route path = { '/register' }
        component = { Registration }
        /> <
        Route path = { '/login' }
        exact component = { Login }
        />{' '} <
        Route path = { '/forgotpassword' }
        component = { ForgotPassword }
        />{' '} <
        Route path = { '/resetpassword' }
        component = { ResetPassword }
        />{' '} { /* {token && roletype === 'SELLER' &&  */ } <
        Route path = { '/seller' }
        component = { SellerPage }
        /> { /* {token && roletype === 'ADMIN' &&  */ } <
        Route path = { '/admin' }
        exact component = { Admin }
        /> <
        Route path = { '/cart' }
        exact component = { Cart }
        /> <
        Route path = "/logout"
        component = { Logout }
        /> <
        Route path = "/wishlist"
        component = { Wishlist }
        />{' '} <
        Route path = "/verify/:token"
        component = { VerificationSuccessful }
        /> <
        /BrowserRouter>{' '} <
        Footer / >
        <
        /div>
    );
}

export default App;