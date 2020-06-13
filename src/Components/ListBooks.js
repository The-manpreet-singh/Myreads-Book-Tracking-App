import React, {Component} from 'react';

import * as BooksAPI from './../BooksAPI';

class ListBooks extends Component {

    state = {
        currentlyReading: [],
        wantToRead:[],
        read:[],
    }
  
    componentDidMount() {
      BooksAPI.getAll()
       .then( (books)=> {
           this.setState( ()=> ({
              currentlyReading : books.filter( (book)=> book.shelf === 'currentlyReading' ),
              wantToRead : books.filter( (book)=> book.shelf === 'wantToRead' ) ,
              read : books.filter( (book)=> book.shelf === 'read' )  ,
           }) )
       } )
    }

    updateShelf= (book, shelf) => {
        BooksAPI.update(book, shelf)
          .then( (books) => {
              this.setState( (currentState)=> ({
                  books: currentState.books
              }) )
          } )
    }

    render() {
        
        const {currentlyReading, wantToRead, read} = this.state;
        console.log(currentlyReading)
        console.log(wantToRead)
        console.log(read)

  return (
            
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
 
                      {/* <ListBooksOption /> */}

                      {currentlyReading.map( (book)=> 
                      
                      <li  
                         key={book.id}  
                         updateShelf={this.updateShelf}
                         >
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                
                            </div>
                            <div className="book-shelf-changer">
                              <select onChange={ (e)=> this.updateShelf(book, e.target.value) } value={book.shelf}>
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
                       )}


                      
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    {wantToRead.map( (book)=> 
                      
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                
                            </div>
                            <div className="book-shelf-changer">
                              <select>
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
                       )}
                     
                    </ol>
                  </div>
                </div>

            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                     
                {read.map( (book)=> 
                      
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                
                            </div>
                            <div className="book-shelf-changer">
                              <select>
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
                       )}
                  
                </ol>
                </div>
            </div>

        </div>

     </div>

            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )
    }
}


export default ListBooks;




