import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import '../../css/ResetPassword.css';
import { resetPassword } from '../../service/UserService/UserServices';
import Logo from '../../asserts/Logo.png';

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            showPassword: '',
            snackbarMessage: '',
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

        if (!RegExp('((?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!*]).{8,20})').test(this.state.password)) {
            errors['password'] = '*Enter the valid password';
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Enter the valid password',
            });
            formIsValid = false;
        }
        if (!this.state.password) {
            errors['password'] = '*Enter the password';
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Enter the password',
            });
            formIsValid = false;
        }
        if (!RegExp('((?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%!*]).{8,20})').test(this.state.confirmPassword)) {
            errors['confirmPassword'] = '*Enter the valid confirm password';
            this.setState({
                snackbarOpen: true,
                snackbarMessage: '*Enter the valid confirm password',
            });
            formIsValid = false;
        }
        if (!this.state.confirmPassword) {
            errors['confirmPassword'] = '*Enter the confirm password';
            this.setState({
                snackbarOpen: true,
                snackbarMessage: '*Enter the confirm password',
            });
            formIsValid = false;
        }
        if (this.state.password !== this.state.confirmPassword) {
            errors['confirmPassword'] = "*Password doesn't match";
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "*Password doesn't match",
            });
            formIsValid = false;
        }

        this.setState({
            errors: errors,
        });
        return formIsValid;
    };

    resetPasswordForm = () => {
        if (this.validateForm()) {
            let token = localStorage.getItem('Token');
            console.log(token, 'token');
            let user = {};
            user.password = this.state.password;
            user.confirmPassword = this.state.confirmPassword;
            console.log(user);

            resetPassword(user, token)
                .then((Response) => {
                    console.log('Password Successfully Changed');
                    localStorage.removeItem('Token');
                    this.setState({
                        // snackbarOpen: true,
                        // snackbarMessage: '*Password Successfully Changed',
                    });

                    this.props.history.push('/login');
                })
                .catch((error) => {
                    console.log('Error', error.response);
                    console.log(error.response.data.message, 'Failed To Change the Password');
                    this.setState({
                        // snackbarOpen: true,
                        // snackbarMessage: '*Failed To Change the Password',
                    });
                });
        }
    };

    render() {
        return ( <
            Card className = "reset" >
            <
            CardContent >
            <
            div className = "resetpasswordpage" >
            <
            div className = "middle" >
            <
            img src = { Logo }
            width = "25%"
            height = "25%"
            alt = "hello" / >
            <
            /div>{' '} <
            div className = "resetpassword" >
            <
            span > Reset Password < /span>{' '} <
            /div>{' '} <
            Snackbar anchorOrigin = {
                {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            }
            open = { this.state.snackbarOpen }
            autoHideDuration = { 3000 }
            onClose = {
                () => this.setState({ snackbarOpen: false }) }
            message = { this.state.snackbarMessage } > { ' ' } <
            /Snackbar>{' '} <
            br / >
            <
            div className = "passwordtext" >
            <
            TextField required margin = "dense"
            color = "secondary"
            label = "New Password"
            size = "small"
            name = "password"
            variant = "outlined"
            id = "outlined-adornment-password"
            type = { this.state.showPassword ? 'text' : 'password' }
            style = {
                { width: '75%' } }
            error = { this.state.errors.password }
            helperText = { this.state.errors.password }
            onChange = { this.axios }
            InputProps = {
                {
                    endAdornment: ( <
                        InputAdornment position = " end " >
                        <
                        IconButton onClick = {
                            () =>
                            this.setState({ showPassword: !this.state.showPassword })
                        }
                        edge = "end" > { ' ' } { this.state.showPassword ? < Visibility / > : < VisibilityOff / > } { ' ' } <
                        /IconButton>{' '} <
                        /InputAdornment>
                    ),
                }
            }
            />{' '} <
            /div>{' '} <
            div className = "confirmpasswordtext" >
            <
            TextField required margin = "dense"
            color = "secondary"
            size = "small"
            name = "confirmPassword"
            variant = "outlined"
            // id="standard-adornment-password"
            type = { this.state.showPassword ? 'text' : 'password' }
            label = "Confirm Password"
            style = {
                { width: '75%' } }
            onChange = { this.axios }
            error = { this.state.errors.confirmPassword }
            helperText = { this.state.errors.confirmPassword }
            InputProps = {
                {
                    endAdornment: ( <
                        InputAdornment position = " end " >
                        <
                        IconButton onClick = {
                            () =>
                            this.setState({ showPassword: !this.state.showPassword })
                        }
                        edge = "end" > { ' ' } { this.state.showPassword ? < Visibility / > : < VisibilityOff / > } { ' ' } <
                        /IconButton>{' '} <
                        /InputAdornment>
                    ),
                }
            }
            />{' '} <
            /div>{' '} <
            br / >
            <
            div className = "nextbutton" >
            <
            Button variant = "contained"
            onClick = { this.resetPasswordForm }
            style = {
                { width: '100%', backgroundColor: '#A03037', color: 'white' } } >
            Next { ' ' } <
            /Button>{' '} <
            /div>{' '} <
            /div>{' '} <
            /CardContent>{' '} <
            /Card>
        );
    }
}
export default ResetPassword;