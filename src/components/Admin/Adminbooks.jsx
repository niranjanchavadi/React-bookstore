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

class Adminbooks extends Component {
	render() {
		return (
			<>
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
													₹. {ele.price}
												</Typography>
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
														justifyContent: 'center',
														// marginLeft:'50%'
													}}
										                             >
													Approved
												</Button>
								
											) : (
												<>
													<Button
														variant="outlined"
														color="white"
														size="small"
														style={{ backgroundColor: '#A03037', color: 'white' }}
														onClick={() => {
															this.props.handleApproved(ele.bookId);
														}}>
														Approve{' '}
													</Button>
													&nbsp;&nbsp;
													
												</>
											)}

                                            {this.props.clickedIddisapprove.includes(ele.bookId) ? (
												<Button
													variant="outlined"
													style={{
														background: '#3371B5',
														border: '1px solid black',
														color: 'white',
														justifyContent: 'center',
														// marginLeft:'50%'
													}}
												                     >
													DisApproved
												</Button>
											) : (
											
													<Button
														variant="outlined"
														color="white"
														size="small"
														style={{ backgroundColor: '#A03037', color: 'white' }}
														
														onClick={() => this.props.handledisApprove(ele.bookId)}>
														DisApprove{' '}
													</Button>
												
												
											)}
										</div>
									</CardActions>
								</Card>
							</>
						);
					})}
				</div>
				<div className="pagination-div">
					<Pagination
						count={Math.floor(this.props.bookCount / 12)}
						color="primary"
						onClick={this.props.onChangePaginationHandler}
					/>
				</div>
			</>
		);
	}
}
export default Adminbooks;
