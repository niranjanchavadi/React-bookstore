import React, { Component } from 'react';
import DisplayBooks from './DisplayBooks';
import Cart from '../Cart/Cart';
import Pagination from '../pagination/Pagination';
import { withRouter } from 'react-router-dom';
import { responsiveFontSizes } from '@material-ui/core';
import Dashboard1 from './Dashboard1';
import { getBookByPriceAsc, getBookByPriceDesc } from '../../Configuration/confiugration';
import { addToCart, getUserDashboardBookList, findByAuthorname, addToWishlist } from '../../Configuration/BookConfig';
import Wishlist from '../Whishlist/Wishlist';


class Dashboard extends Component {
	
	state = {
		books: [],
		bookCount: 0,
		cartCount: 1,
		wishlistCount:1,
		clickedId: [],
		clickedIdwishlist:[],
		cart: [],
		addToBagBtnText: 'Add to Bag',
		addTowishlistText:'Add to wishlist',
		showMyCartComponent: false,
		filterArray: [],
		isSearching: false,
		filterArrayCount: 0,
		currentPage: 1,
		postsPerPage: 8,
		wishlist:[],
		// ShowWishListComponent:false,
	};

	componentDidMount() {
		this.getBookLists();
	}

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

	addToBagClickHandler = (clickedID) => {
		let token = localStorage.getItem('Token');
		let cartCount = this.state.cartCount;
		let clickedid = this.state.clickedId;
		clickedid.push(clickedID);
		this.setState({
			cartCount: this.state.cartCount,
			clickedId: [...clickedid],
			addToBagBtnText: 'Added to bag',
		});
		var cart = {
			bookId: clickedID,
		};
		
		const response = addToCart(cart,token);
		response.then((res) => {
			console.log('AddtoBag Response ', res.data);
		});
	};

	addToWishlistClickHandler = (clickedIDWishlist) =>{

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
		const response =  addToWishlist(wishlist1,token);
		response.then((res) => {
			console.log('Addtowishlist Response ', res.data);
		});
		// this.props.history.push("/wishlist");
	}

	
	

	render() {
		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
		const currentPosts = this.state.books.slice(indexOfFirstPost, indexOfLastPost);

		return (
			<>
				<Dashboard1
					// cart={this.props.cart.length}
					// wishlist={this.props.wishlist.length}
					cartIconClickedHandler={this.cartIconClickedHandler}
					searchHandler={this.searchHandler}
					wishlistCount={this.state.wishlistCount}
					wishListIconClickedHandler={this.wishListIconClickedHandler}
				/>
					
				{this.state.showMyCartComponent ? (
					<Cart />
				) :  this.state.ShowWishListComponent ? (
                    <Wishlist wishlist={this.state.wishlist} />
                  ):(
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
						/>

						<Pagination
							postsPerPage={this.state.postsPerPage}
							totalPosts={this.state.books.length}
							paginateNumber={this.paginate}
						/>
					</>
				)}

				
			</>
		);
	}
}
export default withRouter(Dashboard);
