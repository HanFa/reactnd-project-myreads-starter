import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import BookSearchPage from "./BookSearchPage";
import BookListPage from "./BookListPage";
import { BrowserRouter, Route } from "react-router-dom";
import {update} from "./BooksAPI"
import {search} from "./BooksAPI"


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchResults: [],
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
      b.shelf = newShelf
      update(b, newShelf)
      if (prevState.books.filter((book) => book.id === b.id).length === 0) {
        // if b is not in our app yet, clone one to our app repo
        return { books : prevState.books.concat(b) }
      }
      else
        return {
        // if b is in our app, change the entry
          books : prevState.books.map((book) => {
            if ( book.id === b.id ) book.shelf = newShelf
            return book;
          })
        }
    })
  }

  onSearchChange = (val) => {
    if (val === "") {
      this.setState( { searchResults : [] } )
      return
    }
    search(val).then((books) => {
      // for each book searched, figure out which shelf it is on
      books = books.length === undefined ? [] : books
      books.map((book) => {
        let matchBook = this.state.books.filter((b) => b.id === book.id)
        book.shelf = (matchBook.length > 0) ? matchBook[0].shelf : 'none'
      })
      this.setState( { searchResults: books } )
    })
  }

  getFilteredBook = ( bookShelf ) => {
      return this.state.books.filter(( book ) =>  {
        return book.shelf === bookShelf;
      }).map((book) => {
        return <li key={ book.id }>
          <Book book={ book } onBookShelfChangeSubmit={ this.onBookShelfChangeSubmit } />
        </li>
      })
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">

          <Route path="/search" render={ () => <BookSearchPage searchResults={ this.state.searchResults }
                                                         onSearchChange={ this.onSearchChange }
                                                         onBookShelfChangeSubmit={ this.onBookShelfChangeSubmit } />
          }/>

          <Route exact path="/" render={ () => <BookListPage getFilteredBook={ this.getFilteredBook }/> } />

        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
