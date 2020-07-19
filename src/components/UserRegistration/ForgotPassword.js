import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import '../../css/ForgotPassword.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import { forgotPassword } from '../../service/UserService/UserServices';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Snackbar from '@material-ui/core/Snackbar';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
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

        if (!RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\. [A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$').test(
                this.state.emailId
            )) {
            console.log(errors);
            errors['emailId'] = '*Enter valid pattern Email id';
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Enter valid pattern Email id',
            });

            formIsValid = false;
        }
        if (!this.state.emailId) {
            errors['emailId'] = '*Enter the Email Id';
            console.log(errors);
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Invalid email id email cant be empty',
            });
            formIsValid = false;
        }
        this.setState({
            errors: errors,
        });
        return formIsValid;
    };

    forgotPasswordForm = () => {
        if (this.validateForm()) {
            let user = {};
            user.emailId = this.state.emailId;
            console.log(user);

            forgotPassword(user)
                .then((response) => {
                    localStorage.setItem('Token', response.data.message);
                    console.log(response, 'Token has been sent to your mail, Please Verify first');
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: 'Token has been sent to your mail',
                    });
                })
                .catch((error) => {
                    console.log(error, 'Invalid e-mail');
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: 'Invalid E-mail',
                    });
                });
        }
    };

    render() {
        return ( <
            Card className = "forgot" >
            <
            CardContent >
            <
            div className = "forgotpasswordpage" >
            <
            p className = "recoverymail" > Enter email
            for forgot password < /p>  <
            div className = "forgotpasswordemail" >
            <
            TextField required margin = "dense"
            size = "small"
            name = "emailId"
            variant = "outlined"
            id = "outlined-required"
            color = "secondary"
            label = "Email"
            onChange = { this.axios }
            error = { this.state.errors.emailId }
            helperText = { this.state.errors.emailId }
            InputProps = {
                {
                    style: { width: 340 },
                    endAdornment: ( <
                        InputAdornment position = "end"
                        sytle = {
                            { width: '10px' } } >
                        <
                        MailOutlineIcon / >
                        <
                        /InputAdornment>
                    ),
                }
            }
            />  <
            /div>  <
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
            message = { this.state.snackbarMessage } >

            <
            /Snackbar>  <
            br / >
            <
            div className = "nextbutton" >
            <
            Button variant = "contained"
            onClick = { this.forgotPasswordForm }
            style = {
                { width: '120%', backgroundColor: '#A03037' } } >
            Next <
            /Button>  <
            /div>  <
            /div>  <
            /CardContent>  <
            /Card>
        );
    }
}
export default ForgotPassword;