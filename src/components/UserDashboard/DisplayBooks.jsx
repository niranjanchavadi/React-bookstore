
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
import { IconButton } from '@material-ui/core';
// import bookImage from '../../assets/book.jpg';



class DisplayBooks extends Component {


	constructor(props) {
		super(props);

	}

	handlewishlistlogin =()=>{
		this.props.history.push("/admin");
		
	}






	render() {

		let isloggedin = localStorage.getItem('RoleType') === 'user' ? true : false;
		return (
			<>
				<div className="bookcount-sortby-div">
					<Typography id="display-book-title" variant="h5" style={{ marginLeft: '-20%' }}>
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
							continue-shopping-cart-button
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
												style={{ borderRadius: 0, width: '130px', marginLeft: '25%' }}
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
													by {ele.authorName}
												</Typography>
												<Typography
													id="note-content"
													variant="body2"
													color="black"
													component="h1">
													<b> Rs.{ele.price}</b>
												</Typography>
											</CardContent>
										</CardActionArea>
									</Tooltip>
									<CardActions>
										<div className="Addtocartbutton" key={ele.bookId}>
											{this.props.clickedId.includes(ele.bookId) ? (
												<div className="Addtocartbutton2" key={ele.bookId}>
												<IconButton
													variant="outlined"
													size="small"
													type="submit"
													style={{
														background: '#3371B5',
													    borderRadius:'3px',
														color: 'white',
														// justifyContent: 'center',
														padding: '6px 32px',
														paddingUp:'50px',
													    marginLeft:'-15%',
														fontSize:'0.9rem'
														
													}}>
													ADDED TO BAG
												</IconButton>
												</div>
											) : (
												<>
													{!this.props.clickedIdwishlist.includes(ele.bookId) && (
														<IconButton
															variant="outlined"
															size="small"
															style={{
																backgroundColor: '#A03037',
																borderRadius:'3px',
																color: 'white',
																width: '60%',
																fontSize:'0.85rem',
																marginLeft: '-5%',
															}}
															// disabled={!this.props.enabled}
															onClick={() => {
																this.props.addToBagClickHandler(ele.bookId,ele);
															}}>
															ADD TO BAG
														</IconButton>
													)}
													&nbsp;&nbsp;&nbsp;&nbsp;
													{this.props.clickedIdwishlist.includes(ele.bookId) && (
														<Button
															variant="outlined"
															style={{
																background: '#3371B5',
																// border: '1px solid black',
																color: 'white',
																justifyContent: 'center',
																padding: '3px 36px',
																marginRight: '-5%',

																// marginLeft:'50%'
															}}>
															Wishlisted
														</Button>
													)}
													{!this.props.clickedIdwishlist.includes(ele.bookId) && (
											          <span>
                                                             {isloggedin && (
														<Button
															variant="outlined"
															color="black"
															size="small"
															type="submit"
															style={{
																width: '47.2%',
																marginRight: '10%',
																borderRadius: '2px',
																fontSize:'0.75rem',
															}}
															onClick={() =>
																this.props.addToWishlistClickHandler(ele.bookId)
															}>
															WishList
														</Button>)}

													{!isloggedin && (	
														<Button
														variant="outlined"
														color="black"
														size="small"
														type="submit"
														style={{
															width: '46.2%',
															marginRight: '10%',
															fontSize:'0.75rem',
															borderRadius: '2px',
														}}
														onClick={this.handlewishlistlogin}
														>
														WishList
													  </Button>)}
													  </span>
													
                                                    )}
												</>
											)}
											&nbsp;&nbsp;&nbsp;
										</div>
									</CardActions>
								</Card>
							</>
						);
					})}
				</div>
				{/* <div className="pagination-div">
<Pagination
count={Math.floor(this.props.bookCount / 12)}
color="primary"
onClick={this.props.onChangePaginationHandler}
/>
</div> */}
			</>
		);
	}
}
export default DisplayBooks;
