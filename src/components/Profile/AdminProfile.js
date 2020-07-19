import React from 'react';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
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

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(5),
    },
}));

function AdminProfile(props) {
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
        setOpenDialog(true);
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
        localStorage.removeItem('AdminProfile');
        localStorage.removeItem('RoleType');
        props.history.push('/admin');
    };

    const handlerforLogin = () => {
        console.log(props);
        localStorage.removeItem('RoleType');
        props.history.push('/login');
    };

    const handleFileSubmitChange = () => {
        //let token = localStorage.getItem ('Token');
        const formData = new FormData();
        formData.append('file', file, file.name);
        //let Profile = localStorage.getItem ('file.name');

        uploadFile(formData)
            .then((response) => {
                console.log(response);
                console.log('data', response.data.data);
                localStorage.setItem('AdminProfile', response.data.data);
                setOpenDialog(true);
                alert('Admin Profile Change');
            })
            .catch((err) => {
                console.log('profile not  update', err);
            });
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : null;

    return ( <
        div >
        <
        div style = {
            { display: 'flex', flexDirection: 'row' } } >
        <
        Avatar alt = { fullName }
        src = { localStorage.getItem('AdminProfile') }
        onClick = { handleClick }
        /> <
        /div> <
        Popover id = { id }
        open = { open }
        anchor = { anchor }
        style = {
            { marginTop: '-23.5%', marginLeft: '-4%' } }
        onClose = { handleClose }
        anchorOrigin = {
            {
                vertical: 'bottom',
                horizontal: 'right',
            }
        }
        transformOrigin = {
            {
                vertical: 'top',
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
        src = { localStorage.getItem('AdminProfile') }
        style = {
            { width: '77px', height: '77px' } }
        /> <
        /Badge> <
        /div> <
        div style = {
            {
                justifyContent: 'center',
                display: 'flex',
                top: '2%',
                padding: '2%',
            }
        } >
        <
        b > { fullName } < /b> <
        /div> <
        div style = {
            { justifyContent: 'center', display: 'flex', top: '5%', color: 'gray' } } >
        <
        b > { email } < /b> <
        /div> <
        Divider / >
        <
        div style = {
            { marginTop: '5%' } } >
        <
        MenuItem title = "BookStore Account"
        onClick = { handleLoginChange }
        style = {
            { justifyContent: 'center', display: 'flex' } } > < /MenuItem> <
        /div> <
        div style = {
            {
                justifyContent: 'center',
                display: 'flex',
                padding: '9%',
            }
        } >
        <
        Button variant = "contained"
        color = "white"
        style = {
            { justifyContent: 'center', display: 'flex' } }
        onClick = { handleLoginChange } >
        Logout <
        /Button> <
        Button variant = "contained"
        color = "white"
        style = {
            {
                justifyContent: 'center',
                display: 'flex',
                backgroundColor: '#A03037',
                marginLeft: '60%',
            }
        }
        onClick = { handlerforLogin } >
        Login <
        /Button> <
        /div> <
        Divider / >
        <
        /div> <
        /Typography> <
        /Popover> <
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
        Select Profile Photo <
        /DialogTitle> <
        DialogContent >
        <
        DialogContentText >
        <
        div style = {
            {
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column',
                width: '131%',
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
        /> <
        /div> <
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
        Upload <
        /Button> <
        Button variant = "contained"
        color = "primary"
        onClick = { handleCloseDialog } >
        Cancel <
        /Button> <
        /div> <
        /div> <
        /DialogContentText> <
        /DialogContent> <
        /Dialog> <
        /div>
    );
}
export default withRouter(AdminProfile);