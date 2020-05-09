import React, { Component } from "react";
import StarRatings from 'react-star-ratings';
import "../../src/App.css";

class BookList extends Component {
    handleChange = (e) =>{
        if(this.props.onChangeHandle){
            this.props.onChangeHandle(e.target.value,this.props.book)
        }
    }
  render() {
    const { book} = this.props;
    const bookShelf = this.props.search ? this.props.search : book.shelf;
    return (
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : 'none' ,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select onChange = {this.handleChange} defaultValue = {bookShelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead" >Want to Read</option>
                <option value="read" >Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
          <StarRatings
          rating={book.averageRating}
          starRatedColor="orange"
          numberOfStars={5}
          starDimension="20px"
          name='rating'
          starSpacing="2px"
        />
        </div>
    );
  }
}

export default BookList;
