import React, { Component } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Logo from '../../asserts/Logo.png';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import '../../css/Login.css';
import '../../css/Logout.css';
import Popup from 'reactjs-popup';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    logout = () => {
        console.log('log out component');
        localStorage.removeItem('Token');
        localStorage.removeItem('Email');

        this.props.history.push('/login');
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return ( <
            div className = "col-md-12" >
            <
            div className = "card card-container" >
            <
            img src = { Logo }
            alt = "profile-img"
            className = "profile-img-card" / >
            <
            div className = "useronlinebookstore" >
            <
            h2 style = {
                {
                    color: '#A03037',
                    textAlign: 'center',
                    marginLeft: '8%',
                }
            } >
            BookStore Login { ' ' } <
            /h2>{' '} <
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
            message = { this.state.snackbarMessage } > < /Snackbar>{' '} <
            div className = "logout" >
            <
            div className = "logoutButton" >
            <
            Button variant = "contained"
            className = "logout"
            onClick = { this.logout }
            style = {
                { backgroundColor: '#A03037' } } >
            Logout { ' ' } <
            /Button>{' '} <
            /div>{' '} <
            /div>{' '} <
            br / >
            <
            /div>{' '} <
            /div>
        );
    }
}
export default withRouter(Logout);