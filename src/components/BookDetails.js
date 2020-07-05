import React, { Component } from "react";
import "../css/BookDetails.css";
import InStock from "./InStock";
import OutOfStock from "./OutOfStock";
import Tooltip from "@material-ui/core/Tooltip";
import InCart from "./InCart";

export class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookTitle: "",
      autherName: "",
      bookPrice: 0,
      bookDetails: "",
      imageSrc: "",
      stock: this.props.bookList.noOfCopies,
      isInCart: false
    };
  }

  addToCart = () => {
    this.props.setCartBooks(this.props.bookList);
    this.UNSAFE_componentWillMount();
  };

  UNSAFE_componentWillMount() {
    if (localStorage.getItem("cartBook")) {
      JSON.parse(localStorage.getItem("cartBook")).map((value, index) => {
        return value.id === this.props.bookList.id
          ? this.setState({ isInCart: true })
          : null;
      });
    }
  }

  render() {
    return (
      <div className="bookDiv ">
        <Tooltip
          disableFocusListener
          disableTouchListener
          title={this.props.bookList.bookDetail}
        >
          <div className="imageDiv">
            <img
              className="bookImage"
              src={this.props.bookList.bookImageSrc}
              alt="no Cover"
            />
            {this.state.stock === 0 ? (
              <h3 className="outOfStock">Out Of Stock</h3>
            ) : (
                <h1> </h1>
              )}
          </div>
        </Tooltip>
        <div className="propertyHolderDiv">
          <div className="bookProperty">
            <p className="titleFont">{this.props.bookList.bookName}</p>
            <br />
            <p className="authorFont">{this.props.bookList.authorName}</p>
            <br />
            <p className="priceFont">Rs. {this.props.bookList.bookPrice}</p>
          </div>
          <div className="bookDivButton">
            {this.state.isInCart === true ? (
              <InCart />
            ) : this.state.stock > 0 ? (
              <InStock addToCart={this.addToCart} book={this.props.bookList} />
            ) : (
                  <OutOfStock />
                )}
          </div>
        </div>
      </div>
    );
  }
}

export default BookDetails;
