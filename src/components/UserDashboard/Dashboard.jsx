import React, { Component } from 'react';
import DisplayBooks from './DisplayBooks';
import Cart from '../Cart/Cart';
import { withRouter } from 'react-router-dom';
import { responsiveFontSizes, Grid, ListItemSecondaryAction } from '@material-ui/core';
import Dashboard1 from './Dashboard1';
import { getBookByPriceAsc, getBookByPriceDesc } from '../../Configuration/confiugration';
import {
	addToCart,
	getUserDashboardBookList,
	findByAuthorname,
	addToWishlist,
	getAllItemsFromCart,
	getWishListBooks,
} from '../../Configuration/BookConfig';
import Wishlist from '../Whishlist/Wishlist';
import '../../css/BookDetails.css';
import '../../css/SellerPage.css';
import Pagination from '@material-ui/lab/Pagination';

class Dashboard extends Component {
	state = {
		books: [],
		bookCount: 0,
		cartCount: 1,
		wishlistCount: 1,
		clickedId: [],
		clickedIdwishlist: [],
		cart: [],
		addToBagBtnText: 'Add to Bag',
		addTowishlistText: 'Add to wishlist',
		showMyCartComponent: false,
		filterArray: [],
		isSearching: false,
		filterArrayCount: 0,
		currentPage: 1,
		postsPerPage: 8,
		wishlist: [],
		enabled: false,
		wishlistbutton: true,

		length: 0,

		// ShowWishListComponent:false,
	};

	componentDidMount() {
		this.getBookLists();
		this.getAllItemsFromCart();
		this.getAllItemFromWishList();

		if (localStorage.getItem('items') && !localStorage.getItem('Token')) {
			this.setState({
				clickedId: window.localStorage.getItem('items'),
			});
		}
	}

	getAllItemsFromCart = () => {
		let token = localStorage.getItem('Token');
		getAllItemsFromCart(token)
			.then((res) => {
				res.data.forEach((element) => {
					this.setState(
						{
							clickedId: [...this.state.clickedId, element.bookId],
						},
						() => console.log('reference', this.state.clickedId)
					);

					// this.addToBagClickHandler(element.bookId)
				});
				console.log('a');
				console.log(res.data.length);
				console.log(res.data);
				console.log('b');

				this.setState({ cart: res.data }, () => this.updatebadgecount());
			})

			.catch((err) => {
				console.log(err);
			});
	};

	updatebadgecount = () => {
		this.setState({
			length: this.state.cart.length,
		});
	};

	getAllItemFromWishList = () => {
		let token = localStorage.getItem('Token');

		getWishListBooks(token)
			.then((res) => {
				res.data.forEach(element => {
					this.setState({
						clickedIdwishlist:[...this.state.clickedIdwishlist,element.bookId]
					},()=>console.log('reference',this.state.clickedIdwishlist))

				});
				this.setState({ wishlist: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getBookLists = () => {
		getUserDashboardBookList()
			.then((res) => {
				this.setState({ books: res.data.data });
				this.setState({ cartCount: this.cart.length });
				this.setState({
					maxNumOfPage: Math.ceil(this.state.books.length / this.state.todosPerPage),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	cartIconClickedHandler = () => {
		let doesShowMyCartComponent = this.state.showMyCartComponent;
		this.setState({
			showMyCartComponent: !doesShowMyCartComponent,
		});
	};

	paginate = (pageNumber) => {
		this.setState({
			currentPage: pageNumber,
		});
		console.log('pagenumber after', this.state.currentPage);
	};

	wishListIconClickedHandler = () => {
		let doesShowWishListComponent = this.state.ShowWishListComponent;
		this.setState({
			ShowWishListComponent: !doesShowWishListComponent,
		});
	};

	searchHandler = (event) => {
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

	sortByRelevanceHandler = (event) => {
		const selection = event.target.value;
		let books = this.state.books;
		console.log(selection);
		if (selection.toString() === 'price: low to high') {
			const cartCountRes = getBookByPriceAsc();
			cartCountRes.then((res) => {
				this.setState({
					books: res.data.data,
				});
			});
		} else {
			const response = getBookByPriceDesc();
			const booksDesc = getBookByPriceDesc();
			booksDesc.then((res) => {
				this.setState({
					books: res.data.data,
				});
			});
		}
	};

	addToBagClickHandler = (clickedID, book) => {
		console.log(book);
		let token = localStorage.getItem('Token');
		let cartCount = this.state.cartCount;
		let clickedid = this.state.clickedId;
		clickedid.push(clickedID);
		this.setState(
			{
				cartCount: this.state.cartCount,
				clickedId: [...clickedid],
				addToBagBtnText: 'Added to bag',
				wishlistbutton: false,
			}
			// () => this.bookslocalstore(book)
		);

		var cart = {
			bookId: clickedID,
		};

		addToCart(cart, token).then((res) => {
			this.getAllItemsFromCart();
		});
	};


	
		

	// bookslocalstore = (book) => {
	// 	console.log(book)
	// 	if (!localStorage.getItem('Token')) {
	// 		window.localStorage.setItem('items', JSON.stringify(this.state.clickedId));
	// 		// window.localStorage.setItem("books",  JSON.stringify(book));
	// 	}

	// 	if (!window.localStorage.getItem('books')) {
	// 		window.localStorage.setItem('books', JSON.stringify(book));
	// 	} else {


	// 		var data = [localStorage.getItem('books')]

    //         // data = data ? JSON.parse(data) : {};

	// 		// data[this.state.clickedId.length] = book;
	// 		data.push(book)

    //         localStorage.setItem('books', JSON.stringify(data));
			
           
	// 		// var data = localStorage.getItem('books');

	// 		//   data = data ? JSON.parse(data) : [];
			  
	// 		//   let a=[book]

    //         //  data.push(a);

	// 		//   localStorage.setItem('books', JSON.stringify(data));
			  


	// 		//   JSONObject myjson = new JSONObject(book);
    //         //   JSONArray the_json_array = myjson.getJSONArray("profiles");
            
	// 		// var a = [];
	// 		// a.push(JSON.parse(localStorage.getItem('session')));
	// 		// localStorage.setItem('session', JSON.stringify(a));


	// 		// var temp=[];
	// 		// temp.push(JSON.parse(window.localStorage.getItem('books')));
	// 		// window.localStorage.setItem("books",  JSON.stringify(temp));

	// 		// var	temp= JSON.parse(window.localStorage.getItem("books"))
	// 		// 	temp.push(book)
	// 		//        console.log('temp',temp)

	// 		// 	   window.localStorage.setItem("books",  JSON.stringify(temp));
	// 		// 	   console.log(JSON.parse(window.localStorage.getItem("books")))
	// 	}
	// };

	addToWishlistClickHandler = (clickedIDWishlist) => {
		let token = localStorage.getItem('Token');
		let wishlistCount = this.state.wishlistCount;
		let clickedidWishlist = this.state.clickedIdwishlist;
		clickedidWishlist.push(clickedIDWishlist);
		this.setState({
			wishlistCount: this.state.wishlistCount,
			clickedIdwishlist: [...clickedidWishlist],
			addTowishlistText: 'Added to wishlist',
		});
		var wishlist1 = {
			bookId: clickedIDWishlist,
		};
		addToWishlist(wishlist1, token).then((res) => {
			this.getAllItemFromWishList();
		});
	};

	alerts = (event, value) => {
		this.paginate(value);
	};

	render() {
		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
		const currentPosts = this.state.books.slice(indexOfFirstPost, indexOfLastPost);

		return (
			<>
				<Dashboard1
					cart={this.state.length}
					wishlist={this.state.wishlist.length}
					cartIconClickedHandler={this.cartIconClickedHandler}
					searchHandler={this.searchHandler}
					wishlistCount={this.state.wishlistCount}
					wishListIconClickedHandler={this.wishListIconClickedHandler}
				/>

				{this.state.showMyCartComponent ? (
					<Cart />
				) : this.state.ShowWishListComponent ? (
					<Wishlist wishlist={this.state.wishlist} />
				) : (
					<>
						<DisplayBooks
							books={this.state.isSearching ? this.state.filterArray : currentPosts}
							bookCount={this.state.isSearching ? this.state.filterArrayCount : this.state.bookCount}
							TotalCount={this.state.books.length}
							onChangePaginationHandler={this.onChangePaginationHandler}
							addToBagClickHandler={this.addToBagClickHandler}
							addToWishlistClickHandler={this.addToWishlistClickHandler}
							clickedId={this.state.clickedId}
							clickedIdwishlist={this.state.clickedIdwishlist}
							addToBagBtnText={this.state.addToBagBtnText}
							addTowishlistText={this.state.addTowishlistText}
							sortByRelevanceHandler={this.sortByRelevanceHandler}
							wishlistbutton={this.state.wishlistbutton}

							// cart={this.state.length}
							// enabled={this.state.enabled}
						/>

						<Grid container className="page">
							<Pagination
								onChange={this.alerts}
								showFirstButton
								showLastButton
								count={Math.ceil(this.state.books.length / 8)}
							/>
						</Grid>
					</>
				)}
			</>
		);
	}
}
export default withRouter(Dashboard);
