import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import { IconButton, Grid, Badge, Button } from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles';
// import classes from "*.module.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import '../css/Admin.css';

const useStyles = (theme) => ({
	title: {
		display: 'none',
		paddingLeft: '0.5%',
		fontSize: '140%',
		overflow: 'visible',
		marginTop: '5px',
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
		marginRight: theme.spacing(20),
		marginLeft: '20%',
		width: '55%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
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
	accountIcon: {
		color: 'white',
		marginLeft: ' 59%',
		[theme.breakpoints.up('md')]: {
			marginLeft: '300%',
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
// const StyledBadge = withStyles(theme => ({
// badge: {
// right: -10,
// top: 5,
// border: `2px solid ${theme.palette.background.paper}`,
// },
// }))(Badge);

class Admin extends Component {
	constructor(props) {
		super(props);
	}
	// searchData = async event => {
	// if (event.target.value !== "") {
	// this.props.searchBookList(event.target.value)
	// }
	// else if (event.target.value === "") {
	// await this.props.displayType('allBooks')
	// await this.props.bookList();
	// }
	// }
	homePage = (event) => {
		if (this.props.history.location.pathname !== '/') {
			this.props.homePage();
		}
	};

	handleChange = () => {
		this.props.history.push('/login');
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<AppBar position="relative" className={classes.appBar}>
					<Toolbar className={classes.toolbar}>
						<Grid container className={classes.gridDiv}>
							<MenuBookIcon className={classes.bookIcon} onClick={this.homePage} />{' '}
							<Typography className={classes.title} value="1" variant="h3" noWrap onClick={this.homePage}>
								BookStore{' '}
							</Typography>{' '}
						</Grid>{' '}
						<div
							className={
								this.props.history.location.pathname === '/admin' || '/' ? classes.search : 'hidden'
							}>
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
						<IconButton edge="end" onClick={this.handleChange} color="inherit">
							<AccountCircleIcon className="accountIcon" />
							<Typography color="white"> Profile </Typography>{' '}
						</IconButton>{' '}
					</Toolbar>{' '}
				</AppBar>{' '}
				<div className="bookCarddiv ">
					<div className="imageDiv">
						<img className="bookImage" alt="no Cover" />
					</div>{' '}
					<div className="propertyHolderDiv">
						<div className="bookProperty">
							<p className="titleFont"> bookname </p> <br />
							<p className="authorFont"> authorname </p> <br />
							<p className="priceFont"> Rs .220 </p>{' '}
						</div>{' '}
						<div className="buttonContent">
							<Button variant="contained" color="primary" size="small" onClick={this.handleApprove}>
								{' '}
								Approve{' '}
							</Button>{' '}
							<Button variant="contained" color="primary" size="small">
								{' '}
								UnApprove{' '}
							</Button>{' '}
						</div>{' '}
						<div className="bookDivButton"> </div>{' '}
					</div>{' '}
				</div>{' '}
			</div>
		);
	}
}
export default withRouter(withStyles(useStyles)(Admin));
