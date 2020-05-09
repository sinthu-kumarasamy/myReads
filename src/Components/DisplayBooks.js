import React ,{Component} from 'react'
import BookList from "./BookList.js"
import "../../src/App.css"
import {Link} from 'react-router-dom'

class DisplayBooks extends Component{
   
    render(){
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter(
                        (book) => book.shelf === "currentlyReading"
                      ).length === 0 ? (
                        <h1>No books available in this category</h1>
                      ) : (
                        this.props.books.map(
                          (book, index) =>
                            book.shelf === "currentlyReading" && (
                              <li key={index}>
                                <BookList
                                  book={book}
                                  onChangeHandle={this.props.onUpdateFunction}
                                />
                              </li>
                            )
                        )
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter(
                        (book) => book.shelf === "wantToRead"
                      ).length === 0 ? (
                        <h1>No books available in this category</h1>
                      ) : (
                        this.props.books.map(
                          (book, index) =>
                            book.shelf === "wantToRead" && (
                              <li key={index}>
                                <BookList
                                  book={book}
                                  onChangeHandle={this.props.onUpdateFunction}
                                />
                              </li>
                            )
                        )
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter((book) => book.shelf === "read")
                        .length === 0 ? (
                        <h1>No books available in this category</h1>
                      ) : (
                        this.props.books.map(
                          (book, index) =>
                            book.shelf === "read" && (
                              <li key={index}>
                                <BookList
                                  book={book}
                                  onChangeHandle={this.props.onUpdateFunction}
                                />
                              </li>
                            )
                        )
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" className="open-search-button">
                Add a book
              </Link>
            </div>
          </div>
        )
    }

}

export default DisplayBooks;