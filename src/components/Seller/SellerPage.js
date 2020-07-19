import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import { addBookConfiguration, addUploadConfiguration, getBookDetails } from '../../Configuration/confiugration';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, Popover, MenuItem, IconButton, Tooltip } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import '../../css/SellerPage.css';
import Styles from '../../css/snackbar.module.css';
import {
	getBookList,
	getBooksCount,
	getAllUnverifiedBookList,
	getUpdateBooks,
	getDeleteBooks,
} from '../../Configuration/BookConfig';
import SellerProfile from '../Profile/SellerProfile';
// import SellerProfile from '../profile/SellerProfile';

const theme1 = createMuiTheme({
	overrides: {
		MuiPopover: {
			paper: {
				width: 'auto',
				height: 'auto',
				marginLeft: '-10%',
				marginTop: '-18%',
			},
		},
	},
});

const useStyles = (theme) => ({
	// grow: {
	// 	flexGrow: 1,
	// },
	bookIcon: {
		padding: '0 0 0 2%',
		fontSize: '36px',
		[theme.breakpoints.up('sm')]: {
			padding: '0 0 0 10%',
			fontSize: '36px',
		},
	},
	bookName: {
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
	// root: {
	// 	border: '3px solid rgb(145,10,10)',
	// 	borderRadius: '10px',
	// 	margin: '2% 15% 3% 15%',
	// 	padding: '2% 5% 2% 20%',
	// 	'& > *': {
	// 		margin: theme.spacing(1),
	// 		width: '70%',
	// 	},
	// },

	root: {
		border: '3px solid rgb(145,10,10)',
		borderRadius: '10px',
		// margin: "2% 15% 3% 15%",
		margin: '4% -95% 7% -95%',
		// padding: "2% 5% 2% 20%",
		padding: '2% 30% 2% 30%',
		'& > *': {
			margin: theme.spacing(1.5),
			width: '130%',
		},
		overflowY: 'hidden',
	},
	textArea: {
		width: '127%',
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

	textArea1: {
		width: '98%',
		borderRadius: '5px',
		resize: 'none',
	},
	url: {
		margin: '0 0 0 2%',
		fontSize: '60%',
	},
});

class BasicTextFields extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookList: [],
			displayType: 'allBooks',
			clickedId: [],
			openUpdateDialog: false,
			openAdd: false,
			books: [],
			bookId: '',

			// page: 1,
		};
	}

	state = {
		priceError: '',

		bookName: '',
		authorName: '',
		price: '',
		quantity: '',
		// Year: '',
		bookDetails: '',
		bookImgUrl: '',
		files: '',
		imgName: '',

		filterArray: [],
		isSearching: false,
		filterArrayCount: 0,
		isActive: false,
	};

	getUpdateBooks = () => {
		alert(this.state.bookId);
		let bookId = this.state.bookId;

		// let fetcheddata = {};
		// fetcheddata = getBookDetails(bookId);
		// console.log(fetcheddata)

		let token = localStorage.getItem('Token');
		console.log(token, 'token');
		let updateBookDto = {};
		updateBookDto.bookName = this.state.bookName;
		updateBookDto.price = this.state.price;
		updateBookDto.authorName = this.state.authorName;
		updateBookDto.quantity = this.state.quantity;
		updateBookDto.bookDetails = this.state.bookDetails;

		updateBookDto.bookImgUrl = this.state.files;
		getUpdateBooks(updateBookDto, bookId, token)
			.then((Response) => {
				// localStorage.removeItem('Token');
				alert('Book  Updated SuccessFully  ');
			})
			.catch((error) => {
				console.log('Error', error.response);
				console.log(error.response.data.message, 'Failed to update book');

				alert(error.response.data.message, '*Failed to update book');
			});
	};

	getDeleteBook = (clickedID) => {
		let clickedid = this.state.clickedId;
		clickedid.push(clickedID);
		this.setState({
			clickedId: [...clickedid],
		});
		var bookidnew = {
			bookId: clickedID,
		};
		let token = localStorage.getItem('Token');
		console.log(token, 'token');
		// let bookId;
		// this.state.bookList.map((value, index) => {
		// 	bookId = value.bookId;
		// });
		console.log(bookidnew);
		getDeleteBooks(bookidnew, token)
			.then((res) => {
				this.getBookLists();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getBookLists = () => {
		let token = localStorage.getItem('Token');
		console.log(token, 'token');

		if (this.state.displayType === 'allBooks') {
			getAllUnverifiedBookList(token)
				.then((res) => {
					this.setState({ bookList: res.data.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	componentDidMount() {
		this.getBookLists();
	}

	changeUrl = (event) => {
		this.setState({ files: event.target.value });
	};

	updateState = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleUpdate = (bookId) => {
		this.setState({
			openUpdateDialog: !this.state.openUpdateDialog,
			bookId: bookId,
		});
	};

	handleDelete = (clickedID) => {
		this.getDeleteBook(clickedID);
	};

	openSnackBar = async (prop) => {
		await this.setState({ status: prop });
		this.setState({ isActive: true }, () => {
			setTimeout(() => {
				this.setState({ isActive: false });
			}, 2000);
		});
	};

	validateauthorName = (e) => {
		const regexp = /^[A-Z][a-z\s]{3,}$/;
		const char = e.target.value;
		if (!regexp.test(char)) {
			this.openSnackBar('Invalid Author Name');
			this.setState({
				[e.target.name]: '',
			});
		}
	};

	validatebookName = (event) => {
		const regexp = /^[A-Z][a-z\s]{3,}$/;
		const char = event.target.value;
		if (!regexp.test(char)) {
			this.openSnackBar('Invalid Book Name');
			this.setState({
				[event.target.name]: '',
			});
		}
	};

	validatePrice = (event) => {
		const regexp = /^\d+(?:\.\d{0,2})?$/;
		const number = event.target.value;
		if (!regexp.test(number)) {
			this.openSnackBar('Invalid price');
			this.setState({
				[event.target.name]: '',
			});
		}
	};

	validateQuantity = (event) => {
		const regexp = /^[1-9]{1,9}?$/;
		const number = event.target.value;
		if (!regexp.test(number)) {
			this.openSnackBar('Invalid quantity');
			this.setState({
				[event.target.name]: '',
			});
		}
	};

	addBook = () => {
		let token = localStorage.getItem('Token');
		console.log(token, 'token');
		let object = {};
		object.bookName = this.state.bookName;
		object.price = this.state.price;
		object.authorName = this.state.authorName;
		object.quantity = this.state.quantity;
		object.bookDetails = this.state.bookDetails;
		object.bookImgUrl = this.state.files;

		addBookConfiguration(object, token)
			.then((Response) => {
				console.log('Book Added SuccessFully  ');
				// localStorage.setItem(object);
				// localStorage.removeItem('Token');
				alert('Book Added SuccessFully  ');
			})
			.catch((error) => {
				console.log('Error', error.response);
				console.log(error.response.data.message, 'Failed to add book');

				alert(error.response.data.message, '*Failed to add book');
			});
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
				files: response.data.message,
			});
		});
	};
	openAddBook = () => {
		this.setState({
			openAdd: !this.state.openAdd,
		});
	};

	handleClickProfile = (event) => {
		this.setState({
			menuOpen: true,
			menuAnchorEl: event.currentTarget,
		});
	};

	handleChange = () => {
		this.props.history.push('/admin');
	};

	searchHandler = (event) => {
		let search = event.target.value;
		if (search.toString().length >= 1) {
			const newData = this.state.bookList.filter((item) => {
				return (
					item.bookName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
					item.authorName.toLowerCase().indexOf(search.toLowerCase()) > -1
				);
			});
			this.setState({
				isSearching: true,
				filterArray: newData,
				filterArrayCount: newData.length,
			});
		} else {
			this.setState({
				isSearching: false,
			});
		}
	};
	render() {
		let books = this.state.bookList.map((value, index) => {
			return (
				<div className="bookCarddivSeller" key={value.bookId}>
					<div className="imageDiv">
						<img
							className="bookImage"
							src={value.bookImgUrl}
							alt="no Cover"
							style={{ borderRadius: 0, width: '150px' }}
						/>
					</div>
					<div className="propertyHolderDiv">
						<div className="bookProperty">
							<p className="titleFont"> {value.bookName} </p> <br />
							<p className="authorFont"> {value.authorName} </p> <br />
							<p className="priceFont"> ₹. {value.price} </p>
						</div>
						<div className="buttonContent">
							<Button
								variant="contained"
								style={{ backgroundColor: '#A03037', color: 'white' }}
								size="small"
								onClick={() => this.handleUpdate(value.bookId)}>
								Update
							</Button>
							{this.state.clickedId.includes(value.bookId) ? null : (
								<Button
									variant="contained"
									style={{ backgroundColor: '#A03037', color: 'white' }}
									onClick={() => {
										this.handleDelete(value.bookId);
									}}
									size="small">
									Delete
								</Button>
							)}
						</div>
						<div className="bookDivButton"> </div>
					</div>
				</div>
			);
		});

		const { classes } = this.props;
		return (
			<Fragment>
				<div>
					<AppBar position="static" style={{ backgroundColor: '#A03037' }}>
						<Toolbar>
							<MenuBookIcon className={classes.bookIcon} />
							<Typography className={classes.bookName} value="1" variant="h6" noWrap>
								BookStore
							</Typography>
							<div className="alignment2">
								<div className="alignment3">
									<SearchIcon className="blackColor" style={{ fontSize: '18px', color: 'black' }} />
								</div>
								<div className="search">
									<input
										placeholder="Search..."
										onChange={this.searchHandler}
										className="inputsearch"
										style={{
											disableUnderline: true,
											outline: 'none',
											border: 'none',
										}}
									/>
								</div>
							</div>
							<div className="profileIcon">
								
								{/* <ProfileIcon onClick={this.handleClickProfile} />   */}
								<SellerProfile onClick={this.handleClickProfile} />
								<Typography
									style={{
										fontSize: 'medium',
										display: 'flex',
										marginTop: '8%',
										marginLeft: '0%',
										color: 'white',
									}}
									color="textPrimary">
									Seller
								</Typography>
							</div>
						</Toolbar>
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
										<Button
											style={{ backgroundColor: '#A03037', color: 'white' }}
											onClick={() => this.props.history.push('/login')}>
											<span> Login </span>
										</Button>
									</MenuItem>
								</div>
							</Popover>
						</MuiThemeProvider>
					</AppBar>
					
				</div>
                <div className="addBookButton">
						<Button
							onClick={this.openAddBook}
							variant="contained"
							style={{ backgroundColor: '#A03037', color: 'white' }}>
							ADD BOOK
						</Button>
					</div>
				{this.state.openAdd ? (
					<Dialog className="addDialog" open={true}>
						<DialogContent className="addDialogContent">
							<form className={classes.root} autoComplete="off">
								<Typography className={classes.heading1} variant="h4" component="h2" gutterBottom>
									Add Books
								</Typography>
								<TextField
									type="text"
									label="bookName"
									variant="outlined"
									name="bookName"
									value={this.state.bookName}
									onBlur={this.validatebookName}
									onChange={this.updateState}
									required
								/>
								<br />
								<TextField
									type="text"
									label="authorName"
									variant="outlined"
									name="authorName"
									value={this.state.authorName}
									onBlur={this.validateauthorName}
									onChange={this.updateState}
									required
								/>
								<br />
								<TextField
									type="number"
									min="0"
									onBlur={this.validatePrice}
									label="price"
									variant="outlined"
									name="price"
									onChange={this.updateState}
									required
								/>
								<br />
								<TextField
									type="number"
									min="0"
									label="quantity"
									variant="outlined"
									onBlur={this.validateQuantity}
									name="quantity"
									value={this.state.quantity}
									onChange={this.updateState}
									required
								/>
								<br />
								<TextareaAutosize
									className={classes.textArea}
									rowsMin={4}
									rowsMax={4}
									placeholder="Book Detail"
									name="bookDetails"
									onChange={this.updateState}
									required
								/>
								<br />
								<Button variant="contained" component="label">
									Upload Image
									<input
										type="file"
										style={{ display: 'none' }}
										name="image"
										onChange={this.uploadButtonClick}
										accept="Image/*"
										required
									/>
								</Button>
								<p className={classes.url}> {this.state.imgName} </p>
								<div>
									<Button
										type="submit"
										className={classes.addBook}
										variant="contained"
										onClick={this.addBook}>
										Save Book
									</Button>
									<Button onClick={this.openAddBook}> Cancel </Button>
								</div>
							</form>
						</DialogContent>
						<div
							className={
								this.state.isActive ? [Styles.snackbar, Styles.show].join(' ') : Styles.snackbar
							}>
							
							{this.state.status}
						</div>
					</Dialog>
				) : null}
				<div className="bookDisplay">
					
					{books}
					<div>
						
						{this.state.openUpdateDialog ? (
							<div>
								<Dialog className="updateDialog" open={true}>
									<DialogContent className="updateDialogContent">
										<form className="updateDialogContentForm" autoComplete="off">
											<Typography
												className={classes.heading}
												variant="h4"
												component="h2"
												gutterBottom>
												Update Books
											</Typography>
											<TextField
												type="text"
												label="bookName"
												variant="outlined"
												name="bookName"
												onBlur={this.validatebookName}
												onChange={this.updateState}
											/>
											<br />
											<TextField
												type="text"
												label="authorName"
												variant="outlined"
												name="authorName"
												value={this.state.authorName}
												onBlur={this.validateauthorName}
												onChange={this.updateState}
											/>
											<br />
											<TextField
												type="number"
												onBlur={this.validatePrice}
												label="price"
												variant="outlined"
												name="price"
												onChange={this.updateState}
											/>
											<br />
											<TextField
												type="number"
												min="0"
												label="quantity"
												variant="outlined"
												name="quantity"
												onBlur={this.validateQuantity}
												value={this.state.quantity}
												onChange={this.updateState}
											/>
											<br />
											<TextareaAutosize
												className={classes.textArea1}
												rowsMin={4}
												rowsMax={4}
												placeholder="Book Detail"
												name="bookDetails"
												onChange={this.updateState}
											/>
											<br />
											<div>
												<Button
													type="submit"
													className={classes.addBook}
													variant="contained"
													onClick={this.getUpdateBooks}>
													Submit
												</Button>
												<Button onClick={this.handleUpdate}> Cancel </Button>
											</div>
										</form>
									</DialogContent>
									<div
										className={
											this.state.isActive
												? [Styles.snackbar, Styles.show].join(' ')
												: Styles.snackbar
										}>
										
										{this.state.status}
									</div>
								</Dialog>
							</div>
						) : null}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(useStyles)(BasicTextFields);
