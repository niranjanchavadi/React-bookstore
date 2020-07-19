import React, { Component } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dashboard1 from '../UserDashboard/Dashboard1';
import { getWishListBooks ,deleteFromWishlist,addFromWishlistToCart} from '../../Configuration/BookConfig';
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
            clickId:[],
            total:"",
            incrementDecrementCount: 1
        }
    } 

    componentDidMount() {
        this.getAllItemFromWishList();
        }



    getAllItemFromWishList = () => {
            let token = localStorage.getItem('Token');


            getWishListBooks(token).then((res) => {
               this.setState({ wishlist: res.data});
           }).catch((err) => {
               console.log(err);
           });
     }


  

    addFromWishlistToCart = async(data) => {
        let token = localStorage.getItem('Token');
        const res= addFromWishlistToCart(data,token);
        this.getAllItemFromWishList();
    }

    deleteFromWishlist = async(data) => {
        let token = localStorage.getItem('Token');
        const res= deleteFromWishlist(data,token);
        this.getAllItemFromWishList();
    }




      render() {
            
            return (
                <Container maxWidth="lg">
                    <div>
                        <Wishlistboard wishlist = {this.state.wishlist.length}/>
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
                                                                    <p> ₹ {ele.totalPrice}</p>
                                                                </div>
                                                              <div>
                                                                    <Button
                                                                    key={ele.id}
                                                                    style={{
                                                                        background: '#A03037',
                                                                        border: '1px solid black',
                                                                        color: 'white',
                                                                        justifyContent: 'center',
                                                                       
                                                                    }}
																	onClick={() => this.addFromWishlistToCart(ele.bookId)}>
																	MoveToCart
																</Button>
                                                                 &nbsp;&nbsp;
																	<Button
                                                                        key={ele.id}
                                                                        style={{
                                                                            background: '#A03037',
                                                                            border: '1px solid black',
                                                                            color: 'white',
                                                                            justifyContent: 'center',
                                                                           
                                                                        }}
																		onClick={() => this. deleteFromWishlist(ele.bookId)}>
																		Remove
																	</Button>
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
           
      


