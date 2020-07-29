import React, { Component, Fragment } from 'react';
import success from '../../asserts/Order-placed-successfully.png';
import '../../css/orderSuccessfull.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Dashboardorder from './Dashboardorder';
import { getOrderId } from '../../Configuration/BookConfig';

const styles = (theme) => ({
    button: {
        backgroundColor: 'rgb(47,115,183)',
        '&:hover': {
            backgroundColor: 'rgb(30,80,183)',
            color: 'White',
        },
    },
});

export class OrderSuccessfull extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderId: '',
        };
    }

    homePage = () => {
        this.props.history.push({
            pathname: '/',
        });
    };
    getOrderId = () => {
        getOrderId()
            .then((res) => {
                this.setState({ orderId: res.data });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getOrderId();
    }

    render() {
        const { classes } = this.props;
        return ( <
            Fragment >
            <
            Dashboardorder / >
            <
            div className = "successDiv" >
            <
            img className = "successImg"
            src = { success }
            alt = "SuccessfullImage" / >
            <
            p className = "paragraph" >
            hurray!!!your order is confirmed < br / >
            the order Id is < b > #{ this.state.orderId } < /b>
            save the order id
            for < br / > further communication.. <
            /p>  <
            table >
            <
            tr >
            <
            th > Email Us < /th> <th> Contact Us </th > < th > Address < /th>  <
            /tr>  <
            tr >
            <
            td > admin @ bookstore.com < /td> <td> +91 9777037773 </td >
            <
            td > Mohan 's Enclave, Ground Floor, BTM Stage 2, Bangalore, Karnataka 560068 </td>  <
            /tr>  <
            /table>  <
            Grid container direction = "row"
            justify = "center"
            alignItems = "center" >
            <
            Button onClick = { this.homePage }
            id = "placeOrderButton"
            variant = "contained"
            // className={classes.button}
            style = {
                { width: '22%', backgroundColor: '#3371B5', color: 'white' } } >
            Continue Shopping <
            /Button>  <
            /Grid>  <
            /div>  <
            /Fragment>
        );
    }
}

export default withStyles(styles)(OrderSuccessfull);