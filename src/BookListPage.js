import React, { Component } from 'react';
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class BookListPage extends Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1> My Reads </h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf books = { this.props.getFilteredBook("currentlyReading") } shelfTitle="Currently Reading" />
                        <BookShelf books = { this.props.getFilteredBook("wantToRead") } shelfTitle="Want to Read" />
                        <BookShelf books = { this.props.getFilteredBook("read") } shelfTitle="Read" />
                    </div>
                </div>

                <div className="open-search">
                    <Link className="open-search" to="/search"> Add a book </Link>
                </div>
            </div>
        );
    }
}

export default BookListPage