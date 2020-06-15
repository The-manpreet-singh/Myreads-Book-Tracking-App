import React, { Component } from 'react';

import * as BooksAPI from './../BooksAPI';

import { Link } from 'react-router-dom';

import ListBooksView from './ListBooksView';



class ListBooks extends Component {

	state = {
		books: [],
  };
  

	componentDidMount() {
		this.getAllBooks();
	}

	getAllBooks = () => {
		BooksAPI.getAll().then((books) => {
			this.setState(() => ({
				books: books,
			}));
		});
	};

	shelfHandler = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			this.getAllBooks();
		});
	};

	booksMapHandler = (books, head) => {
		return (
			<div className='bookshelf'>
				<h2 className='bookshelf-title'>{head}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{books.map((book) => (
							<ListBooksView key={book.id} book={book} clickShelfHandler={this.shelfHandler} />
						))}
					</ol>
				</div>
			</div>
		);
	};

	render() {
		const { books } = this.state;
		//console.log(books);

		const currentBookFilter = books.filter((book) => book.shelf === 'currentlyReading');
		const wantReadFilter = books.filter((book) => book.shelf === 'wantToRead');
		const readFilter = books.filter((book) => book.shelf === 'read');

		return (
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>MyReads</h1>
				</div>
				<div className='list-books-content'>
					<div>
						{this.booksMapHandler(currentBookFilter, 'Currently Reading Books')}
						{this.booksMapHandler(wantReadFilter, 'Want to Read Books')}
						{this.booksMapHandler(readFilter, 'Read Books')}
					</div>
				</div>

				<div className='open-search'>
					{/* <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		);
	}
}

export default ListBooks;
