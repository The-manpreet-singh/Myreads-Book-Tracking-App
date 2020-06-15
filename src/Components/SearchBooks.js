import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import * as BooksAPI from './../BooksAPI';

import ListBooksView from './ListBooksView';

export default class SearchBooks extends Component {
	state = {
		books: [],
		query: '',
	};

	searchHander = (e) => {
		let query = e.target.value;
		this.setState(() => {
			return { query: query };
		});
		this.updateSearchHandler(query);
	};

	

	updateSearchHandler = (query) => {
		if (query.length !== 0) {
			BooksAPI.search(query).then((books) => {
				if (books.length > 0) {
					books = this.shelfChangeHandler(books);
					this.setState(() => ({
						books: books,
					}));
				}
			});
			this.setState({ query: query });
		} else {
			this.setState((currentState) => ({
				books: currentState.books,
				query: currentState.query,
			}));
		}
	};
	shelfChangeHandler = (books) => {
		let mybooks = this.props.mybooks;
		for(let book of books) {
			book.shelf= "none";
		}
		this.state.books.forEach((book) => {
			mybooks.forEach((myBook) => {
				if (myBook.id === book.id) {
					book.shelf = myBook.shelf;
				}
			});
		});
		return books;
	};

	// bookUpdateHandler=(book, shelf)=> {
	// 	BooksAPI.update(book, shelf)
	// 		.then(() => (shelf !== 'none' ? alert(`${book.authors} add successfully`) : null))
	// 		.catch(() => alert('Bad request'));
	// }

	searchBooksList = () => {
		const { books, query } = this.state;
		if (query.length > 0) {
			return books.error ? <div> No Books Available </div> : books.map((book) => <ListBooksView key={book.id} book={book} clickShelfHandler={this.props.onChange} />);
		} else {
			return null;
		}
	};

	// componentDidUpdate() {
	// 	this.searchBooksList();
	//   }

	render() {
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
					<ol className='books-grid'>{this.searchBooksList()}</ol>
				</div>
			</div>
		);
	}
}
