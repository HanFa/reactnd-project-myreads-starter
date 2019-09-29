import React, { Component } from 'react'
import PropTypes from 'prop-types';


class BookShelf extends Component {

    static defaultProps = {
        books: PropTypes.array.required,
        shelfTitle: PropTypes.string.required
    };


    render() {
        return <div className="bookshelf">
            <h2 className="bookshelf-title"> { this.props.shelfTitle } </h2>
            <div className="bookshelf-books">
                <lo className="books-grid">
                    { this.props.books }
                </lo>
            </div>
        </div>
    }
}

export default BookShelf