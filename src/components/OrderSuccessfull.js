import React, { Component, Fragment } from "react";
import success from "../asserts/Order-placed-successfully.png";
import "../css/orderSuccessfull.css";
import AppBar from "./AppBar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  button: {
    backgroundColor: "rgb(47,115,183)",
    "&:hover": {
      backgroundColor: "rgb(30,80,183)",
      color: "White"
    }
  }
});

export class OrderSuccessfull extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: JSON.parse(localStorage.getItem("orderId"))
    };
  }

  homePage = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar homePage={this.homePage} />
        <div className="successDiv">
          <img className="successImg" src={success} alt="SuccessfullImage" />
          <p className="paragraph">
            hurray!!! your order is confirmed </p>
          <p id="secondLine">the order Id is<b> #{this.props.match.params.random}</b> 
          save the order id for <br/>further communication..</p>

          <table>
            <tr>
              <th>Email Us</th>
              <th>Contact Us</th>
              <th>Address</th>
            </tr>
            <tr>
              <td>admin @ bookstore.com</td>
              <td>+91 9777037773 </td>
              <td>
                Mohan's Enclave, Ground Floor, BTM Stage 2, Bangalore,
                Karnataka 560068
              </td>
            </tr>
          </table>
          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              onClick={this.homePage}
              id="placeOrderButton"
              variant="contained"
              className={classes.button}
              style={{width: '22%',backgroundColor:'#A03037'}}
            >
              Continue Shopping
            </Button>
          </Grid>
        </div>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

export default withStyles(styles)(OrderSuccessfull);
