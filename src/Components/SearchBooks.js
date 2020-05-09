import React,{Component} from 'react'
import BookList from "./BookList.js"
import "../../src/App.css"
import {Link} from 'react-router-dom'

class SearchBooks extends Component {
    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"
                className="close-search"
                
              >
                Close
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={(event) => this.props.onSearchFunction(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.props.showLegend.length !== 0 ? (
                  <h1>{this.props.showLegend}</h1>
                ) : (
                  this.props.searchBooks.map((book, index) => {
                    const bookData = this.props.books.filter((b) => {
                      return b.id === book.id;
                    });
                    const shelfOfBook =
                      bookData.length > 0 ? bookData[0].shelf : "";
                    return (
                      <li key={index}>
                        <BookList
                          book={book}
                          search={shelfOfBook}
                          onChangeHandle={this.props.onUpdateFunction}
                        />
                      </li>
                    );
                  })
                )}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks;