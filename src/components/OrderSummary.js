import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    root: {
        border: 'solid lightgray 2px',
        width: '99.6%',
        marginTop: '2%',
        boxShadow: '1px 1px 1px 1px lightgray',
    },
    heading: {
        fontSize: theme.typography.pxToRem(17.5),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontFamily: 'Roboto',
    },
    button: {
        margin: '0 1% 0 0',
        width: '200px',
        backgroundColor: 'rgb(47,115,183)',
        '&:hover': {
            backgroundColor: 'rgb(30,80,183)',
            color: '#FFF',
        },
    },
});

class OrderSummary extends React.Component {
        render() {
                const { classes } = this.props;

                return ( <
                        ExpansionPanel className = { classes.root }
                        expanded = { this.props.expanded2 } >
                        <
                        ExpansionPanelSummary >
                        <
                        Typography className = { classes.heading } >
                        <
                        b > Order Summary < /b>{' '} <
                        /Typography>{' '} <
                        /ExpansionPanelSummary>{' '} <
                        ExpansionPanelDetails >
                        <
                        Grid container direction = "row"
                        justify = "flex-start"
                        alignItems = "center" >
                        <
                        div className = "bookDivHolder1" > { ' ' } {
                            this.props.books.map((value) => {
                                    return ( <
                                        div className = "bookDivHolder" >
                                        <
                                        img src = { value.bookImageSrc }
                                        className = "cartBookImg"
                                        alt = "bookImage" / >
                                        <
                                        div className = "cartBookDetails" >
                                        <
                                        h5 className = "titleFont1" > { value.bookName } < /h5>{' '} <
                                        p className = "authorFont1" > { value.authorName } < /p>{' '} <
                                        h4 className = "priceFontCart" >
                                        Rs. { value.bookPrice } & #215; {value.quantity}{' '}
											</h4>
										</div>
									</div>
								);
							})}
							<h4 className= "subTotal" >
                                        <
                                        b > Subtotal: Rs. { this.props.subTotal } < /b>{' '} <
                                        /h4>{' '} <
                                        /div>{' '} {
                                            this.props.booksInCart !== 0 ? ( <
                                                Grid container direction = "row"
                                                justify = "flex-end"
                                                alignItems = "flex-end" >
                                                <
                                                Button id = "placeOrderButton"
                                                variant = "contained"
                                                style = {
                                                    { backgroundColor: '#A03037' } }
                                                className = { classes.button } >
                                                <
                                                Link to = { '/ordersuccessfull/:random' } > CHECKOUT < /Link>{' '} <
                                                /Button>{' '} <
                                                /Grid>
                                            ) : null
                                        } { ' ' } <
                                        /Grid>{' '} <
                                        /ExpansionPanelDetails>{' '} <
                                        /ExpansionPanel>
                                    );
                                }
                            }

                            export default withStyles(styles)(OrderSummary);