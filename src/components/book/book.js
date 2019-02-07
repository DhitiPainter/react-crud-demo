import React, { Component } from 'react'
import axios from 'axios';
import { Route } from 'react-router-dom';

import { BookList } from './book-list'
import CreateEditBook from './create-edit/create-edit-book';
import { PrivateRoute } from '../../common/private-route';

export class BookComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            selectedBook: {}
        }

        console.log(props);
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks() {
        // Axios uses promises, a default js object introduced in ES6 
        // https://jsonplaceholder.typicode.com/users
        axios.get('https://fakerestapi.azurewebsites.net/api/Books')
            .then(response => {
                console.log(response);
                this.setState((preState, props) => {
                    // access preState instead of this.state here
                    return { books: response.data }
                });
            })
    }

    getBookById(bookId) {
        axios.get('https://fakerestapi.azurewebsites.net/api/Books/' + bookId.toString())
            .then(response => {
                console.log(response);
                this.setState((preState, props) => {
                    this.selectedBookId = response.data.ID
                    // access preState instead of this.state here
                    return { selectedBook: response.data }
                });
            })
    }

    render() {
        return (
            <div>
                <Route path="/" exact render={() => <BookList selectBookById={(id => this.getBookById(id))} books={this.state.books}></BookList>} />

                <PrivateRoute
                    component={this.state.selectedBook && this.selectedBookId ? CreateEditBook : BookList}
                    isAuthenticated={this.selectedBookId ? true : false}
                    path={this.state.selectedBook && this.selectedBookId ? "/book/edit/" + this.selectedBookId : "/"}
                    book={this.state.selectedBook} >
                </PrivateRoute>
            </div>
        )
    }
}

export default BookComponent;