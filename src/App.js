import React, {Component} from 'react';

import * as BooksAPI from './BooksAPI'

import './App.css';

import ListBooks from './Components/ListBooks';

import SearchBooks from './Components/SearchBooks';

import { Route } from 'react-router-dom';

class BooksApp extends Component {

	state = {
	  /**
	   * TODO: Instead of using this state variable to keep track of which page
	   * we're on, use the URL in the browser's address bar. This will ensure that
	   * users can use the browser's back and forward buttons to navigate between
	   * pages, as well as provide a good URL they can bookmark and share.
	   */
		books: [],
	}
   
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
		BooksAPI.update(book, shelf)
		.then(() => {
			this.getAllBooks();
		})
		.then(() => (shelf !== 'none' ? alert(`${book.authors} add successfully`) : null))
			.catch(() => alert('Bad request'));
	};

    render () {
	return (
		<div className='app'>
			<Route exact path='/' render={ ()=> <ListBooks books={this.state.books} onChange={this.shelfHandler} /> } />
			<Route path='/search' render={ ()=><SearchBooks mybooks={this.state.books} onChange={this.shelfHandler} /> } />
		</div>
	);
}
}

export default BooksApp;
