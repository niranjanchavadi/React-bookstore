import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '../pagination/Pagination';
import '../../css/Admin.css';
import DisapproveDialog from './DisapproveDialog';

class Adminbooks extends Component {	
	render() {
		let isloggedin = localStorage.getItem('RoleType') === 'ADMIN' ? true : false;

		return (
			<>
				<div className="bookcount-sortby-div">
					<Typography id="display-book-title" variant="h4" style={{ marginLeft: '25%', color: '#A03037' }}>
						<b>Manage Your Books Here</b>{' '}
					</Typography>
				</div>
				{isloggedin && (
					<div className="bookcount-sortby-div">
						<Typography
							id="display-book-title"
							variant="h5"
							style={{ marginLeft: '-17%', color: '#A03037' }}>
							<b>SellerList</b> <span id="sellercountfont">({this.props.sellerCount})</span>
						</Typography>
					</div>
				)}

				{isloggedin && (
					<div className="display-sellers-div">
						{this.props.sellers.map((ele) => {
							return (
								<>
									<Card className="sellernote-card" key={ele.sellerId}>
										<CardActionArea>
											<CardContent id="card-content">
												<Typography gutterBottom variant="h11" component="h3">
													Name:{ele.sellerName}
												</Typography>
												<Typography
													id="note-content"
													variant="body2"
													color="textSecondary"
													component="p">
													sellerId:{ele.sellerId}
												</Typography>
												<Typography
													id="note-content"
													variant="body2"
													color="textSecondary"
													component="p">
													Requests:{ele.quantity}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<div className="buttonContent">
												<Button
													variant="contained"
													style={{
														backgroundColor: '#A03037',
														color: 'white',
														padding: '3px 55px',
													}}
													disabled={!isloggedin}
													size="small"
													onClick={() => this.props.handleSellerbooks(ele.sellerId)}>
													BookList
												</Button>
											</div>
										</CardActions>
									</Card>
								</>
							);
						})}
					</div>
				)}




{/* {isloggedin && (
					<div className="bookcount-sortby-div">
						<Typography
							id="display-book-title"
							variant="h5"
							style={{ marginLeft: '-17%', color: 'black' }}>
							<b>Books</b> <span id="sellercountfont">({this.props.bookCount})</span>
						</Typography>
			     	</div>
				  )} */}
				<div className="display-sellerbooks-div">
			    	
					{this.props.books.map((ele) => {
						return (
							<>
								<Card className="verificationnote-card" key={ele.id}>
									<Tooltip title={ele.bookDetails}>
										<CardActionArea>
											<img
												id="img-book"
												src={ele.bookImgUrl}
												style={{ borderRadius: 0, width: '130px', marginLeft: '25%' }}
											/>

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
													color="black"
													component="h1">
													<b> Rs.{ele.price}</b>
												</Typography>
											</CardContent>
										</CardActionArea>
									</Tooltip>
									<CardActions>
										<div className="Addtocartbuttonapprove">
											{this.props.clickedId.includes(ele.bookId) ? (
												<Button
													variant="outlined"
													style={{
														background: '#3371B5',
														color: 'white',
														justifyContent: 'center',
														padding: '3px 44px',
														marginLeft:'30%'
													
													}}>
													Approved
												</Button>
											) : (
												<>
													{!this.props.clickedIddisapprove.includes(ele.bookId) && (
														<Button
															variant="outlined"
															color="white"
															size="small"
															style={{ backgroundColor: '#A03037', color: 'white',marginLeft:'7%'}}
															onClick={() => {
																this.props.handleApproved(ele.bookId);
															}}>
															Approve
														</Button>
													)}
													&nbsp;&nbsp;
													{this.props.clickedIddisapprove.includes(ele.bookId) && (
														<Button
															variant="outlined"
															style={{
																background: '#3371B5',
																padding: '3px 40px',
																color: 'white',
																justifyContent: 'center',
																marginLeft:'8%'
																// marginLeft:'50%'
															}}>
															DisApproved
														</Button>
													)}
													{!this.props.clickedIddisapprove.includes(ele.bookId) && (
														<Button
															variant="outlined"
															color="white"
															size="small"
															style={{ backgroundColor: '#A03037', color: 'white' }}
															onClick={() => this.props.handledisApprove(ele.bookId)}>
															DisApprove
														</Button>)}
	
												</>
											)}
										</div>
									</CardActions>
								</Card>
							</>
						);
					})}
				</div>
			</>
		);
	}
}
export default Adminbooks;
