import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MenuBookIcon from '@material-ui/icons/MenuBook';
// import '../../CSS/CbHeader.css';
import "../CSS/Header.css";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
// import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Registration from "../component/Registration";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Login from '../component/Login';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: [],
            tempData: [],
            searchVisibility: false,
            counter: 0,
            visibilityValueOfLogin: 'hidden',
            visibilityOfDialogBox: false,
            visibilityOfCloseIcon: 'hidden',
            userLoggedIn: false,
            logorsign:"LOGIN",
            redirect:"/login"
        }

    }

    handleSearchbar = () => {
        this.setState({
            searchVisibility: true
        })
    }

    getText = (event) => {
        this.props.test(event.target.value)
    }

    try(value, updateFactor) {
        if (updateFactor === "updateButton")
            this.setState({
                counter: value
            })
        if (updateFactor === "addButton") {
            this.setState({
                counter: this.state.counter + 1
            })
        }
    }

    handleCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        })
        alert(this.state.counter)
    }

    handleLoginBoxVisibility = (event) => {

        if (`${this.state.visibilityValueOfLogin}` === "hidden") {
            this.setState({visibilityValueOfLogin: "visible"})
            return;
        }
        if (`${this.state.visibilityValueOfLogin}` === "visible") {
            this.setState({visibilityValueOfLogin: "hidden"})
            return;
        }
    }

    handleDialogueBoxVisibility = (user) => {
        if (user === true) {
            window.location.reload(true)
            localStorage.removeItem('Authorization')
        }
        if (user === false) {
            this.setState({
                visibilityOfDialogBox: true,
                visibilityOfCloseIcon: "visible",
                visibilityValueOfLogin: "hidden"
            })
        }
    }

    handleClose = () => {
        this.setState({
            visibilityOfDialogBox: false
        })
    }

    componentDidMount() {
       
        // console.log("mount")
        this.isLoggedIn()
    }

    isLoggedIn = () => {
        let user = localStorage.getItem('Authorization');
       
        // console.log("abc")
        console.log(user)
        if(user){
        
            this.setState({
                logorsign: "LOGOUT",
                redirect: "cart",
                userLoggedIn: true
            })}

        if(user == "null" || user == "undefined"){
         
            this.setState({
                logorsign: "LOGIN",
                redirect: "/login",
                userLoggedIn: false
            })}
    }

    render() {
        console.log("in render")
        console.log(this.props)
        console.log(this.state.userLoggedIn)
        console.log(this.state.redirect)
        console.log(this.state.logorsign)
        console.log("out render")
        return (
            <div className="main">
                    {!this.state.userLoggedIn ?
                        <Card className="loginsignupcard" style={{
                            boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                            visibility: this.state.visibilityValueOfLogin
                        }} variant="outlined">
                        <CardContent>
                        <Typography id="mainName" style={{fontWeight: "bold"}}>BookStore</Typography>
                        <Typography id="subName" color="textSecondary" gutterBottom>To
                        access the LoginPage and continue shopping</Typography>
                        <Button className="loginorsignupbutton"
                        onClick={() => this.handleDialogueBoxVisibility(this.state.userLoggedIn)}>{this.state.logorsign}</Button>
                        </CardContent>
                        </Card>
                        :
                        <Card  className="loginsignupcard1" style={{
                            boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                            visibility: this.state.visibilityValueOfLogin
                        }} variant="outlined">
                        <CardContent><Typography className="userName-logincart" style={{fontWeight: "bold"}}>Hello, {this.props.name}</Typography>
                       < AccountCircleIcon/> <Typography style={{
                        fontSize: "small",
                        display:"inline",marginTop:"5%"
                    }} color="textSecondary" >Profile</Typography>
                        <Typography style={{
                        fontSize: "small",
                        marginTop: "2%"
                    }} color="textSecondary" ><CardGiftcardIcon style={{marginRight: "6px"}}/>
                            <Link to={"/orders"}>My Orders</Link>
                    </Typography>
                        <Button className="loginorsignupbutton"
                        // onClick={() => this.handleDialogueBoxVisibility(this.state.userLoggedIn)}>{this.state.logorsign}
                        onClick={() => this.handleDialogueBoxVisibility(this.state.userLoggedIn)}>{this.state.logorsign}</Button>
                        </CardContent>
                        </Card>
                    }


                <AppBar position="fixed" id="appbar">
                    <Toolbar id="tool">
                        {/* <ImportContactsIcon style={{fontSize: '200%', marginLeft: "1%"}}/> */}
                        < MenuBookIcon style={{fontSize: '200%', marginLeft: "3%"}}/>
                        <Typography id="title" variant="h6" noWrap>
                           <span to={"/"}>BookStore</span>    
                {/* <span href="Book Store" onClick={() => this.props.history.push("/")} >Book Store </span>} */}
                        </Typography>
                        {this.state.searchVisibility &&
                        <div className="search">
                            <div className="searchIcon">
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search..."
                                className="inputRoot inputInput"
                                inputProps={{'aria-label': 'search'}}
                                onChange={(event) => this.getText(event)}
                            />
                        </div>
                        }

                        <div className="grow"/>
                        {this.state.searchVisibility &&
                        <div className="shoppingIcon">
                            <IconButton aria-label="show 4 new mails">
                                <Badge className="badge-carticon" badgeContent={this.state.counter}>
                                    <Link style={{color: 'white'}} to={`/${this.state.redirect}`}><ShoppingCartOutlinedIcon
                                        style={{fontSize: '120%', display: 'flex'}}/></Link>
                                </Badge>
                            </IconButton>
                        </div>
                        }

                        {this.state.searchVisibility &&
                        <div className="loginsignup" style={this.state.visibilityValueOfLogin === "visible" ? {
                            borderBottom: "white solid 5px",
                            marginRight: "4%"
                        } : {borderBottom: "rgb(160,48,55) solid 5px", marginRight: "4%"}}>
                            < AccountCircleIcon className="userIcon" onClick={this.handleLoginBoxVisibility}/>
                        </div>
                        }
                    </Toolbar>
                </AppBar>
                <Dialog className="maindialoguebox" aria-labelledby="customized-dialog-title"
                        open={this.state.visibilityOfDialogBox} onClose={this.handleClose}>
                    <DialogContent className="dialoguecontent" id="customized-dialog-title">
                        <Registration />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default Header
