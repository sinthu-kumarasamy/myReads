import React from "react";
import * as BooksAPI from "./BooksAPI";
import BookList from "./Components/BookList.js";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchBooks: [],
    showLegend: "",
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  };

  updateShelf = (shelf, book) => {
    if (shelf !== "none") {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.getAll().then((books) => {
          this.setState(() => ({
            books: books,
          }));
        });
      });
    }
  };

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      if (query !== "") {
        const error = books.error;
        if (error) {
          this.setState(() => ({
            showLegend: "No results available for this keyword",
          }));
        } else {
          this.setState(() => ({
            showLegend: "",
            searchBooks: books,
          }));
        }
      } else {
        this.setState(() => ({
          searchBooks: [],
        }));
      }
    });
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
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
                  onChange={(event) => this.searchBooks(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.showLegend.length !== 0 ? (
                  <h1>{this.state.showLegend}</h1>
                ) : (
                  this.state.searchBooks.map((book, index) => {
                    const bookData = this.state.books.filter((b) => {
                      return b.id === book.id;
                    });
                    const shelfOfBook =
                      bookData.length > 0 ? bookData[0].shelf : "";
                    return (
                      <li key={index}>
                        <BookList
                          book={book}
                          search={shelfOfBook}
                          onChangeHandle={(shelf, book) => {
                            this.updateShelf(shelf, book);
                          }}
                        />
                      </li>
                    );
                  })
                )}
              </ol>
            </div>
          </div>
        ) : (
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
                      {this.state.books.filter(
                        (book) => book.shelf === "currentlyReading"
                      ).length === 0 ? (
                        <h1>No books available in this category</h1>
                      ) : (
                        this.state.books.map(
                          (book, index) =>
                            book.shelf === "currentlyReading" && (
                              <li key={index}>
                                <BookList
                                  book={book}
                                  onChangeHandle={(shelf, book) => {
                                    this.updateShelf(shelf, book);
                                  }}
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
                      {this.state.books.filter(
                        (book) => book.shelf === "wantToRead"
                      ).length === 0 ? (
                        <h1>No books available in this category</h1>
                      ) : (
                        this.state.books.map(
                          (book, index) =>
                            book.shelf === "wantToRead" && (
                              <li key={index}>
                                <BookList
                                  book={book}
                                  onChangeHandle={(shelf, book) => {
                                    this.updateShelf(shelf, book);
                                  }}
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
                      {this.state.books.filter((book) => book.shelf === "read")
                        .length === 0 ? (
                        <h1>No books available in this category</h1>
                      ) : (
                        this.state.books.map(
                          (book, index) =>
                            book.shelf === "read" && (
                              <li key={index}>
                                <BookList
                                  book={book}
                                  onChangeHandle={(shelf, book) => {
                                    this.updateShelf(shelf, book);
                                  }}
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
              <button onClick={() => this.setState({ showSearchPage: true , searchBooks : []})}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
