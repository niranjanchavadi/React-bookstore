// import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
// // import Pagination from '@material-ui/lab/Pagination';
// // import { Pagination } from '@material-ui/lab';
// // import Pagination from '../pagination/Pagination';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';
// // import bookImage from '../../assets/book.jpg';

// import { withStyles } from '@material-ui/core/styles';
// import Pagination from '../pagination/Pagination';

// class Sellerbooks extends Component {
// 	render() {
        
//             this.props.bookList.map((value, index) => {
//                 return (
//                     <div className="bookCarddivSeller" key={value.bookId}>
//                         <div className="imageDiv">
//                             <img
//                                 className="bookImage"
//                                 src={value.bookImgUrl}
//                                 alt="no Cover"
//                                 style={{ borderRadius: 0, width: '150px' }}
//                             />
//                         </div>
//                         <div className="propertyHolderDiv">
//                             <div className="bookProperty">
//                                 <p className="titleFont"> {value.bookName} </p> <br />
//                                 <p className="authorFont"> {value.authorName} </p> <br />
//                                 <p className="priceFont"> ₹. {value.price} </p>
//                             </div>
//                             <div className="buttonContent">
//                                 <Button
//                                     variant="contained"
//                                     style={{ backgroundColor: '#A03037', color: 'white' }}
//                                     size="small"
//                                     onClick={() => this.props.handleUpdate(value.bookId)}
//                                     >
//                                     Update
//                                 </Button>
//                                 {this.state.clickedId.includes(value.bookId) ? null : (
//                                     <Button
//                                         variant="contained"
//                                         style={{ backgroundColor: '#A03037', color: 'white' }}
//                                         onClick={() => {
//                                             this.props.handleDelete(value.bookId);
//                                         }}
//                                         size="small">
//                                         Delete
//                                     </Button>
//                                 )}
//                             </div>
//                             <div className="bookDivButton"> </div>
//                         </div>
//                     </div>
                    
//                 );
//             });
//     }
// }
// export default Sellerbooks;
