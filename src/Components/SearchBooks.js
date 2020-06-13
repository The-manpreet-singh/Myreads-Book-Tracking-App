import React, { Component } from 'react'
//import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import * as BooksAPI from './../BooksAPI';
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
          query: query.trim()
        }) )
       } )
    }

    bookUpdateHandler(book, shelf) {
      BooksAPI.update(book, shelf)
       .then( ()=> shelf !== 'none' ? alert(`${book.auther} add successfully`) : null )
       .catch( ()=> alert('Bad request') );
    }
   

    render() {

       const { books, query } = this.state
      //  const showingBooks = query === '' ? books
      //                           : books.filter( (c)=>(
      //                               c.title.toLowerCase().includes(query.toLowerCase())
      //                           ) )
       console.log(books)
       //console.log(query);
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
                   placeholder="Search by title or author"
                   value={query} 
                   onChange={ (e) => this.updateSearchHandler(e.target.value) } />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              
              {   <li 
                    key={book.id}
                     >
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={ (e)=> this.shelfHandler(book, e.target.value) } value={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>    
                  }

              </ol>
            </div>
          </div>
        )
    }
}
