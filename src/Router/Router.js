import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from '../component/Login';
import ForgotPassword from "../component/ForgotPassword";
import Registration from "../component/Registration";
import ResetPassword from "../component/ResetPassword";
import UserDashboard from "../component/UserDashboard";
import SellerPage from "../component/SellerPage";

const Router = () => {
    return ( <
        BrowserRouter >

        <
        Route path = "/register"
        component = { Registration }
        /> <
        Route path = "/login"
        exact component = { Login }
        /> <
        Route path = "/forgotpassword"
        component = { ForgotPassword }
        />  <
        Route path = "/resetpassword"
        component = { ResetPassword }
        /> <
        Route path = "/"
        exact component = { UserDashboard }
        /> <
        Route path = "/seller"
        exact component = { SellerPage }
        />

        <
        /BrowserRouter>
    );
};

export default Router;