import React, { Component } from 'react';

export default class ListBooksView extends Component {

	shelfUpdateHandler = (e) => {
		this.props.clickShelfHandler(this.props.book, e.target.value)
	}
	render(){


	const img = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : null;

  
	return (
		<div>
			<li>
				<div className='book'>
					<div className='book-top'>
						<div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${img})` }}></div>
						<div className='book-shelf-changer'>
							<select onChange={this.shelfUpdateHandler} value={this.props.book.shelf}>
								<option value='move' disabled>
									Move to...
								</option>
								<option value='currentlyReading'>Currently Reading</option>
								<option value='wantToRead'>Want to Read</option>
								<option value='read'>Read</option>
								<option value='none'>None</option>
							</select>
						</div>
					</div>
					<div className='book-title'>{this.props.book.title}</div>
					<div className='book-authors'>{this.props.book.authors}</div>
				</div>
			</li>
		</div>
	);
}
}
