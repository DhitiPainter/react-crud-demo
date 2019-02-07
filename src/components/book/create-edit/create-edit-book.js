import React, { Component } from 'react'
import { Book } from '../book-model';
import PropTypes from 'prop-types';
import "./create-edit-book.scss";

export class CreateEditBookComponent extends Component {
    constructor(props) {
        super(props);
        console.log("CreateEditBookComponent", props);
        this.state = {
            book: {}
        }
        this.state.book = props.book;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.editBook = this.editBook.bind(this);
    }

    handleInputChange = (event) => {
        console.log("handleInputChange", event);
        event.preventDefault();
        this.setState({ book: { ...this.state.book, [event.target.name]: event.target.value } })
    }

    // Update book
    editBook(event) {
        event.preventDefault();
        console.log("edit book", this.state.book);
        fetch('https://fakerestapi.azurewebsites.net/api/Books/' + this.state.book.ID, {
            method: 'PUT',
            body: JSON.stringify({
                ID: this.state.book.ID,
                Title: this.state.book.Title,
                Description: this.state.book.Description,
                PageCount: this.state.book.PageCount,
                PublishDate: this.state.book.PublishDate,
                Excerpt: this.state.book.Excerpt
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
    }



    render() {
        return (
            <div>
                <p>{this.props && this.props.book ? this.props.book.Title : null}&nbsp;Create - Edit Form</p>
                <form className="form">
                    <div className="row">
                        <div className="form-control">
                            <label>ID</label>
                            <input name="ID" type="number" value={this.state.book.ID} readOnly />
                        </div>
                        <div className="form-control">
                            <label>TITLE</label>
                            <input name="Title" type="text" value={this.state.book.Title} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-control">
                            <label>DESCRIPTION</label>
                            <input name="Description" type="text" placeholder="description" value={this.state.book.Description} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-control">
                            <label>PAGE COUNT</label>
                            <input name="PageCount" type="number" placeholder="page count" value={this.state.book.PageCount} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-control">
                            <label>PUBLISH DATE</label>
                            <input name="PublishDate" type="date" placeholder="publish date" value={this.state.book.PublishDate} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-control">
                            <label>EXCERPT</label>
                            <input name="Excerpt" type="text" placeholder="excerpt" value={this.state.book.Excerpt} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-control">
                            <button onClick={this.editBook}>SUBMIT</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

CreateEditBookComponent.prototypes = {
    book: PropTypes.objectOf(Book)
}

export default CreateEditBookComponent;