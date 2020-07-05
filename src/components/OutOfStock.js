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
function OutOfStock() {
    return (
        <React.Fragment>
            <div className="bookDivButton">
            <StyledButton style={{background:"white",color:"black",border:"1px solid black"}}>notify me</StyledButton>
            </div>
        </React.Fragment>
    )
}

export default OutOfStock
