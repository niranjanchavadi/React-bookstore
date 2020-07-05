import React, { Component } from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { Popover, MenuItem, MuiThemeProvider, createMuiTheme, Dialog, DialogContent } from '@material-ui/core';
import Styles from '../css/snackbar.module.css';
import { withRouter, Link } from 'react-router-dom';
import '../css/BookDetails.css';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Login from './Login';
import { Card } from '@material-ui/core';

const theme1 = createMuiTheme({
	overrides: {
		MuiPopover: {
			paper: {
				width: '20%',
				height: '30%',
			},
		},
	},
});

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
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
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
	accountIcon: {
		color: 'white',
		// marginLeft:"0%",
		[theme.breakpoints.up('sm')]: {
			marginLeft: '200%',
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
});

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -10,
		top: 5,
		border: `2px solid ${theme.palette.background.paper}`,
	},
}))(Badge);

class PrimarySearchAppBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchKey: '',
			status: 'Your Cart is Empty',
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

	searchData = async (event) => {
		if (event.target.value !== '') {
			this.props.searchBookList(event.target.value);
		} else if (event.target.value === '') {
			await this.props.displayType('allBooks');
			await this.props.bookList();
		}
	};

	goToCart = () => {
		if (this.props.history.location.pathname === '/') this.props.goToCart();
	};

	homePage = (event) => {
		if (this.props.history.location.pathname !== '/') {
			this.props.homePage();
		}
	};

	handleChange = () => {
		this.props.history.push('/login');
	};

	// handleDialog = () => {
	// 	this.setState({
	// 		visibilityOfDialogBox: true,
	// 		visibilityOfCloseIcon: 'visible',
	// 		visibilityValueOfLogin: 'hidden',
	// 	});
	// };
	// handleCloseDialog = () => {
	// 	this.setState({
	// 		visibilityOfDialogBox: false,
	// 	});
	// };
	render() {
		const { classes } = this.props;
		return (
			<div>
				<AppBar position="static" className={classes.appBar}>
					<Toolbar className={classes.toolbar}>
						<Grid container className={classes.gridDiv}>
							<MenuBookIcon className={classes.bookIcon} onClick={this.homePage} />{' '}
							<Typography className={classes.title} value="1" variant="h6" noWrap onClick={this.homePage}>
								BookStore{' '}
							</Typography>{' '}
						</Grid>{' '}
						<div>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>{' '}
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								onChange={this.searchData}
								inputProps={{ 'aria-label': 'search' }}
							/>{' '}
						</div>{' '}
						<IconButton
							className={classes.cartIcon}
							onClick={this.props.cartBooksCount > 0 ? this.goToCart : this.openSnackBar}>
							<StyledBadge badgeContent={this.props.cartBooksCount} color="secondary">
								<ShoppingCartIcon className={classes.cartIcon} />{' '}
							</StyledBadge>{' '}
						</IconButton>{' '}
						<IconButton className="account" onClick={this.handleClickProfile}>
							<AccountCircleIcon className={classes.accountIcon} />{' '}
							<Typography
								style={{
									fontSize: 'medium',
									display: 'inline',
									marginTop: '5%',
									marginLeft: '10%',
									color: 'white',
								}}
								color="textPrimary">
								{' '}
								Profile{' '}
							</Typography>{' '}
						</IconButton>{' '}
					</Toolbar>{' '}
					<MuiThemeProvider theme={theme1}>
						<Popover
							id="menu"
							onClose={this.handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							anchorEl={this.state.menuAnchorEl}
							open={this.state.menuOpen}>
							<div className="usermenu">
								<MenuItem>
									{' '}
									<Link to="/login"> Login </Link>{' '}
								</MenuItem>{' '}
							</div>{' '}
						</Popover>{' '}
					</MuiThemeProvider>{' '}
				</AppBar>{' '}
				<div className={this.state.isActive ? [Styles.snackbar, Styles.show].join(' ') : Styles.snackbar}>
					{' '}
					{this.state.status}{' '}
				</div>{' '}
			</div>
		);
	}
}

export default withRouter(withStyles(useStyles)(PrimarySearchAppBar));
