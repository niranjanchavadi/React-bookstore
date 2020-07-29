// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// // export default function AlertDialog() {
// //   const [open, setOpen] = React.useState(false);

// //   



// export default class DisapproveDialog extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			open: false,
// 			setOpen: false,
			
// 		};
// 	}


//      handleClickOpen = () => {
//             // setOpen(true);

//             this.setState({
//                open:true,
//             });
//           };

//      handleClose = () => {
//     // setOpen(false);

//     this.setState({
//         setOpen:true,
//      });
//     };

// render() {
//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//        Disapprove
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Do You Want to disapprove this book?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={this.props.getBookLists}  color="primary">
//             No
//           </Button>
//           <Button onClick={this.props.getBookLists} color="primary" autoFocus>
//            Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
// }