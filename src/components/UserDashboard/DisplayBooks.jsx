import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
// import Pagination from '@material-ui/lab/Pagination';
// import { Pagination } from '@material-ui/lab';
// import Pagination from '../pagination/Pagination';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// import bookImage from '../../assets/book.jpg';

import { withStyles } from '@material-ui/core/styles';
import Pagination from '../pagination/Pagination';



class DisplayBooks extends Component {
	render() {
		return (
			<>
				<div className="bookcount-sortby-div">
					<Typography id="display-book-title" variant="h5" style={{ marginLeft: '-15%' }}>
						<b>Books</b>{' '}
						<span id="bookcountfont">
							(Found {this.props.bookCount} items,of {this.props.TotalCount})
						</span>
						{/* Books<span id='bookcountfont'>({this.books.index} items)</span> */}
					</Typography>
					<div className="sortby-div">
						<select
							name="Sort By Relevance"
							id="Sort_By_Relevance"
							onChange={this.props.sortByRelevanceHandler}>
							<option value="-1" selected>
								Sort By Relevance
							</option>
							<option name="price:low to high">price: low to high</option>
							<option name="price:high to low">price: high to low</option>
						</select>
					</div>
				</div>
				<div className="display-books-div">
					{this.props.books.map((ele) => {
						return (
							<>
								<Card className="note-card" key={ele.id}>
									<Tooltip title={ele.bookDetails}>
										<CardActionArea>
											<img
												id="img-book"
												src={ele.bookImgUrl}
												style={{ borderRadius: 0, width: '150px', justifyContent: 'center' }}
											/>

											{/* <img className='img' id='img-book' src={bookImage}/> */}

											<CardContent id="card-content">
												<Typography gutterBottom variant="h11" component="h3">
													{ele.bookName}
												</Typography>
												<Typography
													id="note-content"
													variant="body2"
													color="textSecondary"
													component="p">
													{ele.authorName}
												</Typography>
												<Typography
													id="note-content"
													variant="body2"
													color="textSecondary"
													component="h1">
													<b> ₹ {ele.price}</b>
												</Typography>

												{/* <Typography id='note-content' variant="body2" color="textSecondary" component="p">
                                                     {ele.description}
                                                </Typography> */}
											</CardContent>
										</CardActionArea>
									</Tooltip>
									<CardActions>
                                        <div className="Addtocartbutton">
                                        {this.props.clickedId.includes(ele.bookId) ? (
											<Button
												variant="outlined"
												
												style={{
													background:  '#3371B5',
													border: '1px solid black',
                                                    color: 'white',
													justifyContent:'center',
													
													// marginLeft:'50%'
												}}
												>
												Addedtocart
											</Button>
										) : (
											<>
												<Button
													variant="outlined"
                                                    color="white"
                                                    size="small"
													style={{ backgroundColor: '#A03037', color: 'white' }}
													onClick={() => {
														this.props.addToBagClickHandler(ele.bookId);
													}}>
													ADD TO CART{' '}
												</Button>
                                                       
											
											</>
										)}

                                       </div>
 										
                                        {this.props.clickedIdwishlist.includes(ele.bookId) ? (
											<Button
												variant="outlined"
												
												style={{
													background:  '#3371B5',
													border: '1px solid black',
                                                    color: 'white',
													justifyContent:'center',
													
													// marginLeft:'50%'
												}}
												>
												Wishlisted
											</Button>
										) : (
											<>
												
												<Button
													variant="outlined"
													color="black"

													onClick = {()=>this.props.addToWishlistClickHandler(ele.bookId)}
												>
													{' '}
													WishList
												</Button>
											</>
										)}
										 
                                         
										
									</CardActions>
								</Card>
							</>
						);
					})}
				</div>
                <div className='pagination-div'>
            <Pagination 
            count={Math.floor(this.props.bookCount/12)} 
            color="primary" 
            onClick={this.props.onChangePaginationHandler} />
        </div>
			</>
            
		);
	}
}
export default DisplayBooks;
