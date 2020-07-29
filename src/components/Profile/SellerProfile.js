import React from 'react';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { withRouter } from 'react-router-dom';
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { uploadFile } from '../../Configuration/confiugration';
import Login from '../UserRegistration/Login';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(5),
    },
}));

function SellerProfile(props) {
    let email = localStorage.getItem('Email');
    let fullName = localStorage.getItem('FullName');
    //   let lastName = localStorage.getItem ('LastName');
    // let Profile =  localStorage.getItem ('Profile');
    const classes = useStyles();
    const [anchor, setAnchor] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [file, setFile] = React.useState('');

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const HandleOpenFileChange = () => {
        if (isloggedin) {
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleLoginChange = () => {
        console.log(props);
        localStorage.removeItem('Token');
        localStorage.removeItem('FullName');
        localStorage.removeItem('Email');
        localStorage.removeItem('SellerProfile');
        localStorage.removeItem('RoleType');
        props.history.push('/seller');
    };

    const handlerforLogin = () => {
        console.log(props);
        localStorage.removeItem('RoleType');
        props.history.push('/login');
    };

    // const handleFileSubmitChange = () => {
    // 	//let token = localStorage.getItem ('Token');
    // 	const formData = new FormData();
    // 	formData.append('file', file, file.name);
    // 	//let Profile = localStorage.getItem ('file.name');

    // 	uploadFile(formData)
    // 		.then((response) => {
    // 			console.log(response);
    // 			console.log('data', response.data.data);

    // 			if (this.isLogin == false) {
    // 				this.snackbar.open('Please Login First', 'Ok', { duration: 2000 });
    // 				return;
    // 			}

    // 			localStorage.setItem(localStorage.getItem('Email'), response.data.data);
    // 			setOpenDialog(true);
    // 		})
    // 		.catch((err) => {
    // 			console.log('profile not  update', err);
    // 		});
    // };

    const handleFileSubmitChange = () => {
        //let token = localStorage.getItem ('Token');
        const formData = new FormData();
        formData.append('file', file, file.name);
        //let Profile = localStorage.getItem ('file.name');

        uploadFile(formData)
            .then((response) => {
                console.log(response);
                console.log('data', response.data.data);
                localStorage.setItem(localStorage.getItem('Email'), response.data.data);
                setOpenDialog(true);
            })
            .catch((err) => {
                console.log('profile not  update', err);
            });
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : null;
    let isloggedin = localStorage.getItem('Email') ? true : false;

    return ( <
        div >
        <
        div style = {
            { display: 'flex', flexDirection: 'row' } } >
        <
        Avatar alt = { fullName }
        src = { localStorage.getItem(localStorage.getItem('Email')) }
        onClick = { handleClick }
        style = {
            { width: '50px', height: '50px' } }
        />{' '} <
        /div>{' '} <
        Popover id = { id }
        open = { open }
        anchor = { anchor }
        style = {
            { marginTop: '-21%', marginLeft: '-1%' } }
        onClose = { handleClose }
        anchorOrigin = {
            {
                vertical: 'bottom',
                horizontal: 'right',
            }
        }
        transformOrigin = {
            {
                vertical: 'bottom',
                horizontal: 'right',
            }
        } >
        <
        Typography className = { classes.typography } >
        <
        div className = "mainprofile" >
        <
        div style = {
            { justifyContent: 'center', display: 'flex', top: '3%' } } >
        <
        Badge overlap = "circle"
        anchorOrigin = {
            {
                vertical: 'bottom',
                horizontal: 'right',
            }
        }
        badgeContent = { <
            CameraAltIcon
            onClick = { HandleOpenFileChange }
            style = {
                { backgroundColor: 'white', borderRadius: '50%' } }
            />
        } >
        <
        Avatar alt = { localStorage.getItem('FullName') }
        src = { localStorage.getItem(localStorage.getItem('Email')) }
        style = {
            { width: '100px', height: '100px' } }
        />{' '} <
        /Badge>{' '} <
        /div>{' '} <
        br / >
        <
        div style = {
            {
                justifyContent: 'center',
                display: 'flex',
                top: '2%',
                padding: '2%',
            }
        } >
        <
        b > { fullName } < /b>{' '} <
        /div>{' '} <
        div style = {
            {
                justifyContent: 'center',
                display: 'flex',
                top: '5%',
                color: 'gray',
            }
        } >
        <
        b > { email } < /b>{' '} <
        /div>{' '} { /* <Divider /> */ } { ' ' } <
        div style = {
            { marginTop: '5%' } } >
        <
        MenuItem title = "BookStore Account"
        onClick = { handleLoginChange }
        style = {
            { justifyContent: 'center', display: 'flex' } } > { ' ' } <
        /MenuItem>{' '} <
        /div>{' '} <
        div style = {
            {
                justifyContent: 'center',
                display: 'flex',
                padding: '9%',
            }
        } > { ' ' } {
            isloggedin && ( <
                Button variant = "contained"
                style = {
                    {
                        justifyContent: 'center',
                        display: 'flex',
                        backgroundColor: '#A03037',
                        color: 'white',
                    }
                }
                onClick = { handleLoginChange } >
                Logout { ' ' } <
                /Button>
            )
        } { ' ' } {
            !isloggedin && ( <
                Button variant = "contained"
                style = {
                    {
                        justifyContent: 'center',
                        display: 'flex',
                        backgroundColor: '#A03037',
                        marginLeft: '6%',
                        color: 'white',
                    }
                }
                onClick = { handlerforLogin } >
                Login { ' ' } <
                /Button>
            )
        } { ' ' } <
        /div>{' '} {
            /* <div className="profilefooter">
                                                                                                                                                                                                                                                                                                                                                 <p>Privacy Policy .Terms of Service</p>  
                                                                                                                                                                                                                                                                                                                                                </div> */
        } { ' ' } <
        /div>{' '} <
        /Typography>{' '} <
        /Popover>{' '} <
        Dialog open = { openDialog }
        onClose = { handleCloseDialog } >
        <
        DialogTitle id = "max-width-dialog-title"
        style = {
            {
                display: 'flex',
                justifyContent: 'center',
                fontSize: ' x-large',
                fontfamily: 'monospace',
                fontStyle: 'unset',
            }
        } >
        Select Profile Photo { ' ' } <
        /DialogTitle>{' '} <
        DialogContent >
        <
        DialogContentText >
        <
        div style = {
            {
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column',
                // width: '131%',
            }
        } >
        <
        div style = {
            {
                display: 'flex',
                justifyContent: 'center',
            }
        } >
        <
        TextField type = "file"
        onChange = { handleFileChange }
        />{' '} <
        /div>{' '} <
        div style = {
            {
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingTop: '22%',
                paddingRight: '22%',
            }
        } >
        <
        Button variant = "contained"
        color = "primary"
        onClick = { handleFileSubmitChange } >
        Upload { ' ' } <
        /Button>{' '} <
        Button variant = "contained"
        color = "primary"
        onClick = { handleCloseDialog } >
        Cancel { ' ' } <
        /Button>{' '} <
        /div>{' '} <
        /div>{' '} <
        /DialogContentText>{' '} <
        /DialogContent>{' '} <
        /Dialog>{' '} <
        /div>
    );
}
export default withRouter(SellerProfile);