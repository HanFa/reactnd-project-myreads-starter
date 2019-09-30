import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from "./Book";
import { Link } from "react-router-dom";


class BookSearchPage extends Component {

    static defaultProps = {
        searchResults: PropTypes.array.required,
        onBookShelfChangeSubmit: PropTypes.func.required,
        onSearchChange: PropTypes.func.required
    }


    render() {
        console.log(this.props.searchResults)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/"> Close </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */
                    }
                        <input type="text" placeholder="Search by title or author" onInput={ (event) => { this.props.onSearchChange(event.target.value) }}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.props.searchResults.map((book) =>
                                <li key={ book.id }> <Book book={ book } onBookShelfChangeSubmit={ this.props.onBookShelfChangeSubmit } /> </li>
                            )
                        }
                    </ol>
                    { this.props.searchResults.length === 0 && <h1 className="book-title"> No matched book </h1> }
                </div>
            </div>
        );
    }
}

export default BookSearchPage