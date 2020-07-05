import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Styles from "../css/snackbar.module.css";
import Grid from "@material-ui/core/Grid";

const ids = [
  "customerDetails",
  "customerDetails1",
  "customerDetails2",
  "customerDetails3",
  "customerDetails4",
  "customerDetails5",
  "customerDetails6",
  "customerDetails7",
  "customerDetails8",
  "customerDetails9",
  "customerDetails10"
];

const styles = theme => ({
  root: {
    border: "solid lightgray 2px",
    width: "99.6%",
    marginTop: "2%",
    boxShadow: "1px 1px 1px 1px lightgray"
  },
  heading: {
    fontSize: theme.typography.pxToRem(17.5),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontFamily:"Roboto"
  },
  textarea: {
    width: "99.3%",
    marginTop: "2%",
    borderRadius: "3px",
    resize: "none",
  },
  textField: {
    width: "100%"
  },
  radioButton: {
    margin: "0 15% 0 1%"
  },
  addressType: {
    margin: "0 0 0 2%",
    paddingBottom: 0
  },
  button: {
    margin: "0 1% 0 0",
    width: "200px",
    backgroundColor: "rgb(47,115,183)",
    "&:hover": {
      backgroundColor: "rgb(30,80,183)",
      color: "#FFF"
    }
  },
  edit: {
    paddingTop: "0.5%",
    marginLeft: "60%",
    fontSize: "80%",
    display: "none ",
    cursor: "pointer"
  }
});

class ControlledExpansionPanels extends React.Component {
  state = {
    Name: "",
    PhoneNumber: "",
    Pincode: "",
    Locality: "",
    EmailAddress: "",
    Address: "",
    City: "",
    Town: "",
    Type: "",
    expanded: false,
    formValid: true,
    status: "",
    isActive: false
  };
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("customerDetails")) {
      this.customerData = JSON.parse(localStorage.getItem("customerDetails"));
      this.setState({
        Name: this.customerData.Name,
        PhoneNumber: this.customerData.PhoneNumber,
        Pincode: this.customerData.Pincode,
        Locality: this.customerData.Locality,
        EmailAddress: this.customerData.EmailAddress,
        Address: this.customerData.Address,
        City: this.customerData.City,
        Town: this.customerData.Town,
        Type: this.customerData.Type
      });
    }
  }
  openSnackBar = async prop => {
    await this.setState({ status: prop });
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 3000);
    });
  };

  validate = e => {
    const regexp = /[A-Za-z]{3,20}/;
    const char = e.target.value;
    if (!regexp.test(char)) {
      this.openSnackBar("Invalid Name");
      this.setState({
        [e.target.name]: ""
      });
    }
  };

  validateEmailAddress = e =>{
    const regexp3=/^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/
    const char = e.target.value;
    if (!regexp3.test(char)) {
      this.openSnackBar("Invalid Email Address");
      this.setState({
        [e.target.name]: ""
      });
    }
  }

  validatePhoneNumbeer = e => {
    const regexp1 = /^[5-9]\d{9}$/;
    const char = e.target.value;
    if (!regexp1.test(char)) {
      this.openSnackBar("Invalid Phone Number");

      this.setState({
        [e.target.name]: ""
      });
    }
  };

  validatePinCode = e => {
    const regexp2 = /^[1-9]\d{5}$/;
    const char = e.target.value;
    if (!regexp2.test(char)) {
      document.getElementById(e.target.id).style.border = "red";
      this.openSnackBar("Invalid PinCode");
      this.setState({
        [e.target.name]: ""
      });
    }
  };

  validateRadioButton = async () => {
    if (
      document.getElementById("customerDetails7").checked === true ||
      document.getElementById("customerDetails8").checked === true ||
      document.getElementById("customerDetails9").checked === true
    ) {
      return null;
    }
    await this.setState({ formValid: false });
  };

  buttonPressed = async event => {
    this.setState({ formValid: true });
    await ids
      .filter(value => {
        if (
          value === "customerDetails9" ||
          value === "customerDetails8" ||
          value === "customerDetails7"
        ) {
          return false;
        }
        return true;
      })
      .map(value =>
        document.getElementById(value).checkValidity() === false
          ? this.setState({ formValid: false })
          : null
      );
    await this.validateRadioButton();
    if (this.state.formValid === false) {
      this.openSnackBar("Invalid Data");
      return this.state.formValid;
    }
    ids.map(values => (document.getElementById(values).disabled = true));
    document.getElementById("edit").style.display = "block";
    document.getElementById("onSumbit").style.display = "none";
    this.props.handleExpantion("expanded2");
    localStorage.setItem("customerDetails", JSON.stringify(this.state));
    this.props.customerDetails(this.state);
  };

  componentDidMount(){
    if(localStorage.getItem('customerDetails')){
      this.props.handleExpantion("expanded2");
      ids.map(values => (document.getElementById(values).disabled = true));
      document.getElementById("edit").style.display = "block";
      document.getElementById("onSumbit").style.display = "none";
    }
  }

  editDetails = () => {
    ids.map(values => (document.getElementById(values).disabled = false));
    document.getElementById("edit").style.display = "none";
    document.getElementById("onSumbit").style.display = "block";
  };

  updateState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel className={classes.root} expanded={this.props.expanded}>
        <ExpansionPanelSummary>
          <Typography className={classes.heading}>
            <b>Customer Details</b>
          </Typography>
          <label className={classes.edit} id="edit" onClick={this.editDetails}>
            Edit
          </label>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                type="text"
                className={classes.textField}
                value={this.state.Name}
                name="Name"
                id="customerDetails"
                onBlur={this.validate}
                onChange={this.updateState}
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                type="text"
                name="PhoneNumber"
                id="customerDetails1"
                value={this.state.PhoneNumber}
                onBlur={this.validatePhoneNumbeer}
                onChange={this.updateState}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pincode"
                type="text"
                id="customerDetails2"
                name="Pincode"
                value={this.state.Pincode}
                onBlur={this.validatePinCode}
                onChange={this.updateState}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Locality"
                className={classes.textField}
                id="customerDetails3"
                name="Locality"
                value={this.state.Locality}
                onBlur={this.validate}
                onChange={this.updateState}
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="EmailAddress"
                className={classes.textField}
                id="customerDetails10"
                name="EmailAddress"
                value={this.state.EmailAddress}
                onBlur={this.validateEmailAddress}
                onChange={this.updateState}
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                label="Address"
                rowsMin={4}
                id="customerDetails4"
                value={this.state.Address}
                name="Address"
                onChange={this.updateState}
                rowsMax={4}
                placeholder="Address*"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                id="customerDetails5"
                className={classes.textField}
                name="City"
                value={this.state.City}
                onBlur={this.validate}
                onChange={this.updateState}
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Town"
                className={classes.textField}
                name="Town"
                id="customerDetails6"
                value={this.state.Town}
                onBlur={this.validate}
                onChange={this.updateState}
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel className={classes.addressType}>Type</FormLabel>
              <RadioGroup
                aria-label="Type"
                name="Type"
                defaultValue={this.state.Type}
                className={classes.group}
                onChange={this.updateState}
                row
              >
                <FormControlLabel
                  className={classes.radioButton}
                  value="Home"
                  control={<Radio color="primary" id="customerDetails7" />}
                  label="Home"
                />
                <FormControlLabel
                  className={classes.radioButton}
                  value="Work"
                  control={<Radio color="primary" id="customerDetails8" />}
                  label="Work"
                />
                <FormControlLabel
                  className={classes.radioButton}
                  value="Other"
                  control={<Radio color="primary" id="customerDetails9" />}
                  label="Other"
                />
              </RadioGroup>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                id="onSumbit"
                onClick={this.buttonPressed}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>

        <div
          className={
            this.state.isActive
              ? [Styles.snackbar, Styles.show].join(" ")
              : Styles.snackbar
          }
        >
          {this.state.status}
        </div>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(ControlledExpansionPanels);
