import React, { Component } from 'react'

import PropTypes from 'prop-types';

import {Link} from 'react-router-dom'

import * as BooksAPI from './../BooksAPI';

import ListBooksView from './ListBooksView';

export default class SearchBooks extends Component {

  // static propTypes = {
  //   books : PropTypes.array.isRequired,
  //   }

    state = {
      books: [],
      query: ''
    }

    updateSearchHandler = (query) => {
      BooksAPI.search(query)
       .then( (books)=> {
        this.setState( ()=> ({
          books: books,
          query: query
        }) )
       } )
    }

    bookUpdateHandler(book, shelf) {
      BooksAPI.update(book, shelf)
       .then( ()=> shelf !== 'none' ? alert(`${book.authors} add successfully`) : null )
       .catch( ()=> alert('Bad request') );
    }
   

  searchBooksList=()=> {
    const { books, query } = this.state
    if(query) {
      return books.error ? 
            <div> No Books Available </div>
            : books.map( (book) => (
                 <ListBooksView key={book.id} book={book} clickShelfHandler={this.bookUpdateHandler} />   
               ) 
              )
            
    }
  }

    render() {

        return (
            <div className="search-books">
            <div className="search-books-bar">
              {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
              <Link to='/' className="close-search">
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
                   placeholder="Search books by title or author"
                   value={this.state.query} 
                   onChange={ (e) => this.updateSearchHandler(e.target.value) } />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               { this.searchBooksList() }
              </ol>
            </div>
          </div>
        )
    }
}
