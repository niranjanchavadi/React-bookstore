import React, { Component } from 'react';
import { Container, Divider } from '@material-ui/core';
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
	getWishListBooks,
	removeAll,
	orderPlaced,
	getUserDetails,
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
			wishlist: [],
			dummy: [],
			total: '',
			showCustomerDetails: false,
			showOrderSummery: false,
			showOrderPlacedPage: false,
			showOrderSuccessful: false,
			sameBook: 1,
			fullName: '',
			phoneNumber: '',
			pinCode: '',
			city: '',
			address: '',
			landMark: '',
			type: '',
			state: '',
			status: '',
			isActive: false,
			incrementDecrementCount: 1,

			totalPrice: 0,
			OrderAmount: 0,
			shippingcharge:0,
			totalPayable: 0,

			helperName: '  ',
			helperphoneNumber: '  ',
			helperPincode: '  ',
			helperstate: '  ',
			helpercity: '  ',
			helperlandmark: '  ',
			helperaddress: '  ',
			firstNameerror: false,
			phoneNumerror: false,
			pinCodeerror: false,
			stateerror:false,
			cityerror:false,
			landmarkerror: false,
			addresserror:false,

			customerPanel: false,
			ordersummaryPanel: false,
			// enabled: false,
		
			availablequantity:0,
			// value:'HOME'
		};
	}

	componentDidMount() {
	

		if(localStorage.getItem("Token")){
			this.getAllItemsFromCart();
		}
		else{
            
			let temp = JSON.parse(window.localStorage.getItem("books"))
			console.log("abcd")
				 console.log(temp)
				// this.state.cart=temp


				temp.forEach((element,index) => {
					this.state.cart[index]=element
				});
				
			
		}
		console.log(this.state.cart)
		
	
		this.getAllItemFromWishList();
	}

     getUserDetails = () =>{

        
		let userid=localStorage.getItem("UserId")
		console.log('id',userid)
		if(userid !== null){
			getUserDetails(userid).then((res) => {
				this.setState({ 
					fullName:res.data.fullName,
				phoneNumber:res.data.phoneNumber,
				pinCode: res.data.pinCode,
				city: res.data.city,
				address: res.data.address,
				landMark: res.data.landmark,
				type: res.data.type,
				state: res.data.state,
				 })
				
	
			})
			
		}
	
	 }




	getAllItemsFromCart = () => {
		let token = localStorage.getItem('Token');
		getAllItemsFromCart(token)
			.then((res) => {
				this.setState({ cart: res.data },()=>console.log('ref', this.state.cart));
				// localStorage.setItem('cartCount',res.data.data.totalBooksInCart)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getAllItemFromWishList = () => {
		let token = localStorage.getItem('Token');

		getWishListBooks(token)
			.then((res) => {
				this.setState({ wishlist: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	nameHandler = (event) => {
		const fullName = event.target.value;
		console.log('fullName', fullName);
		this.setState({
			fullName: fullName,
		});

		const regexp = /^[A-Z][A-Za-z\s]{3,}$/;
		const char = event.target.value;
		if (!regexp.test(char)) {
			this.setState({
				[event.target.name]: '',
				firstNameerror: true,
				helperName: 'Please enter a valid name',
			});
		} else {
			this.setState({
				[event.target.name]: '',
				firstNameerror: false,
				helperName: ' ',
			});
		}
		// this.enablebutton();
	};

	phoneNumberHandler = (event) => {
		const phoneNumber = event.target.value;
		console.log('phoneNumber', phoneNumber);
		this.setState({
			phoneNumber: phoneNumber,
		});

		const regexp1 = /^[5-9]\d{9}$/;
		const char = event.target.value;

		if (!regexp1.test(char)) {
			this.setState({
				[event.target.name]: '',
				phoneNumerror: true,
				helperphoneNumber: 'Please enter a valid phone number',
			});
		} else {
			this.setState({
				[event.target.name]: '',
				phoneNumerror: false,
				helperphoneNumber: ' ',
			});
		}
		// this.enablebutton();
	};

	pincodeHandler = (event) => {
		const pinCode = event.target.value;
		console.log('pinCode', pinCode);
		this.setState({
			pinCode: pinCode,
		});

		const regexp2 = /^[1-9]\d{5}$/;
		const char = event.target.value;
		if (!regexp2.test(char)) {
			this.setState({
				[event.target.name]: '',
				pinCodeerror: true,
				helperPincode: 'Please enter a valid pincode',
			});
		} else {
			this.setState({
				[event.target.name]: '',
				pinCodeerror: false,
				helperPincode: ' ',
			});
		}
		// this.enablebutton();
	};

	stateHandler = (event) => {
		const state = event.target.value;
		this.setState({
			state: state,
		});

		const regexp2 = /[A-Za-z]{3,20}/;
		const char = event.target.value;
		if (!regexp2.test(char)) {
			this.setState({
				[event.target.name]: '',
				stateerror: true,
				helperstate: 'Please enter a valid state name ',
			});
		} else {
			this.setState({
				[event.target.name]: '',
				stateerror: false,
				helperstate: ' ',
			});
		}
		// this.enablebutton();
	};

	cityHandler = (event) => {
		const city = event.target.value;
		console.log('city', city);
		this.setState({
			city: city,
		});

		const regexp2 = /[A-Za-z]{3,20}/;
		const char = event.target.value;
		if (!regexp2.test(char)) {
			this.setState({
				[event.target.name]: '',
				cityerror: true,
				helpercity: 'Please enter a valid city ',
			});
		} else {
			this.setState({
				[event.target.name]: '',
				cityerror: false,
				helpercity: ' ',
			});
		}
		// this.enablebutton();
	};

	landmarkHandler = (event) => {
		const landMark = event.target.value;
		console.log('landMark', landMark);
		this.setState({
			landMark: landMark,
		});

		const regexp2 = /^[a-zA-Z0-9\s,.'-]{3,}$/;
		const char = event.target.value;
		if (!regexp2.test(char)) {
			this.setState({
				[event.target.name]: '',
				landmarkerror: true,
				helperlandmark: 'Please enter a valid landmark ',
			});
		} else {
			this.setState({
				[event.target.name]: '',
				landmarkerror: false,
				helperlandmark: ' ',
			});
		}
		// this.enablebutton();
	};

	addressHandler = (event) => {
		const address = event.target.value;
		console.log('address', address);
		this.setState({
			address: address,
		});

		const regexp2 = /[A-Za-z0-9]{3,20}/;
		const char = event.target.value;
		if (!regexp2.test(char)) {
			this.setState({
				[event.target.name]: '',
				addresserror: true,
				helperaddress: 'Please enter a valid address ',
			});
		} else {
			this.setState({
				[event.target.name]: '',
				addresserror: false,
				helperaddress: ' ',
			});
		}
		// this.enablebutton();
	};

	typeHandler = (event) => {
		const type = event.target.value;
	
		this.setState({
			enable:true,
			
			type: type,
			
			
          
	
		});
	    // this.enablebutton();
		
	};

	// enablebutton=()=>{
	// 		console.log('enable');
	// 		console.log(this.state);
	// 		console.log(this.state.helperName.length)
	// 	if(this.enableextension){
	// 				console.log('inside if');
	// 				this.setState({
	// 					enabled :true,
						
	// 				});
	// 			}
	// }


	// enableextension (){
	// 	return this.state.helperName.length === 1 && this.state.helperphoneNumber.length === 1 && this.state.helperPincode.length === 1 && this.state.helperstate.length === 1  &&this.state.helpercity.length === 1 && this.state.helperlandmark.length === 1 &&this.state.helperaddress.length === 1;
			 
	// }

	addCustomerDetailsHandler = (event) => {
		let token = localStorage.getItem('Token');

		let userDetailsDto = {};
		userDetailsDto.state = this.state.state;
		userDetailsDto.fullName = this.state.fullName;
		userDetailsDto.phoneNumber = this.state.phoneNumber;
		userDetailsDto.address = this.state.address;
		userDetailsDto.pinCode = this.state.pinCode;
		userDetailsDto.city = this.state.city;
		userDetailsDto.landMark = this.state.landMark;
		userDetailsDto.type = this.state.type;
		userDetailsDto.locality = this.state.locality;

		addUserDetails(userDetailsDto, token)
			.then((Response) => {
				console.log('userDetails Updated SuccessFully ');
			})
			.catch((error) => {
				console.log('Error', error.response);
				console.log(error.response.data.message, 'Failed to update userDetails');
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

	addQuantity = (data,ele) => {
		console.log(ele)
		console.log('In addQuantityRequestMethod');
		let token = localStorage.getItem('Token');
	// 	let 
	//   count=ele.quantity;
	//   count=count-1;
	let count =ele.available;
	  let quantity = ele.quantity;  
	   
		if(count === quantity){
			alert(' available quantity is zero')
		}
		else{
			const res = addMoreItems(data, token);
			this.getAllItemsFromCart();
		}
			
		
	
		
		// this.setState({cart: (await res).data.data})
		
	};

	removeFromCart = (data) => {
		let token = localStorage.getItem('Token');
		const response = removeBookFromCart(data, token);
		// this.setState({ cart: (await response).data.data});
		this.getAllItemsFromCart();
	};

	substractQuantity = (data) => {
		let token = localStorage.getItem('Token');
		const res = removeFromCart(data, token);
		// this.setState({cart: (await res).data.data})
		this.getAllItemsFromCart();
	};

	removeAllFromcart = () => {
		let token = localStorage.getItem('Token');
		removeAll(token);
	};

	orderPlaced = () => {
		let token = localStorage.getItem('Token');
		orderPlaced(token);
	};

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
		this.getUserDetails();
		// let isloggedin = localStorage.getItem('Email') ? true : false;
		if (localStorage.getItem('RoleType') === 'user') {
			this.totalamount();
			this.setState({
				showCustomerDetails: true,
			});
		} else {
			this.props.history.push('/login');
		}
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

	orderPlacedPageHandler = (event) => {
		localStorage.removeItem('cartCount');
		this.orderPlaced();
		this.removeAllFromcart();

		window.location.assign('/ordersuccessfull');
	};

	checkoutClickHandler = () => {
		const doesShowOrderSuccessful = this.state.showOrderSuccessful;

		this.setState({
			showOrderSuccessful: !doesShowOrderSuccessful,
		});
	};

	totalamount = () => {
		let variable = 0;
		this.state.cart.map((ele) => (variable = variable + ele.totalPrice));
		this.state.OrderAmount = variable;
		if(variable<3000){
			this.state.shippingcharge=300;
			this.state.totalPayable=variable+this.state.shippingcharge;
		}
		else{
			this.state.shippingcharge=0;
			this.state.totalPayable=variable+this.state.shippingcharge;
		}
	};

	render() {

		// const { fullName,phoneNumber,pinCode,city,address,landMark,state} = this.state;
		// const enabled =fullName.length > 0 && phoneNumber.length > 0 && pinCode.length > 0 && city.length > 0 &&
		// address.length > 0 &&landMark.length > 0 && state.length >0;


		return (
			<Container maxWidth="lg">
				<div>
					<Dashboard1 cart={this.state.cart.length} wishlist={this.state.wishlist.length} />
					<Grid item xs={10}>
						<div className="Customer-address-div" style={{ marginTop: '78px' }}>
							<Typography id="mycart-title" variant="h5" style={{ marginTop: '2%', marginLeft: '3.9%' }}>
								My cart({this.state.cart.length})
							</Typography>



							{this.state.cart.map((ele, index) => {
								return (
									
									<div>
										<div>
											<div>
												<div>
													<div className="book-details-divcart">
														<div className="img-book">
															<img
																alt="name"
																id="img-book"
																src={ele.imgUrl}
																style={{
																	borderRadius: 0,
																	width: '130px',
																	justifyContent: 'center',
																}}
															/>
														</div>

														<div className="aligncontentbesidepic">
															<div className="bookname">
																<Typography variant="body2" component="h4">
																	<b>{ele.name}</b>
																</Typography>
																<Typography
																	id="note-content"
																	variant="body2"
																	color="textSecondary"
																	component="p">
																	by {ele.author}
																</Typography>
																{/* <Typography
																	id="note-content"
																	variant="body2"
																	color="textSecondary"
																	component="p">
																	Available:{ele.available}
																</Typography> */}
																<Typography
																	id="note-content"
																	variant="body2"
																	color="black"
																	component="h1">
																	<b> Rs.{ele.totalPrice}</b>
																</Typography>
															</div>

														
															<div className="quantity-div">
																<div>
																	<Button
																		key={ele.id}
																		onClick={() =>
																			this.substractQuantity(ele.bookId)
																		}>
																		<RemoveCircleOutlineIcon />
																	</Button>
																</div>

																<div className="input-type">
																	{/* {this.state.quantity} */}
																	{ele.quantity}

																</div>
																

																<div>
																	<Button
																		key={ele.id}
																		onClick={() => this.addQuantity(ele.bookId,ele)}>
																		<AddCircleOutlineIcon />
																	</Button>
																</div>
																<div>
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
										&nbsp;&nbsp;
										<TextField
											type="text"
											variant="outlined"
											value={this.state.fullName}
											required
											placeholder="Name"
											id="name"
											className="form-control "
											onChange={this.nameHandler}
											error={this.state.firstNameerror}
											helperText={this.state.helperName}
										/>
										&nbsp;&nbsp;
										<TextField
											type="text"
											variant="outlined"
											value={this.state.phoneNumber}
											required
											placeholder="Phone number"
											id="phoneNumber"
											inputProps={{maxLength :10}}
											className="form-control "
											onChange={this.phoneNumberHandler}
											error={this.state.phoneNumerror}
											helperText={this.state.helperphoneNumber}
										/>
									</div>
									<br />
									<div className="form-group">
										&nbsp;&nbsp;
										<TextField
											type="text"
											variant="outlined"
											required
											placeholder="pincode"
											value={this.state.pincode}
											id="pincode"
											inputProps={{maxLength :6}}
											className="form-control "
											onChange={this.pincodeHandler}
											error={this.state.pinCodeerror}
											helperText={this.state.helperPincode}
										/>
										&nbsp;&nbsp;
										<TextField
											type="text"
											variant="outlined"
											value={this.state.state}
											placeholder="State"
											id="locality"
											className="form-control "
											onChange={this.stateHandler}
											error={this.state.stateerror}
											helperText={this.state.helperstate}
										/>
									</div>
									<br />
									<div className="form-group">
										&nbsp;&nbsp;
										<TextField
											type="text"
											variant="outlined"
											required
											placeholder="city/town"
											value={this.state.city}
											id="city"
											className="form-control "
											onChange={this.cityHandler}
											error={this.state.cityerror}
											helperText={this.state.helpercity}
										/>
										&nbsp;&nbsp;
										<TextField
											type="text"
											variant="outlined"
											required
											placeholder="landmark"
											value={this.state.landMark}
											id="landmark"
											className="form-control "
											onChange={this.landmarkHandler}
											error={this.state.landmarkerror}
											helperText={this.state.helperlandmark}
										/>
									</div>
									<br />
									<div className="form-groupaddress">
										&nbsp;&nbsp;
										<TextField
											type="text"
											variant="outlined"
											required
											placeholder="address"
											value={this.state.address}
											id="address"
											className="address-group "
											onChange={this.addressHandler}
											error={this.state.addresserror}
											helperText={this.state.helperaddress}
										/>
									
									</div>
									<br />
									<div className="type-div">
										<label>Type</label>
										<div>
											<RadioGroup row aria-label="position" name="position" defaultValue="top">
												<FormControlLabel
													value="HOME"
													control={<Radio color="primary" />}
													label="Home"
													onChange={this.typeHandler}
													checked = {this.state.type === 'HOME'}
												/>
												<FormControlLabel
													value="WORK"
													control={<Radio color="primary" />}
													label="Work"
													onChange={this.typeHandler}
													checked = {this.state.type === 'WORK'}
												/>
												<FormControlLabel
													value="OTHER"
													control={<Radio color="primary" />}
													label="Other"
													onChange={this.typeHandler}
													checked = {this.state.type === 'OTHER'}
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
											// disabled={!this.state.enabled}
											// disabled={!enabled}
											>
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

							{this.state.showOrderSummery ? (
								<div>
									{this.state.cart.map((ele) => {
										return (
											<div>
												<div>
													<div>
														<div>
															<div className="book-details-divcart">
																<div className="img-book">
																	<img
																		alt="name"
																		id="img-book"
																		src={ele.imgUrl}
																		style={{
																			borderRadius: 0,
																			width: '130px',
																			justifyContent: 'center',
																		}}
																	/>
																</div>

																<div className="aligncontentbesidepic">
																	<div className="booknameorder">
																		<Typography
																			
																			variant="body2"
																			component="h4">
																		<b>{ele.name} </b>	
																		</Typography>
																		<Typography
																			id="note-content"
																			variant="body2"
																			color="textSecondary"
																			component="p">
																			by {ele.author}
																		</Typography>
																		<Typography
																			id="note-content"
																			variant="body2"
																			color="black"
																			component="h1">
																			<b> Rs.{ele.totalPrice}</b>
																		</Typography>
																	</div>		
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
                                     	
									<div className="cart-title-div">
										<p
											className="my-cart-h4 "
											style={{ marginLeft: '30.5%', margintop: '400px', marginBottom: '8%' }}>
											<b>Total Amount: &nbsp;&nbsp; Rs.{this.state.OrderAmount}</b>
											<br/>
											<b>Shipping Cost: &nbsp;&nbsp; Rs.{this.state.shippingcharge}</b>
											<br/><b>----------------------------</b><br/>
											<b>Total Payable:&nbsp;&nbsp; Rs.{this.state.totalPayable}</b>
										</p>
									
										<div className="checkout-div">
										<Button
											className="checkout-button"
											onClick={this.orderPlacedPageHandler}
											style={{ backgroundColor: '#3371B5', color: 'white' }}>
											CHECKOUT
										</Button>
									  </div>
									  
									 
									</div>
										
								</div>
							) : null}
						</div>
					</Grid>
				
				     &nbsp;&nbsp;&nbsp;
					<div className={this.state.isActive ? [Styles.snackbar, Styles.show].join(' ') : Styles.snackbar}>
						{this.state.status}
					</div>
				</div>
			</Container>
		);
	}
}

export default Cart;
