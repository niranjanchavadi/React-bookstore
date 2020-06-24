import React, {Component} from 'react';
import "../CSS/Registration.css";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {userRegistration} from "../services/UserService/UserServices";
import Logo from '../assets/Logo.png';
 

class Registration extends Component {
  constructor (props) {
    super (props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      mobileNumber: '',
      errors: {},
    };
  }

  axios = event => {
    this.setState ({
      [event.target.name]: event.target.value,
    });
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!RegExp("^[A-Z][a-zA-Z]{3,20}$").test(this.state.fullName)) {
      errors['fullName'] = '*Enter the Valid full name';
      formIsValid = false;
    }
    if (!this.state.fullName) {
      errors['email'] = "*FullName name can not be empty";
      formIsValid = false;
    }
    
    if (!RegExp ("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\. [A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
        .test (this.state.email)
    ) {
      errors['email'] = "*Enter valid pattern e-mail id";
      formIsValid=false;
    }
    if (!this.state.email) {
      errors['email'] = "*E-mail id can not be empty";
      formIsValid = false;
    }
    if (!RegExp("^[6-9][0-9]{9}$").test(this.state.mobileNumber)) {
        errors['mobileNumber'] = "*Enter valid pattern Phone number";
    }
    if (!this.state.mobileNumber) {
        errors['mobileNumber'] = "*Phone number can not be empty";
        formIsValid = false
    }
    if (!RegExp("((?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!*]).{8,20})").test(this.state.password)) {
        errors['password'] = '*Enter the valid pattern password'
        formIsValid = false
    }
    if (!this.state.password) {
        errors['password'] = '*Password can not be empty'
        formIsValid = false
    }
   
    this.setState ({
      errors: errors,
    });
    return formIsValid;
  };

  registrationForm = () => {
    if (this.validateForm ()) {
      let user = {};
      user.fullName = this.state.fullName;
      user.email = this.state.email;
      user.password = this.state.password;
      user.mobileNumber = this.state.mobileNumber;
      console.log (user);

      userRegistration (user)
        .then (response => {
          console.log (response, "User registered successfully!!");
          alert ("User registered successfully");
          this.props.history.push("/login");
        })
        .catch (error => {
          console.log ('Error', error.response);
           alert ("User registration failed");
         
        });
    }
  };

  render () {
    return (
      <Card className="registercard" >
        <CardContent>
          <div className="backgroundregister">
            <div className="userregister">
            <div className="middle">
                  <img src ={Logo} width="25%" height="25%" alt="hello"  />
            </div>
              <div className="useronlinebookstore">
                <h2 style={{ color: "#A03037", size:"medium" }}>OnlineBookStore SignUp</h2>
              </div>
              <div className="usersignUp">Create BookStore Account</div>
              <div className="main" style={{flexDirection: 'row'}}>
                <div>
                  <div className="userfullName">
                    <TextField required margin="dense" color="secondary" size="large" name="fullName" variant="outlined"
                      id="outlined"
                      label="Full name"
                      style={{width: '100%'}}
                      onChange={this.axios}
                      error={this.state.errors.fullName}
                      helperText={this.state.errors.fullName}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end" color="secondary" sytle={{width: '10px'}}>
                           <PermIdentityIcon /> 
                        </InputAdornment>
                        ),
                       }}
                       
                    />

                  </div>
                  <div className="useremail1">
                    <TextField required  margin="dense" color="secondary" size="small"  name="email"  variant="outlined"
                      id="outlined"
                      label="E-mail"
                      style={{width: '100%'}}
                      onChange={this.axios}
                      error={this.state.errors.email}
                      helperText={this.state.errors.email}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end" sytle={{width: '10px'}}>
                           <MailOutlineIcon /> 
                        </InputAdornment>
                        ),
                       }}
                    />
                    
                  </div>
                  <div className="mobileNumber">
                    <TextField required margin="dense" color="secondary"  name="mobileNumber"  variant="outlined"
                      size="small"
                      id="outlined"
                      label="mobile Number"
                      style={{width: '100%'}}
                      onChange={this.axios}
                      error={this.state.errors.mobileNumber}
                      helperText={this.state.errors.mobileNumber}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end" sytle={{width: '10px'}}>
                           <PhoneIcon /> 
                        </InputAdornment>
                        ),
                       }}
                    />
                  </div>
                  <div className="userpassword">
                    <TextField required  margin="dense" color="secondary" size="small" name="password" variant="outlined"
                      id="outlined-adornment-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      label="Password"
                      style={{width: '100%'}}
                      onChange={this.axios}
                      error={this.state.errors.password}
                      helperText={this.state.errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sytle={{width: '10px'}}>
                            <IconButton  onClick={() => this.setState ({showPassword: !this.state.showPassword })} >
                               {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                     />
                  </div>
                  <p className="passwordline">
                    password should contain digits special char alphabets
                  </p>
                  <br />
                  <br />
                  <div className="userbutton">
                    <Button  margin="dense"  color="secondary"size="small" variant="contained"
                        onClick={() => this.props.history.push ('/')} 
                        style={{width: '100%'}}
                      >
                      Sign Up
                    </Button>
                    {/* <Button   margin="dense" color="secondary" size="small" variant="contained"
                       onClick={this.registrationForm} 
                      >
                       SUBMIT
                    </Button> */}
                  </div>
                </div>
                 
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default Registration;