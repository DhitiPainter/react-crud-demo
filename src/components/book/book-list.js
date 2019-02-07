import React from 'react'
import "./book-list.scss";
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export function BookList(props) {

    const bookList = props.books;

    const displayBookData = bookList.map((book, index) =>
        // Only do this if items have no stable IDs
        <tr key={index}>
            <td key={index.toString() + "id"}>{book.ID}</td>
            <td key={index.toString() + "name"}>{book.Title}</td>
            <td key={index.toString() + "phone"}>{book.Description}</td>
            <td key={index.toString() + "website"}>{book.PageCount}</td>
            <td key={index.toString() + "companyname"}>{book.PublishDate}</td>
            {/* <td key={index.toString() + "city"}>{book.Excerpt}</td> */}
            <td key={index.toString() + "edit"}>
                <Link to={{
                    pathname: '/book/edit/' + book.ID,//+ user.id +
                    // hash: '#edit',
                    // search: '?isEditBook=true'
                }}>
                    <button key={book.ID} onClick={(e) => props.selectBookById(book.ID)}>
                        <FontAwesome name="pencil" size="2x" className="icon"></FontAwesome>
                        Edit
                    </button>
                </Link>
            </td>
            <td key={index.toString() + "delete"}>
                <button name={book.ID} onClick={handleDelete}><FontAwesome name="trash"></FontAwesome>Delete</button>
            </td>
        </tr>
    );

    return (
        <div>
            <h4>Book List</h4>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Page Count</td>
                        <td>Publish Date</td>
                        {/* <td>Excerpt</td> */}
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {displayBookData}
                </tbody>
            </table>
        </div>
    )
}

function handleDelete(event) {
    event.preventDefault();
    let deletedId = parseInt(event.target.name);
    Axios.delete("https://fakerestapi.azurewebsites.net/api/Books/" + parseInt(event.target.name))
        .then(response => {
            console.log("Delete Book", response);
            if (response.status === 200) {
                window.alert("Book data with id " + deletedId + " deleted.")
            }
        })
}

export default BookList; 