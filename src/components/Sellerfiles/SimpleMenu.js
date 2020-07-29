import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import '../../css/SellerPage.css';

export default class SimpleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setAnchorEl: null,
            anchorEl: false,
            newbooksboolean: false,
        };
    }

    handleClick = (event) => {
        this.setState({
            setAnchorEl: event.currentTarget,
            anchorEl: true,
        });
    };

    handleClose = () => {
        this.setState({
            setAnchorEl: null,
            anchorEl: false,
        });
    };
    render() {
        return ( <
            div className = "menuitems" > { ' ' } { /* <MenuIcon  	id="menuicon" onClick={this.handleClick} />  */ } { ' ' } <
            Button onClick = { this.handleClick }
            style = {
                { color: '#A03037' } } >
            Books { ' ' } <
            /Button>{' '} <
            Menu id = "simple-menu"
            anchorEl = {!this.state.anchorEl }
            keepMounted open = { Boolean(this.state.anchorEl) }
            onClose = { this.handleClose } >
            <
            MenuItem onClick = { this.props.getBookLists } > Newly Added Books < /MenuItem>{' '} <
            MenuItem onClick = { this.props.getApprovedbooks } > Approved Books < /MenuItem>{' '} <
            MenuItem onClick = { this.props.getDisapprovedBooks } > Disapproved Books < /MenuItem>{' '} <
            /Menu>{' '} <
            /div>
        );
    }
}