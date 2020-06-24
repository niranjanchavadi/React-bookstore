import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../CSS/Login.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CardContent from "@material-ui/core/CardContent";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Card from "@material-ui/core/Card";
import { userLogin } from "../services/UserService/UserServices";
import Snackbar from "@material-ui/core/Snackbar";
import Logo from '../assets/Logo.png';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      fullName: "",
      emailId: "",
      showPassword: "",
      snackbarMessage: "",
      snackbarOpen: false,
      errors: {},
    };
  }

  axios = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.password) {
      errors["password"] = "*Enter the password";
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter the password.",
      });
      formIsValid = false;
    }
    if (!this.state.emailId) {
      errors["emailId"] = "*Enter the correct emailId";
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter the correct emailId",
      });
      formIsValid = false;
    }
    if (this.state.password === "" || this.state.emailId === "") {
      errors["emailId"] = "*Please enter all fields";
      console.log(errors);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Login Failed! *please enter all fields ",
      });
      formIsValid = false;
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  

  loginForm = () => {
    if (this.validateForm()) {
      let user = {};
      user.emailId = this.state.emailId;
      user.password = this.state.password;

      userLogin(user)
        .then((response) => {
           console.log (response);
          localStorage.setItem("Token", response.data.message);
          localStorage.setItem("emailId", response.data.emailId);
          localStorage.setItem("FullName", response.data.fullName);
          this.setState({
            snackbarOpen: true,
            
            snackbarMessage: "*Login Successfull",
          });
          setTimeout(() => {
              this.props.history.push("/dashboard");
         }, 3000);
        })
        .catch((error) => {
          console.log("Error", error.response);
          console.log("*Login failed! invalid credentials");
          this.setState({
            snackbarOpen: true,
            snackbarMessage: "*Login failed! invalid credentials",
          });
        });
    }
  };

  render() {
    return (
      <Card className="login">
        <CardContent>
          <div className="loginpage" >
           <div>
           <div className="middle">
                  <img src ={Logo} width="25%" height="25%" alt="hello" />
            </div>
           <div className="signInLogin">
              {" "}
              <h3 style={{ color: "#A03037" ,textAlign:"center",marginLeft:"-95%"  }}>Login  &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="Register" onClick={() => this.props.history.push("/register")} style={{ color: "#A03037" }} >Register </a></h3> 
            
            </div>
            
           </div>

            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={3000}
              onClose={() => this.setState({ snackbarOpen: false })}
              message={this.state.snackbarMessage}
            ></Snackbar>

            <div>
              <div className="usernameLogin">
                <TextField
                  required
                  margin="dense"
                  name="emailId"
                  id="outlined-required"
                  variant="outlined"
                  style={{width: '90%'}}
                  label="Enter emailId"
                  error={this.state.errors.emailId}
                  helperText={this.state.errors.emailId}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sytle={{ width: "10px" }}>
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={this.axios}
                />
              </div>

              <div className="password">
                <TextField
                  required
                  size="small"
                  margin="dense"
                  name="password"
                  variant="outlined"
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  label="Password"
                  error={this.state.errors.password}
                  helperText={this.state.errors.password}
                  style={{width: '90%'}}
                  onChange={this.axios}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sytle={{ width: "10px" }}>
                        <IconButton
                          onClick={() =>
                            this.setState({
                              showPassword: !this.state.showPassword,
                            })
                          }
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          
            <div className="Forget" onClick={() => this.props.history.push("/forgotpassword")} marginRight="100%">
              <a href="ForgotPassword">ForgotPassword </a>
            </div>

            <div className="flex-container">
              <div>
                <Button
                  variant="contained"
                  onClick={this.loginForm}
                  style={{width: '350%',backgroundColor:'#A03037'}}
                >
                  Login
                </Button>
              </div>
              
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
export default Login;
