import React from 'react'
import '../css/BookDetails.css'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const StyledButton = withStyles({
  root: {
    borderRadius: 2,
    fontSize: "11px",
    // fontFamily: "roboto",
    marginTop: "5px",
    marginBottom: "20px",
    border: 0,
    color: 'white',
    height: 29,
    padding:"1px",
    width: "92px",
  },
})(Button);
function InStock(props) {
  return (
    <React.Fragment>
      <div className="bookDivButton">
        <StyledButton style={{ background: "#990033" }} onClick={props.addToCart}>ADD TO CART</StyledButton>
        <StyledButton style={{ background: "white", color: "black", border: "1px solid black" }}>WISH LIST</StyledButton>
      </div>
    </React.Fragment>
  )
}

export default InStock
