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
import { addBookConfiguration, addUploadConfiguration } from '../../Configuration/confiugration';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, Popover, MenuItem, IconButton, Tooltip, Menu, Grid } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import '../../css/SellerPage.css';
import Styles from '../../css/snackbar.module.css';
import Login from '../UserRegistration/Login';
import Pagination from '@material-ui/lab/Pagination';

import {
	getBookList,
	getBooksCount,
	getUpdateBooks,
	getDeleteBooks,
	getBookDetails,
	sendApprovalRequest,
	getunverifiedBooksofseller,
	getApprovedBooks,
	getDisapprovedBooks,
} from '../../Configuration/BookConfig';
import SellerProfile from '../Profile/SellerProfile';
import SimpleMenu from './SimpleMenu';
import SellerDashboard from './SellerDashboard';
import Sellerbooks from './Sellerbooks';

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
		width: '98%',
		borderRadius: '5px',
		resize: 'none',
	},
	addBook: {
		marginLeft: '1%',
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
			// bookList: [],
			displayType: 'allBooks',
			clickedId: [],
			approvalclickedId: [],
			openUpdateDialog: false,
			openAdd: false,
			books: [],
			approvedBooks: [],
			bookId: '',
			sellerId: '',
			anchorEl: null,
			setAnchorEl: null,
			isActive: false,
			bookCount: 0,
			approvedBooksCount: 0,
			currentPage: 1,
			postsPerPage: 8,
			filterArray: [],
			isSearching: false,
			filterArrayCount: 0,
			
			
			updatenewbooksstate: false,
			approvedbookssearch: true,
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
		let bookId = this.state.bookId;

		let token = localStorage.getItem('Token');

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

				this.openSnackBar('Book  Updated SuccessFully');
			})
			.catch((error) => {
				console.log('Error', error.response);
				console.log(error.response.data.message, 'Failed to update book');
				this.openSnackBar('Book  Update failed');
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
		this.setState({
			updatenewbooksstate: true,
		});

		getunverifiedBooksofseller(token)
			.then((res) => {
				this.setState({ books: res.data.data });
				this.setState({
					maxNumOfPage: Math.ceil(this.state.books.length / this.state.todosPerPage),
					approvedbookssearch: false,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getApprovedbooks = () => {
		let token = localStorage.getItem('Token');

		this.setState({
			updatenewbooksstate: false,
		});

		getApprovedBooks(token)
			.then((res) => {
				this.setState({ approvedBooks: res.data.data });
				this.setState({
					maxNumOfPage: Math.ceil(this.state.approvedBooks.length / this.state.todosPerPage),
					approvedbookssearch: true,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getDisapprovedBooks = () => {
		let token = localStorage.getItem('Token');

		this.setState({
			updatenewbooksstate: false,
		});

		getDisapprovedBooks(token)
			.then((res) => {
				this.setState({ approvedBooks: res.data.data });
				this.setState({
					maxNumOfPage: Math.ceil(this.state.approvedBooks.length / this.state.todosPerPage),
					approvedbookssearch: true,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	paginate = (pageNumber) => {
		this.setState({
			currentPage: pageNumber,
		});
		console.log('pagenumber after', this.state.currentPage);
	};

	// componentDidMount() {
	// 	this.getBookLists();
	// }

	changeUrl = (event) => {
		this.setState({ files: event.target.value });
	};

	updateState = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleUpdate = (book) => {
		this.setState({
			openUpdateDialog: !this.state.openUpdateDialog,
			bookId: book.bookId,
			bookName: book.bookName,
			authorName: book.authorName,
			price: book.price,
			quantity: book.quantity,
			bookDetails: book.bookDetails,
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
			}, 3000);
		});
	};

	validateauthorName = (e) => {
		// const regexp = /^[A-Z][a-z\s]{3,}$/;
		const regexp = /^[A-Z][A-Za-z\s]{3,}$/;
		const char = e.target.value;
		if (!regexp.test(char)) {
			this.openSnackBar('Invalid Author Name');
			this.setState({
				[e.target.name]: '',
			});
		}
	};

	validatebookName = (event) => {
		const regexp = /^[A-Z][A-Za-z\s]{3,}$/;
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

				this.openSnackBar('Book Added SuccessFully');
			})
			.catch((error) => {
				console.log('Error', error.response);
				console.log(error.response.data.message, 'Failed to add book');

				this.openSnackBar(' Failed to add Book');
			});
	};

	sendApprovalRequest = (clickedID2) => {
		// let bookId = this.state.bookId;

		// let token = localStorage.getItem('Token');

		// sendApprovalRequest(bookId, token)
		// 	.then((Response) => {
		// 		this.openSnackBar('Approval request sent ');
		// 	})
		// 	.catch((error) => {
		// 		this.openSnackBar(error.response.data.message, 'Approval request failed ');
		// 	});

		let approvalclickedid = this.state.approvalclickedId;
		approvalclickedid.push(clickedID2);
		this.setState({
			approvalclickedId: [...approvalclickedid],
		});
		var bookidnew = {
			bookId: clickedID2,
		};
		let token = localStorage.getItem('Token');
		sendApprovalRequest(bookidnew, token)
			.then((res) => {
				this.openSnackBar('Approval request sent ');
			})
			.catch((err) => {
				this.openSnackBar(err.response.data.message, 'Approval request failed ');
			});
	};

	handleApprovalRequest = (clickedID2) => {
		// this.setState({
		// 	bookId: bookId,
		// });
		this.sendApprovalRequest(clickedID2);
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

	handleChange = () => {
		this.props.history.push('/admin');
	};

	searchHandler = (event) => {
		// alert('newbooks');
		let search = event.target.value;
		if (search.toString().length >= 1) {
			const newData = this.state.books.filter((item) => {
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

	approvedsearchHandler = (event) => {
		// alert('approvedbooks');
		let search = event.target.value;
		if (search.toString().length >= 1) {
			const newData = this.state.approvedBooks.filter((item) => {
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

	alerts = (event, value) => {
		this.paginate(value);
	};

	openSnackBar = async (prop) => {
		await this.setState({ status: prop });
		this.setState({ isActive: true }, () => {
			setTimeout(() => {
				this.setState({ isActive: false });
			}, 3000);
		});
	};

	render() {
		// const { bookName,authorName, price,quantity, bookDetails} = this.state;

		// const enabled = bookName.length > 0 && authorName.length > 0 && price.length > 0 && quantity.length > 0 && bookDetails.length > 0;

		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
		const currentPosts = this.state.books.slice(indexOfFirstPost, indexOfLastPost);
		const currentPosts2 = this.state.approvedBooks.slice(indexOfFirstPost, indexOfLastPost);
		// let isloggedin = localStorage.getItem('Email') ? true : false;
		let isloggedin = localStorage.getItem('RoleType') === 'SELLER' ? true : false;

		const { classes } = this.props;
		return (
			<Fragment>
				<div>
					<SellerDashboard
						searchHandler={this.searchHandler}
						approvedsearchHandler={this.approvedsearchHandler}
						approvedbookssearch={this.state.approvedbookssearch}
					/>{' '}
				</div>{' '}
				<div className="bookcount-sortby-div">
					<Typography id="display-book-title" variant="h4" style={{ marginLeft: '30%', color: '#A03037' }}>
						<b> Sell Your Books Here </b>{' '}
					</Typography>{' '}
				</div>{' '}
				<div className="addBookButton">
					<SimpleMenu
						getBookLists={this.getBookLists}
						getApprovedbooks={this.getApprovedbooks}
						getDisapprovedBooks={this.getDisapprovedBooks}
					/>{' '}
					<Button
						onClick={this.openAddBook}
						variant="contained"
						disabled={!isloggedin}
						style={{ backgroundColor: '#A03037', color: 'white' }}>
						ADD BOOK{' '}
					</Button>{' '}
				</div>{' '}
			
				{!isloggedin && (
					<div className="bookcount-sortby-div">
						<Typography
							id="display-book-title"
							variant="h5"
							style={{ marginLeft: '35%', color: '#A03037' }}>
							<b> Please Login to Add Books </b>{' '}
						</Typography>{' '}
					</div>
				)}{' '}
				{this.state.openAdd ? (
					<Dialog className="addDialog" open={true}>
						<DialogContent className="addDialogContent">
							<form className="addDialogContentForm" autoComplete="off">
								<Typography className={classes.heading} variant="h4" component="h2" gutterBottom>
									Add Books{' '}
								</Typography>{' '}
								<TextField
									type="text"
									label="Book Name"
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
									label="Author Name"
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
									label="Price"
									variant="outlined"
									name="price"
									onChange={this.updateState}
									required
								/>
								<br />
								<TextField
									type="number"
									min="0"
									label="Quantity"
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
								<p className={classes.url}> {this.state.imgName} </p> <br />
								<div className="save button">
									<Button
										type="submit"
										className={classes.addBook}
										variant="contained"
										// disabled={!enabled}
										onClick={this.addBook}>
										Save{' '}
									</Button>{' '}
									<Button onClick={this.openAddBook} varia3nt="outlined">
										Cancel{' '}
									</Button>{' '}
								</div>{' '}
							</form>{' '}
						</DialogContent>{' '}
						<div
							className={
								this.state.isActive ? [Styles.snackbar, Styles.show].join(' ') : Styles.snackbar
							}>
							{' '}
							{this.state.status}{' '}
						</div>{' '}
					</Dialog>
				) : null}{' '}
				<div className="bookDisplay">
					<Sellerbooks
						books={this.state.isSearching ? this.state.filterArray : currentPosts}
						bookCount={this.state.isSearching ? this.state.filterArrayCount : this.state.bookCount}
						TotalCount={this.state.books.length}
						approvedBooks={this.state.isSearching ? this.state.filterArray : currentPosts2}
						approvedBooksCount={
							this.state.isSearching ? this.state.filterArrayCount : this.state.approvedBooksCount
						}
						TotalapprovedBooksCount={this.state.approvedBooks.length}
						onChangePaginationHandler={this.onChangePaginationHandler}
						handleUpdate={this.handleUpdate}
						handleApprovalRequest={this.handleApprovalRequest}
						handleDelete={this.handleDelete}
						clickedId={this.state.clickedId}
						approvalclickedId={this.state.approvalclickedId}
						updatenewbooksstate={this.state.updatenewbooksstate}
					/>{' '}
					<Grid container className="page">
						<Pagination
							onChange={this.alerts}
							showFirstButton
							showLastButton
							// count={Math.ceil(this.state.approvedBooks.length / 8)}
							count={
								!this.state.approvedbookssearch
									? Math.ceil(this.state.books.length / 8)
									: Math.ceil(this.state.approvedBooks.length / 8)
							}
						/>{' '}
					</Grid>{' '}
					<div>
						{' '}
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
												Update Books{' '}
											</Typography>{' '}
											<TextField
												type="text"
												label="Book Name"
												variant="outlined"
												value={this.state.bookName}
												name="bookName"
												onBlur={this.validatebookName}
												onChange={this.updateState}
											/>{' '}
											<br />
											<TextField
												type="text"
												label="Author Name"
												variant="outlined"
												name="authorName"
												value={this.state.authorName}
												onBlur={this.validateauthorName}
												onChange={this.updateState}
											/>{' '}
											<br />
											<TextField
												type="number"
												onBlur={this.validatePrice}
												label="Price"
												value={this.state.price}
												variant="outlined"
												name="price"
												onChange={this.updateState}
											/>{' '}
											<br />
											<TextField
												type="number"
												min="0"
												label="Quantity"
												variant="outlined"
												name="quantity"
												value={this.state.quantity}
												onBlur={this.validateQuantity}
												value={this.state.quantity}
												onChange={this.updateState}
											/>{' '}
											<br />
											<TextareaAutosize
												className={classes.textArea1}
												rowsMin={4}
												rowsMax={4}
												value={this.state.bookDetails}
												placeholder="Book Detail"
												name="bookDetails"
												onChange={this.updateState}
											/>{' '}
											<br />
											<div>
												<Button
													type="submit"
													className={classes.addBook}
													variant="contained"
													onClick={this.getUpdateBooks}>
													Submit{' '}
												</Button>
												&nbsp;&nbsp;&nbsp;
												<Button onClick={this.handleUpdate}> Cancel </Button>{' '}
											</div>{' '}
										</form>{' '}
									</DialogContent>{' '}

							
									
									<div
										className={
											this.state.isActive
												? [Styles.snackbar, Styles.show].join(' ')
												: Styles.snackbar
										}>
										{' '}
										{this.state.status}{' '}
									</div>{' '}
								</Dialog>{' '}
							</div>
						) : null}{' '}
					</div>{' '}

					
				</div>{' '}
			</Fragment>
		);
	}
}

export default withStyles(useStyles)(BasicTextFields);
