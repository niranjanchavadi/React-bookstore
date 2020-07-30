import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton, fade, Grid, withStyles, Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import { withRouter } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserProfile from '../Profile/UserProfile';
import FavoriteIcon from '@material-ui/icons/Favorite';

// import Profile from './Profile/Profile';






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
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: '10%',
		width: '55%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(15),
			width: 'auto',
		},
	},
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
		marginLeft: '150%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: '10%',
		},
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

	wishlist: {
		marginLeft: '-6%',
	},

	shoppingcart:{
        marginLeft: '50%',
	},


	booktittle :{
		cursor:'pointer',
	 },

	// wishlistbutton:{
    //   marginLeft:'140%',
	// },
});





const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -10,
		top: 5,
		border: `2px solid ${theme.palette.background.paper}`,
	},
}))(Badge);

class Wishlistboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchKey: '',
			// status: 'Your Cart is Empty',
			isActive: false,
			menuOpen: false,
			menuAnchorEl: null,
			visibilityOfDialogBox: false,
			visibilityOfCloseIcon: 'hidden',
			
		
		};

		 
        
	}
	handleClose = () => {
		this.setState({
			menuOpen: false,
		});
	};
	handleClickProfile = (event) => {
		this.setState({
			menuOpen: true,
			menuAnchorEl: event.currentTarget,
		});
	};
	openSnackBar = async () => {
		await this.setState({ isActive: true }, () => {
			setTimeout(() => {
				this.setState({ isActive: false });
			}, 3000);
		});
	};

	

	goToCart = () => {
		// let isloggedin = localStorage.getItem('Email') ? true : false;
		// if(isloggedin){
            
		// }
		// else{
        //     this.props.history.push('/login');
		// }
		this.props.history.push('/cart');
		
	};

	handleChange = () => {
		this.props.history.push('/login');
	};

	handleClose = () => {
		this.setState({
			menuOpen: false,
		});
	};
	handleClickProfile = (event) => {
		this.setState({
			menuOpen: true,
			menuAnchorEl: event.currentTarget,
		});
	};

	render() {
		console.log(this.props.cart)
		const { classes } = this.props;
		
		return (
			<div>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar className={classes.toolbar}>
						<Grid container className={classes.gridDiv}>
							<MenuBookIcon className={classes.bookIcon} />
							<Typography className={classes.title} value="1" variant="h6" noWrap>
							          <span    className={classes.booktittle} 
											href="BookStore"
											onClick={() => this.props.history.push('/')}
											style={{ color: 'white' }}>
											BookStore
										</span>
							</Typography>
						</Grid>
                        
                      <div  className={classes.shoppingcart}>
                      
					  <IconButton className={classes.cartIcon} onClick={this.goToCart}>
							<StyledBadge badgeContent={this.props.cart} color="secondary">
								<ShoppingCartIcon className={classes.cartIcon} fontSize='large' />
							</StyledBadge>
						</IconButton>
					  </div>
						
					
					
						<div className={classes.wishlist}>
						   <IconButton id='icon-btn' onClick={this.props.wishListIconClickedHandler}   >
							<StyledBadge badgeContent={this.props.wishlist} color="secondary"
							>
							<FavoriteIcon fontSize='large' />
							</StyledBadge>
						</IconButton>
                        </div>
					    <UserProfile onChange={this.handleClickProfile}/>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withRouter(withStyles(useStyles)(Wishlistboard));
