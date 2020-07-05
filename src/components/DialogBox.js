import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledButton = withStyles({
    root: {
      borderRadius: 2,
      fontSize:"11px",
      marginTop:"5px",
      marginBottom: "20px",
      border: 0,
      color: 'white',
      height: 29,
      paddingTop:"5px",
      width:"195px",
      marginRight:"35px"
    },
  })(Button);


export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false);
  };

  const homePage = () => {
    props.homePage()
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"You would like to shop"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            There is nothing to buy in your cart for redirect the home page click below button
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <StyledButton style={{background:"#990033",border:"1px solid black"}} onClick={homePage}>GoTO Home</StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}