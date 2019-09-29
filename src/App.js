import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import BookSearchPage from "./BookSearchPage";
import BookListPage from "./BookListPage";
import { BrowserRouter, Route } from "react-router-dom";


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      });
    })
  }

  onBookShelfChangeSubmit = (b, newShelf) => {
    this.setState((prevState) => {

      b.shelf = newShelf;
      if (prevState.books.filter((book) => book.id === b.id).length === 0) {
        // if b is not in our app yet, clone one to our app repo
        let clone = JSON.parse(JSON.stringify(b));
        clone.shelf = newShelf;
        return { books : prevState.books.concat(clone) };
      }
      else
        return {
        // if b is in our app, change the entry
          books : prevState.books.map((book) => {
            if ( book.id === b.id ) book.shelf = newShelf;
            return book;
          })
        };
    })
  };

  getFilteredBook = ( bookShelf ) => {
      return this.state.books.filter(( book ) =>  {
        return book.shelf === bookShelf;
      }).map((book) => {
        return (<li key={ book.id }> <Book book={ book } onBookShelfChangeSubmit={ this.onBookShelfChangeSubmit } /> </li>)
      })
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">

          <Route path="/search" render={ () => { return (<BookSearchPage onBookShelfChangeSubmit={ this.onBookShelfChangeSubmit } />) }} />
          <Route exact path="/" render={ () => { return (<BookListPage getFilteredBook={ this.getFilteredBook }/>) }} />

        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
