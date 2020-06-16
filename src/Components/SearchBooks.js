import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import * as BooksAPI from './../BooksAPI';

import ListBooksView from './ListBooksView';

import PropTypes from 'prop-types';

export default class SearchBooks extends Component {

	// static propTypes = {
	// 	Books: PropTypes.array.isRequired,
	// 	onChange: PropTypes.func.isRequired
	//   };

	state = {
		Books: [],
		query: '',
		searchError: false
	};

	searchHander = (e) => {
		let query = e.target.value;
		this.setState(() => {
			return { query: query };
		});
		this.updateSearchHandler(query);
		// BooksAPI.search(query).then(Books => Books ? this.setState({ Books }) : []);
		// this.setState({ query });
	};

	updateSearchHandler = (query) => {
		if (query) {
			BooksAPI.search(query).then((Books) => {
				if (Books.length > 0) {
					Books = this.shelfChangeHandler(Books);
					this.setState(() => ({
						Books: Books,
						searchError: false
					}));
				}
				else {
					this.setState(() => ({
						Books: [],
						searchError: true
					}));
				}
			});
			//this.setState({ query: query });
		} else {
			this.setState((currentState) => ({
				Books: currentState.Books,
				searchError: false
			}));
		}
	};
	shelfChangeHandler = (Books) => {
		let mybooks = this.props.mybooks;
		// for (let book of books) {
		// 	book.shelf = 'none';
		// }
		this.state.Books.forEach((book) => {
			mybooks.forEach((myBook) => {
				if (myBook.id === book.id) {
					book.shelf = myBook.shelf;
				}
			});
		});
		return Books;
	};
	
	render() {
		const { Books, query, searchError } = this.state;
		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					{/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
					<Link to='/' className='close-search'>
						Close
					</Link>
					<div className='search-books-input-wrapper'>
						{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
						<input type='text' placeholder='Search books by title or author' value={this.state.query} onChange={this.searchHander} />
					</div>
				</div>
				<div className='search-books-results'>
				{Books.length > 0 && (
            <div>
              <ol className="books-grid">
                { Books.map((book) => <ListBooksView key={book.id} book={book} clickShelfHandler={this.props.onChange}/> ) }
              </ol>
            </div>
          )}
          {searchError && (
            <div> No Books Available </div>
          )}
				</div>
			</div>
		);
	}
}
