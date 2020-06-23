import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Login from '../component/Login';
import ForgotPassword from "../component/ForgotPassword";
 
const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />

   </BrowserRouter>
  );
};

export default Router;
