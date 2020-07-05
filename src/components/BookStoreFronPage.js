import React, { Component } from 'react';
import ListOfBooks from '../components/ListOfBooks';
import AppBar from '../components/AppBar';
import { getBookList, getBooksCount } from '../Configuration/BookConfig';
import Styles from '../css/snackbar.module.css';
import { getSortedBookList, getSearchedBooks } from '../Configuration/BookConfig';

class BookStoreFronPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bookList: [],
			cartBooks: [],
			searchKey: '',
			noOfRecord: 0,
			page: 1,
			status: '',
			isActive: false,
			displayType: 'allBooks',
			keyword: '',
			sortType: '',
			cartBooksCount: 0,
		};
	}

	setCartBooks = (prop) => {
		prop.quantity = 1;
		this.state.cartBooks.push(prop);
		this.setState({ cartBooks: this.state.cartBooks });
		localStorage.setItem('cartBook', JSON.stringify(this.state.cartBooks));
		this.setState({ cartBooksCount: this.state.cartBooks.length });
	};

	sortData = async (value) => {
		await this.setState({ sortType: value, displayType: 'sortBooks' });
		await localStorage.setItem('sortBooks', JSON.stringify(this.state.sortType));
		getSortedBookList(value, this.state.page)
			.then((res) => {
				this.setState({ bookList: res.data });
			})
			.catch((err) => {});
	};

	updateDisplayType = async (value) => {
		await this.setState({ displayType: value });
	};

	getBookLists = () => {
		if (this.state.displayType === 'allBooks') {
			getBookList(this.state.page)
				.then((res) => {
					this.setState({ bookList: res.data });
				})
				.catch((err) => {
					console.log(err);
				});
			this.totalItems('');
		} else if (this.state.displayType === 'searchBooks') {
			this.getSearchedBookList(this.state.keyword);
		} else if (this.state.displayType === 'sortBooks') {
			this.sortData(this.state.sortType);
		}
	};

	UNSAFE_componentWillMount() {
		this.totalItems('');
		this.getBookLists();
		if (localStorage.getItem('cartBook')) {
			this.setState({ cartBooks: JSON.parse(localStorage.getItem('cartBook')) });
			this.updateQuantity();
		}
		if (localStorage.getItem('sortBooks')) {
			this.sortData(JSON.parse(localStorage.getItem('sortBooks')));
		}
	}

	updateQuantity = async () => {
		await this.setState({ cartBookCount: 0 });
		await this.state.cartBooks.map((value, index) => {
			return this.setState((prev) => ({
				cartBooksCount: prev.cartBooksCount + value.quantity,
			}));
		});
	};

	totalItems = async (attribute) => {
		await getBooksCount(attribute).then((res) => {
			this.setState({ noOfRecord: res.data });
		});
	};

	handleChange = async (event, value) => {
		await this.setState({ page: value });
		this.getBookLists();
	};

	getSearchedBookList = async (attribute) => {
		this.setState({ keyword: attribute, displayType: 'searchBooks' });
		await getSearchedBooks(attribute, this.state.page)
			.then((res) => {
				this.setState({ bookList: res.data });
			})
			.catch((err) => {
				this.setState({ status: 'NO RECORD FOUND' });
				this.openSnackBar();
			});
		await this.totalItems(attribute);
	};

	openSnackBar = () => {
		this.setState({ isActive: true }, () => {
			setTimeout(() => {
				this.setState({ isActive: false });
			}, 3000);
		});
	};

	goToCart = (prop) => {
		this.props.history.push({
			pathname: '/cart',
		});
	};

	render() {
		return (
			<div>
				<AppBar
					searchBookList={this.getSearchedBookList}
					bookList={this.getBookLists}
					displayType={this.updateDisplayType}
					cartBooksCount={this.state.cartBooks.length}
					goToCart={this.goToCart}
				/>{' '}
				<ListOfBooks
					bookList={this.state.bookList}
					handleChange={this.handleChange}
					noOfRecord={this.state.noOfRecord}
					ref={this.bookStoreFrontPaage}
					sortData={this.sortData}
					setCartBooks={this.setCartBooks}
				/>{' '}
				<div className={this.state.isActive ? [Styles.snackbar, Styles.show].join(' ') : Styles.snackbar}>
					{' '}
					{this.state.status}{' '}
				</div>{' '}
			</div>
		);
	}
}

export default BookStoreFronPage;
