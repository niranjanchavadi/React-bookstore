import React, { Component } from 'react'
import minus from '../asserts/minus.png'
import plus from '../asserts/plus.png'
import Styles from "../css/snackbar.module.css";


export class CartBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookCount: this.props.param.quantity,
            nUnitOfBookPrice: this.props.param.bookPrice,
            prevValue: this.props.param.bookPrice,
            quantity: 1,
            status: "",
            isActive: false,
        }
        this.timer = null;
    }

    inputValue = async (event) => {
        return this.props.param.quantity < 1 || this.props.param.quantity > this.props.param.noOfCopies
            ? this.updateQuantity(event.target.value) : this.inputHandler(parseInt(event.target.value));
    }

    inputHandler = (event) => {
        this.props.updateBookQuantity(this.props.param.id, event)
        this.props.updateCartSubtotal()
    }

    updateQuantity =async (prop)=>{
        if(prop === "0"){
            this.props.updateBookQuantity(this.props.param.id, 1);
            this.props.updateCartSubtotal()
            await this.setState({ status: "Sorry you cant buy Zero quantity" });
            await this.openSnackBar();
        }else if(prop >= this.props.param.quantity){
            await this.props.updateBookQuantity(this.props.param.id, this.props.param.noOfCopies)
            await this.props.updateCartSubtotal()
            await this.setState({ status: "Only " + this.props.param.noOfCopies + " quantity left in our stock" });
            this.openSnackBar();
        }
    }


    decreaseCount = async () => {
        if (this.props.param.quantity > 1) {
            await this.props.updateBookQuantity(this.props.param.id, this.props.param.quantity - 1)
            this.props.updateCartSubtotal()
        }
        else {
            await this.setState({ status: "Sorry you cant buy Zero quantity" });
            this.openSnackBar();
        }
    }

    increaseCount = async () => {
        if (this.props.param.noOfCopies > this.props.param.quantity) {
            await this.props.updateBookQuantity(this.props.param.id, this.props.param.quantity + 1)
            this.props.updateCartSubtotal()
        } else {
            await this.setState({ status: "Only " + this.props.param.noOfCopies + " quantity left in our stock" });
            this.openSnackBar();
        }
    }

    removeBookEvent = async () => {
        this.props.removeBook(this.props.param)
        this.props.updateCartSubtotal()
    }

    openSnackBar = () => {
        this.setState({ isActive: true }, () => {
            setTimeout(() => {
                this.setState({ isActive: false });
            }, 3000);
        });
    };

    render() {
        return (
            <div className="bookDivHolder">
                <img src={this.props.param.bookImageSrc} className="cartBookImg" alt="bookImage" />
                <div className="cartBookDetails">
                    <p className="titleFont1">{this.props.param.bookName}</p>
                    <p className="authorFont1"> {this.props.param.authorName}</p>
                    <p className="priceFontCart">Rs.{this.props.param.bookPrice}</p>
                    <div className="cartButtonRow">
                        <button className="bookDetailsButton">
                            <img className="bookDetailsButtonImg" alt="minus" src={minus} onClick={this.decreaseCount}>
                            </img>
                        </button>
                        <input type="number" className="cartBookCount" value={this.props.param.quantity}
                            onChange={event => this.props.updateBookQuantity(this.props.param.id, parseInt(event.target.value))} onBlur={this.inputValue} />
                        <button className="bookDetailsButton">
                            <img className="bookDetailsButtonImg" alt="plus" src={plus} onClick={this.increaseCount} >
                            </img>
                        </button>
                        <p className="removeFont" onClick={this.removeBookEvent}>Remove</p>
                    </div>
                </div>
                <div
                    className={
                        this.state.isActive
                            ? [Styles.snackbar, Styles.show].join(" ")
                            : Styles.snackbar
                    }
                >
                    {this.state.status}
                </div>
            </div>
        )
    }
}

export default CartBook
