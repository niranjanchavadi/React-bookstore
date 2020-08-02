import React, { Component } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dashboard1 from '../UserDashboard/Dashboard1';
import { getWishListBooks ,deleteFromWishlist,addFromWishlistToCart, getAllItemsFromCart} from '../../Configuration/BookConfig';
import Wishlistboard from './Wishlistboard';



class Wishlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderId: 0,
            wishlistItem: 1,
            quantity: "",
            descrption:'abc',
            wishlist:[],
            cart:[],
            clickId:[],
            total:"",
            incrementDecrementCount: 1
        }
    } 

    componentDidMount() {
        this.getAllItemFromWishList();
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


    getAllItemFromWishList = () => {
            let token = localStorage.getItem('Token');


            getWishListBooks(token).then((res) => {
               this.setState({ wishlist: res.data});
           }).catch((err) => {
               console.log(err);
           });
     }


  

    addFromWishlistToCart = (data) => {
        let token = localStorage.getItem('Token');
        const res= addFromWishlistToCart(data,token);
        this.getAllItemFromWishList();
        this.getAllItemsFromCart();
    }

    deleteFromWishlist = (data) => {
        let token = localStorage.getItem('Token');
        const res= deleteFromWishlist(data,token);
        this.getAllItemFromWishList();
    }




      render() {
            
            return (
                <Container maxWidth="lg">
                    <div>
                        <Wishlistboard
                         wishlist = {this.state.wishlist.length}
                         cart = {this.state.cart.length}
                        />
                        {/* <Dashboard1 wishlist={this.state.wishlist.length}/> */}
                        <Grid item xs={10}>
                            <div className="Customer-address-div" style={{ marginTop: '78px' }}>
                                <Typography id="mycart-title" variant="h5">
                                    My wishlist({this.state.wishlist.length})  
                                </Typography>
    
                                {this.state.wishlist.map((ele,index) => {
                                    return (
                                        <div>
                                            <div>
                                                <div>
                                                    <div>
                                                        <div className="book-details-divcart">
                                                            <div className="img-book">
                                                                <img
                                                                    id="img-book"
                                                                    src={ele.bookImgUrl}
                                                                    style={{ borderRadius: 0, justifyContent: 'center' }}
                                                                />
                                                            </div>
    
                                                            <div className="aligncontentbesidepic">
                                                            <div className="bookname">
																{/* <Typography id="summary-bookname" component="h2">
																	{ele.name}
																</Typography>
																<p style={{ color: '#9D9D9D' }}> by {ele.author}</p>
																<Typography id="summary-bookname" component="h3">
																	Rs.{ ele.totalPrice}
																</Typography> */}
                                                                	<Typography
																			
																			variant="body2"
																			component="h4">
																		<b>{ele.bookName} </b>	
																		</Typography>
																		<Typography
																			id="note-content"
																			variant="body2"
																			color="textSecondary"
																			component="p">
																			by {ele.authorName}
																		</Typography>
																		<Typography
																			id="note-content"
																			variant="body2"
																			color="black"
																			component="h1">
																			<b> Rs.{ele.price}</b>
																		</Typography>
															</div>
                                                            &nbsp;&nbsp;
                                                              <div  className="buttonsinwishlist" >
                                                                  
                                                                  <span>
                                                                    <Button
                                                                    key={ele.id}
                                                                    style={{
                                                                        background: '#A03037',
                                                                        border: '1px solid black',
                                                                        color: 'white',
                                                                        justifyContent: 'center',
                                                                       
                                                                    }}
                                                                    size="small"
																	onClick={() => this.addFromWishlistToCart(ele.bookId)}>
																	Move To Cart
																  </Button>
                                                                  </span>
                                                                  &nbsp;&nbsp;
                                                                   <span>
																	<Button
                                                                        key={ele.id}
                                                                        style={{
                                                                            background: '#A03037',
                                                                            border: '1px solid black',
                                                                            color: 'white',
                                                                            justifyContent: 'center',
                                                                           
                                                                        }}
                                                                        size="small"
																		onClick={() => this. deleteFromWishlist(ele.bookId)}>
																		Remove
																	</Button>
                                                                    </span>
                                                                 </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                           </div>
                      </Grid> 
                      </div>            
        	</Container>
             );
                      
                    
        }


}

export default Wishlist;
           
      


