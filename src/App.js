import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import DisplayBooks from "./Components/DisplayBooks";
import SearchBooks from "./Components/SearchBooks";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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

  emptySearchResults = () => {
    this.setState({
      searchBooks: [],
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              searchBooks={this.state.searchBooks}
              books={this.state.books}
              emptySearchResults={this.emptySearchResults}
              showLegend={this.state.showLegend}
              onSearchFunction={this.searchBooks}
              onUpdateFunction={(shelf, book) => {
                this.updateShelf(shelf, book);
                history.push("/");
              }}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <DisplayBooks
              books={this.state.books}
              onUpdateFunction={this.updateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
