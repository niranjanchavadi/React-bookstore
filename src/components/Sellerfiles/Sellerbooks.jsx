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
import '../../css/SellerPage.css';


class Sellerbooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
		    
		};
	}
	render() {


		return (
			<>
                  {/* <div className="bookcountseller">
	               	<Typography id="display-book-title" variant="h5" style={{ marginLeft: '-17%' ,marginTop:'-100%'}}>
		         	<b>Books</b>{' '}
		 	      <span id="bookcountfont">
			            	(Found {this.props.bookCount} items,of {this.props.TotalCount})
			     </span>
		           </Typography>
				   </div> */}
         {this.props.updatenewbooksstate &&(
				   
				
					<div className="approvedbookcount-sortby-divnew">
						<Typography
							// id="display-book-titlenew"
							variant="h5"
							style={{ marginLeft: '-4%', color: '#A03037' ,fontSize:'25px'}}>
							<b>NewlyAddedBooks</b> <span id="sellercountfont">({this.props.newbookCount})</span>
						</Typography>
				
					<div className="display-newbooks-div">
					{this.props.books.map((ele) => {
						return (
							<>
								<Card className="note-cardsellerapproval" key={ele.id}>
									<Tooltip title={ele.bookDetails}>
										<CardActionArea>
											<img
												id="img-book"
												src={ele.bookImgUrl}
                                                style={{ borderRadius: 0, width: '130px',marginLeft:'25%' }}
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
													by {ele.authorName}
												</Typography>
												<Typography
													id="note-content"
													variant="body2"
													color="black"
													component="h1">
												<b> Rs.{ele.price}</b>
												</Typography>

											<div className ="approvalbuttonContent">
											{this.props.approvalclickedId.includes(ele.bookId) ?  (
											 <Button
												variant="contained"
												style={{ backgroundColor: '#3371B5', color: 'white' }}
												size="small"
												>
												Sent for Approval
										    	</Button>
										 
											):(
                                                <Button
												variant="contained"
												style={{ backgroundColor: '#A03037', color: 'white' }}
												size="small"
												onClick={() => this.props.handleApprovalRequest(ele.bookId)}>
												Approval  Request
										    	</Button>)}
											</div>
											</CardContent>
										</CardActionArea>
									</Tooltip>     	
									<CardActions>	
										<div className="buttonContent">
									        &nbsp;&nbsp;
											<Button
												variant="contained"
												style={{ backgroundColor: '#A03037', color: 'white' }}
												size="small"
												onClick={() => this.props.handleUpdate(ele)}>
												Update
											</Button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
											{this.props.clickedId.includes(ele.bookId) ? null : (
												<Button
													variant="contained"
													style={{ backgroundColor: '#A03037', color: 'white' }}
													onClick={() => {
														this.props.handleDelete(ele.bookId);
													}}
													size="small">
													Delete
												</Button>
											)}
                                           
										</div>
										&nbsp;
										{/* <div  className="approvalbuttonContent">
										 
										</div> */}
									</CardActions>
								</Card>
							</>
						);
					})}
						</div>
				</div>)}
			



				{!this.props.updatenewbooksstate &&(
                  <div>
					{this.props.heading  ? 
					(<div className="approvedbookcount-sortby-divnew">
						<Typography
							id="display-book-titlenew"
							variant="h5"
							style={{ marginLeft: '-14%', color: '#A03037' ,fontSize:'25px'}}>
							<b>ApprovedBooks</b> <span id="sellercountfont">({this.props.approvedbookcount})</span>
						</Typography>
					</div>)
					:
					(<div className="approvedbookcount-sortby-divnew">
						<Typography
							id="display-book-titlenew"
							variant="h5"
							style={{ marginLeft: '-14%', color: '#A03037',fontSize:'25px' }}>
							<b>DisapprovedBooks</b> <span id="sellercountfont">({this.props.approvedbookcount})</span>
						</Typography>
					</div>)}
					<div className="display-approvedbooks-div">
					{this.props.approvedBooks.map((ele) => {
						return (
							<>
								<Card className="note-cardseller" key={ele.id}>
									<Tooltip title={ele.bookDetails}>
										<CardActionArea>
											<img
												id="img-book"
												src={ele.bookImgUrl}
                                                style={{ borderRadius: 0, width: '130px',marginLeft:'25%' }}
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
										<div className="buttonContent">
									
											<Button
												variant="contained"
												style={{ backgroundColor: '#A03037', color: 'white' }}
												size="small"
												onClick={() => this.props.handleUpdate(ele)}>
												Update
											</Button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											{this.props.clickedId.includes(ele.bookId) ? null : (
												<Button
													variant="contained"
													style={{ backgroundColor: '#A03037', color: 'white' }}
													onClick={() => {
														this.props.handleDelete(ele.bookId);
													}}
													size="small">
													Delete
												</Button>
											)}
                                           
										</div>
									</CardActions>
								</Card>
							</>
						);
					})}
				</div>
				</div>)}
			</>
		);
	}
}
export default Sellerbooks;
