import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Styles from '../../css/snackbar.module.css';
import '../../css/Cart.css';

import {
	addUserDetails,
	addMoreItems,
	removeBookFromCart,
	removeFromCart,
	getAllItemsFromCart,
} from '../../Configuration/BookConfig';
import Dashboard from '../UserDashboard/Dashboard';
import Dashboard1 from '../UserDashboard/Dashboard1';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderID: 0,
			cartItems: 0,
			quantity: 1,
			descrption: 'abc',
			cart: [],
			dummy: [],
			total: '',
			showCustomerDetails: false,
			showOrderSummery: false,
			showOrderPlacedPage: false,
			showOrderSuccessful: false,
			sameBook: 1,
			fullName: '',
			phoneNumber: 0,
			pinCode: 0,
			city: '',
			address: '',
			landMark: '',
			type: '',
			state: '',
			locality: '',
			locationType: '',
			status: '',
			isActive: false,
			incrementDecrementCount: 1,
		};
	}

	componentDidMount() {
		this.getAllItemsFromCart();
	}

	getAllItemsFromCart = () => {
		let token = localStorage.getItem('Token');
		getAllItemsFromCart(token)
			.then((res) => {
				this.setState({ cart: res.data });
				// localStorage.setItem('cartCount',res.data.data.totalBooksInCart)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	validatePhoneNumber = (e) => {
		const regexp1 = /^[5-9]\d{9}$/;
		const char = e.target.value;
		if (!regexp1.test(char)) {
			this.openSnackBar('Invalid Phone Number');

			this.setState({
				[e.target.name]: '',
			});
		}
	};

	validateName = (e) => {
		const regexp = /[A-Za-z]{3,20}/;
		const char = e.target.value;
		if (!regexp.test(char)) {
			this.openSnackBar('Invalid Name');
			this.setState({
				[e.target.name]: '',
			});
		}
	};

	validatePinCode = (e) => {
		const regexp2 = /^[1-9]\d{5}$/;
		const char = e.target.value;
		if (!regexp2.test(char)) {
			document.getElementById(e.target.id).style.border = 'red';
			this.openSnackBar('Invalid PinCode');
			this.setState({
				[e.target.name]: '',
			});
		}
	};

	validateLocality = (e) => {
		const regexp2 = /[A-Za-z]{3,20}/;
		const char = e.target.value;
		if (!regexp2.test(char)) {
			document.getElementById(e.target.id).style.border = 'red';
			this.openSnackBar('Invalid Locality');
			this.setState({
				[e.target.name]: '',
			});
		}
	};

	validatecity = (e) => {
		const regexp2 = /[A-Za-z]{3,20}/;
		const char = e.target.value;
		if (!regexp2.test(char)) {
			document.getElementById(e.target.id).style.border = 'red';
			this.openSnackBar('Invalid City');
			this.setState({
				[e.target.name]: '',
			});
		}
	};

	validatestate = (e) => {
		const regexp2 = /[A-Za-z]{3,20}/;
		const char = e.target.value;
		if (!regexp2.test(char)) {
			document.getElementById(e.target.id).style.border = 'red';
			this.openSnackBar('Invalid state');
			this.setState({
				[e.target.name]: '',
			});
		}
	};


	validatelandmark = (e) => {
		const regexp2 = /[A-Za-z]{3,20}/;
		const char = e.target.value;
		if (!regexp2.test(char)) {
			document.getElementById(e.target.id).style.border = 'red';
			this.openSnackBar('Invalidlandmark');
			this.setState({
				[e.target.name]: '',
			});
		}
	};

	openSnackBar = async (prop) => {
		await this.setState({ status: prop });
		this.setState({ isActive: true }, () => {
			setTimeout(() => {
				this.setState({ isActive: false });
			}, 3000);
		});
	};
	nameHandler = (event) => {
		const fullName = event.target.value;
		console.log('fullName', fullName);
		this.setState({
			fullName: fullName,
		});
	};
	phoneNumberHandler = (event) => {
		const phoneNumber = event.target.value;
		console.log('phoneNumber', phoneNumber);
		this.setState({
			phoneNumber: phoneNumber,
		});
	};

	pincodeHandler = (event) => {
		const pinCode = event.target.value;
		console.log('pinCode', pinCode);
		this.setState({
			pinCode: pinCode,
		});
	};
	localityHandler = (event) => {
		const locality = event.target.value;
		console.log('locality', locality);
		this.setState({
			locality: locality,
		});
	};
	cityHandler = (event) => {
		const city = event.target.value;
		console.log('city', city);
		this.setState({
			city: city,
		});
	};
	addressHandler = (event) => {
		const address = event.target.value;
		console.log('address', address);
		this.setState({
			address: address,
		});
	};
	landmarkHandler = (event) => {
		const regexp = /[A-Za-z]{3,20}/;
		const landMark = event.target.value;
		console.log('landMark', landMark);
		this.setState({
			landMark: landMark,
		});
	};
	typeHandler = (event) => {
		const type = event.target.value;
		console.log('type', type);
		this.setState({
			type: type,
		});
	};

	locationTypeHandler = (event) => {
		const locationType = event.target.value;
		console.log('locationType', locationType);
		this.setState({
			locationType: locationType,
		});
	};

	stateHandler = (event) => {
		const state = event.target.value;
		this.setState({
			state: state,
		});
	};

	addCustomerDetailsHandler = (event) => {
		let token = localStorage.getItem('Token');
		console.log(token, 'token');
		let userDetailsDto = {};
		userDetailsDto.state = this.state.state;
		userDetailsDto.fullName = this.state.fullName;
		userDetailsDto.phoneNumber = this.state.phoneNumber;
		userDetailsDto.address = this.state.address;
		userDetailsDto.pinCode = this.state.pinCode;
		userDetailsDto.city = this.state.city;
		userDetailsDto.landMark = this.state.landMark;
		userDetailsDto.addressType = this.state.type;
		userDetailsDto.locality = this.state.locality;
		userDetailsDto.locationType = this.state.locationType;

		addUserDetails(userDetailsDto, token)
			.then((Response) => {
				alert('userDetails  Updated SuccessFully  ');
			})
			.catch((error) => {
				console.log('Error', error.response);
				console.log(error.response.data.message, 'Failed to update userDetails');

				alert(error.response.data.message, '*Failed to update userDetails');
			});
		this.setState({
			showCustomerDetails: false,
			showOrderSummery: true,
		});
	};

	sameBookAddHandler = (event, id) => {
		let count = this.state.incrementDecrementCount;
		this.setState({
			incrementDecrementCount: count + 1,
		});
	};
	sameBookRemoveHandler = (id) => {
		let count = this.state.incrementDecrementCount;
		this.setState({
			incrementDecrementCount: count - 1,
		});
	};




	addQuantity =  async (data) => {
		console.log("In addQuantityRequestMethod");
		let token = localStorage.getItem('Token');
        const res= addMoreItems(data,token);
		// this.setState({cart: (await res).data.data})
	    this.getAllItemsFromCart();
	 
    
    }
    removeFromCart = async (data) => {
		let token = localStorage.getItem('Token');
        const response = removeBookFromCart(data,token);
		// this.setState({ cart: (await response).data.data});
		this.getAllItemsFromCart();
    }
    
    substractQuantity = async (data) => {
		let token = localStorage.getItem('Token');
        const res= removeFromCart(data,token);
		// this.setState({cart: (await res).data.data})
		this.getAllItemsFromCart();
    }

	

	placeorder = (event) => {
		this.setState({
			placeorder: true,
		});
	};

	totalCost = (id) => {
		let total = 0;
		this.state.book.forEach((book) => {
			total = book.price;
		});
		console.log('the total price is' + total);
	};

	customerDetailsShowHandler = (event) => {
		// this.props.history.push('/login');
		this.setState({
			showCustomerDetails: true,
		});
	};
	orderSummeryShowHandler = async () => {
		let doesShowOrderSummary = this.state.showOrderSummery;
		let doesShowCustomerDetails = this.state.showCustomerDetails;
		this.setState({
			showOrderSummary: !doesShowOrderSummary,
			showCustomerDetails: !doesShowCustomerDetails,
		});
	};
	orderSummeryShowHandler = async () => {
		let doesShowOrderSummery = this.state.showOrderSummery;
		this.setState({
			showOrderSummery: !doesShowOrderSummery,
		});
	};
	orderPlacedPageHandler(event) {
		localStorage.removeItem('cartCount');

		window.location.assign('/ordersuccessfull');
	}



	checkoutClickHandler = () => {
		const doesShowOrderSuccessful = this.state.showOrderSuccessful;

		this.setState({
			showOrderSuccessful: !doesShowOrderSuccessful,
			
		});
	};

	render() {
		const { fullName, phoneNumber, pinCode, city, address, landMark, locality, locationType } = this.state;
		const enabled =
			fullName.length > 0 &&
			phoneNumber.length > 0 &&
			pinCode.length > 0 &&
			city.length > 0 &&
			address.length > 0 &&
			landMark.length > 0 &&
			locality.length > 0 &&
			locationType.length > 0;

		return (
			<Container maxWidth="lg">
				<div>
					<Dashboard1 cart={this.state.cart.length} />
					<Grid item xs={10}>
						<div className="Customer-address-div" style={{ marginTop: '78px' }}>
							<Typography id="mycart-title" variant="h5">
								My cart({this.state.cart.length})  
							</Typography>

							{this.state.cart.map((ele,index) => {
								return (
									<div>
										<div>
											<div>
												<div>
													<div className="book-details-divcart">
														<div className="img-book">
															<img
																id="img-book"
																src={ele.imgUrl}
																style={{ borderRadius: 0, justifyContent: 'center' }}
															/>
														</div>

														<div className="aligncontentbesidepic">
															<div>
																<h4 className="h4-div">{ele.name}</h4>
															</div>
															<div className="author-name-div">
																<p>{ele.author}</p>
															</div>
															<div className="book-price-div">
																<p> ₹ {this.state.quantity * ele.totalPrice}</p>
															</div>
															{/* <div className="book-price-div" >
                                                    { <p>total={this.state.quantity * ele.price}</p> }
                        
                                                </div> */}
															<div className="quantity-div">
																{/* { <button className="minus-btn" 
                                                       onClick={this.substractQuantity} >
                                                        <RemoveRoundedIcon className="icon" />
                                                    </button> } */}

																<Button
																	key={ele.id}
																	onClick={() => this.substractQuantity(ele.bookId)}>
																	<RemoveCircleOutlineIcon />
																</Button>

																<div className="input-type">
																	{/* {this.state.quantity} */}
																	{ele.quantity}
																</div>

																<div>
																	<Button
																		key={ele.id}
																		onClick={() => this.addQuantity(ele.bookId)}>
																		<AddCircleOutlineIcon />
																	</Button>
																</div>
																<button
																	className="remove-btn"
																	key={ele.id}
																	onClick={() => this.removeFromCart(ele.bookId)}>
																	Remove
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
							{this.state.quantity != 0 ? (
								<div className="continue-cart-div">
									<Button
										className="continue-shopping-cart-button"
										onClick={this.customerDetailsShowHandler}
										style={{ backgroundColor: '#3371B5', color: 'white' }}>
										PLACE ORDER
									</Button>
								</div>
							) : null}
						</div>  
						&nbsp;&nbsp;&nbsp;
					</Grid>
					<Grid item xs={10}>
						<div className="Customer-address-div">
							<div className="address-title">
								<h3 className="my-cart-h4">Customer Details</h3>
							</div>
							{this.state.showCustomerDetails ? (
								<form>
									<div className="form-group">
										<input
											type="text"
											required
											placeholder="Name"
											id="name"
											className="form-control "
											onChange={this.nameHandler}
											onBlur={this.validateName}
										/>

										<input
											type="text"
											required
											placeholder="Phone number"
											id="phoneNumber"
											className="form-control "
											onChange={this.phoneNumberHandler}
											onBlur={this.validatePhoneNumber}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											required
											placeholder="pincode"
											id="pincode"
											className="form-control "
											onChange={this.pincodeHandler}
											onBlur={this.validatePinCode}
										/>
										<input
											type="text"
											placeholder="locality"
											id="locality"
											className="form-control "
											onChange={this.localityHandler}
											onBlur={this.validateLocality}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											required
											placeholder="city/town"
											id="city"
											className="form-control "
											onChange={this.cityHandler}
										/>

										<input
											type="text"
											required
											placeholder="landmark"
											id="landmark"
											className="form-control "
											onChange={this.landmarkHandler}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											required
											placeholder="address"
											id="address"
											className="address-group "
											onChange={this.addressHandler}
										/>
										<input
											type="text"
											required
											placeholder="locationType"
											id="landmark"
											className="form-control "
											onChange={this.locationTypeHandler}
										/>
									</div>
									<div className="type-div">
										<label>Type</label>
										<div>
											<RadioGroup row aria-label="position" name="position" defaultValue="top">
												<FormControlLabel
													value="home"
													control={<Radio color="primary" />}
													label="Home"
													onChange={this.typeHandler}
												/>
												<FormControlLabel
													value="work"
													control={<Radio color="primary" />}
													label="Work"
													onChange={this.typeHandler}
												/>
												<FormControlLabel
													value="other"
													control={<Radio color="primary" />}
													label="Other"
													onChange={this.typeHandler}
												/>
											</RadioGroup>
										</div>
									</div>

									<div className="continue-cart-div">
										

										<Button
											type="submit"
											id="continue"
											className="address-button"
											style={{ backgroundColor: '#3371B5', color: 'white' }}
											onClick={this.addCustomerDetailsHandler}
											disabled={!enabled}>
											CONTINUE
										</Button>
									</div>
								</form>
							) : null}
						</div>  
						&nbsp;&nbsp;&nbsp;
					</Grid>
					<Grid item xs={10}>
						<div className="order-sumary">
							<div className="cart-title-div">
								<h3 className="my-cart-h4">Order Summary</h3>
							</div>

							{this.state.showOrderSummery
								? this.state.cart.map((ele) => {
										return (
											<div className="order-details-div">
												<div className="img-book">
													<img
														src={ele.imgUrl}
														className="order-logo"
														style={{
															borderRadius: 0,
															width: '150px',
															justifyContent: 'center',
														}}
													/>
												</div>
												<div className="aligncontentbesidepic">
													<div className="book-title-div">
														<h4>{ele.name}</h4>
													</div>
													<div className="author-name-div">
														<p>{ele.author}</p>
													</div>
													<div className="book-price-div">
														<p>Rs.{ele.totalPrice}</p>
													</div>
												</div>
											</div>
										);
								  })
								: null}
							<div className="checkout-div">
								<button
									className="checkout-button"
									onClick={this.orderPlacedPageHandler}
									style={{ backgroundColor: '#3371B5', color: 'white' }}>
									CHECKOUT
								</button>
							</div>
						</div>
					</Grid>
					<div className={this.state.isActive ? [Styles.snackbar, Styles.show].join(' ') : Styles.snackbar}>
						{this.state.status}  
					</div>  
				</div>
			</Container>
		);
	}
}

export default Cart;
