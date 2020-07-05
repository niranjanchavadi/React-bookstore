import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { withStyles } from '@material-ui/core/styles';
import { addBookConfiguration, addUploadConfiguration } from '../Configuration/confiugration';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import '../css/SellerPage.css';

const useStyles = (theme) => ({
	grow: {
		flexGrow: 1,
	},
	bookIcon: {
		padding: '0 0 0 2%',
		fontSize: '36px',
		[theme.breakpoints.up('sm')]: {
			padding: '0 0 0 10%',
			fontSize: '36px',
		},
	},
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
		marginLeft: '20%',
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
	root: {
		border: '3px solid rgb(145,10,10)',
		borderRadius: '10px',
		margin: '2% 15% 3% 15%',
		padding: '2% 5% 2% 20%',
		'& > *': {
			margin: theme.spacing(1),
			width: '70%',
		},
	},
	textArea: {
		width: '69%',
		borderRadius: '5px',
		resize: 'none',
	},
	addBook: {
		marginLeft: '11%',
		backgroundColor: 'rgb(145,10,10)',
		width: '50%',
		color: 'white',
	},
	heading: {
		color: 'rgb(145,10,10)',
		width: '100%',
		marginTop: '1%',
	},
	url: {
		margin: '0 0 0 2%',
		fontSize: '60%',
	},
});

class BasicTextFields extends Component {
	state = {
		Title: '',
		Author: '',
		Price: '',
		Stock: '',
		Year: '',
		BookDetails: '',
		files: '',
		imgName: '',
		openAdd: false,
	};

	changeUrl = (event) => {
		this.setState({ files: event.target.value });
	};

	updateState = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
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

	validateAuthor = (event) => {
		const regexp = /[A-Za-z]{3,20}$/;
		const char = event.target.value;
		if (!regexp.test(char)) {
			alert('Invalid Author Name');
			this.setState({
				[event.target.name]: '',
			});
		}
	};

	validateYear = async (event) => {
		const yearVal = event.target.value;
		const regexp = /[1-2]\d{3}$/;
		if (!regexp.test(yearVal)) {
			alert('Invalid Year');
			await this.setState({
				[event.target.name]: '',
			});
		} else if (yearVal > 2020) {
			alert('Year should be in range 1100 to current year');
			await this.setState({
				[event.target.name]: '',
			});
		}
	};

	addBook = () => {
		addBookConfiguration(this.state);
		alert('Book Added SuccessFully  ');
	};

	uploadButtonClick = async (event) => {
		await this.setState({
			files: event.target.files[0],
			imgName: event.target.value,
		});
		const formData = new FormData();
		formData.append('file', this.state.files);
		addUploadConfiguration(formData).then((response) => {
			this.setState({
				files: response.data,
			});
		});
	};
	openAddBook = () => {
		this.setState({
			openAdd: !this.state.openAdd,
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<div className={classes.grow}>
					<AppBar position="static" style={{ backgroundColor: '#A03037' }}>
						<Toolbar>
							<MenuBookIcon className={classes.bookIcon} />{' '}
							<Typography className={classes.title} value="1" variant="h6" noWrap>
								BookStore{' '}
							</Typography>{' '}
							<div className="alignment2">
								<div className="alignment3">
									<SearchIcon className="blackColor" style={{ fontSize: '18px', color: 'black' }} />{' '}
								</div>{' '}
								<div className="search">
									<input
										placeholder="Search..."
										className="inputsearch"
										style={{
											disableUnderline: true,
											outline: 'none',
											border: 'none',
										}}
									/>{' '}
								</div>{' '}
							</div>{' '}
							<div className="profileIcon">
								{' '}
								<ProfileIcon />{' '}
								<Typography
									style={{
										fontSize: 'medium',
										display: 'inline',
										marginTop: '5%',
										marginLeft: '10%',
										color:'white'
									}}
									color="textPrimary">
									{' '}
									Seller{' '}
								</Typography>{' '}
							</div>{' '}
						</Toolbar>{' '}
					</AppBar>{' '}
					<div className="addBookButton">
						<Button
							onClick={this.openAddBook}
							variant="contained"
							style={{ backgroundColor: '#A03037', color: 'white' }}>
							{' '}
							ADD BOOK{' '}
						</Button>{' '}
					</div>{' '}
				</div>{' '}
				{this.state.openAdd ? (
					<form className={classes.root} onSubmit={this.addBook} autoComplete="off">
						<Typography className={classes.heading} variant="h4" component="h2" gutterBottom>
							Add Books{' '}
						</Typography>{' '}
						<TextField label="Title" variant="outlined" name="Title" onChange={this.updateState} required />
						<br />
						<TextField
							label="Author"
							variant="outlined"
							name="Author"
							value={this.state.Author}
							onBlur={this.validateAuthor}
							onChange={this.updateState}
							required
						/>
						<br />
						<TextField
							type="number"
							label="Price"
							variant="outlined"
							name="Price"
							onChange={this.updateState}
							required
						/>
						<br />
						<TextField
							type="text"
							label="Year"
							variant="outlined"
							name="Year"
							value={this.state.Year}
							onBlur={this.validateYear}
							onChange={this.updateState}
							required
						/>
						<br />
						<TextField
							type="number"
							label="Stock"
							variant="outlined"
							name="Stock"
							value={this.state.Stock}
							onChange={this.updateState}
							required
						/>
						<br />
						<TextareaAutosize
							className={classes.textArea}
							rowsMin={4}
							rowsMax={4}
							placeholder="Book Detail"
							name="BookDetails"
							onChange={this.updateState}
							required
						/>
						<br />
						<Button variant="contained" component="label">
							Upload Image{' '}
							<input
								type="file"
								style={{ display: 'none' }}
								name="image"
								onChange={this.uploadButtonClick}
								accept="Image/*"
								required
							/>
						</Button>{' '}
						<p className={classes.url}> {this.state.imgName} </p>{' '}
						<Button
							type="submit"
							className={classes.addBook}
							variant="contained"
							//  onClick={this.addBook}
						>
							Save Book{' '}
						</Button>{' '}
					</form>
				) : null}{' '}
			</Fragment>
		);
	}
}

export default withStyles(useStyles)(BasicTextFields);
