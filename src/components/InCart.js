import React from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const StyledButton = withStyles({
    root: {
      borderRadius: 2,
      fontSize:"11px",
      // fontFamily:"roboto",
      marginTop:"5px",
      marginBottom: "20px",
      border: 0,
      color: 'white',
      height: 29,
      paddingTop:"5px",
      width:"195px"
    },
  })(Button);
function InCart() {
    return (
        <React.Fragment>
            <div className="bookDivButton">
            <StyledButton style={{background:"rgb(47,115,183)",border:"1px solid black"}}>ADDED TO CART</StyledButton>
            </div>
        </React.Fragment>
    )
}

export default InCart
