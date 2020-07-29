import React, { Component } from 'react';
import '../../css/VerificationSuccessful.css';
import { verifyEmail } from '../../service/UserService/UserServices';
import Logo from '../../asserts/Logo.png';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import { withRouter } from 'react-router';
import { Container, Typography, Button, AppBar, Toolbar, Grid, withStyles } from '@material-ui/core';

const useStyles = (theme) => ({
    title: {
        display: 'none',
        paddingLeft: '0.5%',
        fontSize: '140%',
        overflow: 'visible',
        marginTop: '5px',
        marginLeft: '15px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    // search: {
    //  position: 'relative',
    //  borderRadius: theme.shape.borderRadius,
    //  backgroundColor: fade(theme.palette.common.white, 0.15),
    //  '&:hover': {
    //      backgroundColor: fade(theme.palette.common.white, 0.25),
    //  },
    //  marginRight: theme.spacing(2),
    //  marginLeft: '10%',
    //  width: '55%',
    //  [theme.breakpoints.up('sm')]: {
    //      marginLeft: theme.spacing(15),
    //      width: 'auto',
    //  },
    // },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(184,184,184)',
        zIndex: 1,
        marginTop: '-1%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 6),
        justifyContent: 'center',
        transition: theme.transitions.create('width'),
        paddingRight: 30,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 400,
        },
        opacity: 1,
        backgroundColor: 'white',
        borderRadius: '4px',
    },

    bookIcon: {
        fontSize: '36px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '36px',
        },
    },
    cartIcon: {
        color: 'white',
        marginLeft: '0%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '10%',
        },
    },

    searchbox: {
        marginLeft: '-30%',
    },

    appBar: {
        padding: '0 10%',
        backgroundColor: '#A03037',
        position: 'fixed',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    gridDiv: {
        width: 'auto',
        flexWrap: 'noWrap',
        alignItems: 'center',
    },
});

// const StyledBadge = withStyles((theme) => ({
//  badge: {
//      right: -10,
//      top: 5,
//      border: `2px solid ${theme.palette.background.paper}`,
//  },
// }))(Badge);

class VerificationSuccessful extends Component {
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

    resetPasswordForm = () => {
        verifyEmail(this.props.match.params.token)
            .then((Response) => {
                console.log('Verified Successfully');
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: '*Verified Successfully',
                });
            })
            .catch((error) => {
                console.log('Error', error.response);
                console.log(error.response.data.message, 'Failed To Verify');
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: '*Failed To Verify',
                });
            });
    };

    componentDidMount() {
        this.resetPasswordForm();
    }
    render() {
        const { classes } = this.props;
        return ( <
            div >
            <
            AppBar position = "fixed"
            className = { classes.appBar } >
            <
            Toolbar className = { classes.toolbar } >
            <
            Grid container className = { classes.gridDiv } >
            <
            MenuBookIcon className = { classes.bookIcon }
            />{' '} <
            Typography className = { classes.title }
            value = "1"
            variant = "h6"
            noWrap >
            BookStore { ' ' } <
            /Typography>{' '} <
            /Grid>{' '} <
            /Toolbar>{' '} <
            /AppBar>{' '} <
            Container className = "verificationdiv" >
            <
            img src = { require('../../asserts/verified-icon.png') }
            alt = { 'Verified' }
            id = "verificationimg" / >
            <
            Typography component = "h4"
            id = "verificationtypo" >
            <
            b > Congratulations!Your email address has been verified Successfully. < /b>{' '} <
            /Typography>{' '} <
            div className = "loginverificationdiv" >
            <
            Button id = "loginverificationbtn"
            onClick = {
                () => this.props.history.push('/login') } >
            Login { ' ' } <
            /Button>{' '} <
            /div>{' '} <
            /Container>{' '} <
            /div>
        );
    }
}
export default withRouter(withStyles(useStyles)(VerificationSuccessful));