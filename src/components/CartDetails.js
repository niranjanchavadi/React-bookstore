import React, { Component } from "react";
import CartBook from "./CartBook";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DialogBox from "./DialogBox"

const style = theme => ({
  button: {
    margin: "0 1% 0 0",
    width: "200px",
    backgroundColor: "rgb(47,115,183)",
    "&:hover": {
      backgroundColor: "rgb(30,80,183)",
      color: "#FFF"
    }
  }
});

export class CartDetails extends Component {
  constructor(props) {
    super(props);
    this.parentComponent = React.createRef();
  }

  componentDidMount(){
    if(localStorage.getItem('customerDetailsExpand')){
      this.props.handleExpantion("expanded");
      document.getElementById("placeOrderButton").style.display = "none";
    }
  }

  handleExpantion = () => {
    document.getElementById("placeOrderButton").style.display = "none";
    this.props.handleExpantion("expanded");
    localStorage.setItem('customerDetailsExpand',"flag")
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="cartDetailsDiv">
        <h4 className="MyCartH">
          My Cart ({this.props.books.bookBunch.length})
        </h4>
        {this.props.books.bookBunch.length > 0 ? (
          this.props.books.bookBunch.map(value => {
            return (
              <CartBook
                key={value.id}
                param={value}
                removeBook={this.props.removeBook}
                updateCartSubtotal={this.props.updateCartSubtotal}
                updateBookQuantity={this.props.updateBookQuantity}
              />
            );
          })
        ) : (
          <DialogBox homePage={this.props.homePage}/>
        )}
        <h4 className="subTotal">SubTotal : Rs.{this.props.books.cartSubTotal}</h4>
        {this.props.books.bookBunch.length > 0 ? (
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button
              onClick={this.handleExpantion}
              id="placeOrderButton"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              PLACE ORDER
            </Button>
          </Grid>
        ) : (
          <h6> </h6>
        )}
      </div>
    );
  }
}

export default withStyles(style)(CartDetails);
