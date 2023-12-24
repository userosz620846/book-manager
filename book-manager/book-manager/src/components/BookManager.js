// // src/components/BooksManager.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './BookManager.css'; // Import CSS file

// const BooksManager = () => {
//   const [books, setBooks] = useState([]);
//   const [editedBook, setEditedBook] = useState(null);

//   useEffect(() => {
//     axios.get('https://dockerviewbook-xe5rvrfmoa-uc.a.run.app')
//       .then(response => {
//         setBooks(response.data.data.bookShelfCS);
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const handleEdit = (book) => {
//     setEditedBook(book);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();

//     axios.post('https://dockerupdate-xe5rvrfmoa-uc.a.run.app/update', editedBook)
//       .then(response => {
//         console.log(response.data);
//         setBooks(prevBooks => prevBooks.map(book => 
//           book.BookId === editedBook.BookId ? { ...book, ...editedBook } : book
//         ));
//         setEditedBook(null);
//       })
//       .catch(error => console.error(error));
//   };

//   const handleCancel = () => {
//     setEditedBook(null);
//   };

//   const handleDelete = (bookId) => {
//     axios.post('https://us-central1-bookshelf-403415.cloudfunctions.net/deleteBook', { BookId: bookId })
//       .then(response => {
//         console.log(response.data);
//         setBooks(prevBooks => prevBooks.filter(book => book.BookId !== bookId));
//       })
//       .catch(error => console.error(error));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedBook(prevBook => ({
//       ...prevBook,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="books-container">
//       <h2>Books Manager</h2>
//       <table className="books-table">
//         <thead>
//           <tr>
//             <th>Author</th>
//             <th>Book ID</th>
//             <th>Book Name</th>
//             <th>Number of Pages</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map(book => (
//             <tr key={book.BookId}>
//               {editedBook && editedBook.BookId === book.BookId ? (
//                 <>
//                   <td><input type="text" name="Authoer" value={editedBook.Authoer} onChange={handleChange} /></td>
//                   <td>{editedBook.BookId}</td>
//                   <td><input type="text" name="BookName" value={editedBook.BookName} onChange={handleChange} /></td>
//                   <td><input type="number" name="NumberOfPages" value={editedBook.NumberOfPages} onChange={handleChange} /></td>
//                   <td>
//                     <button className="save-button" onClick={(e) => handleSave(e)}>Save</button>
//                     <button className="cancel-button" onClick={handleCancel}>Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{book.Authoer}</td>
//                   <td>{book.BookId}</td>
//                   <td>{book.BookName}</td>
//                   <td>{book.NumberOfPages}</td>
//                   <td>
//                     <button className="edit-button" onClick={() => handleEdit(book)}>Edit</button>
//                     <button className="delete-button" onClick={() => handleDelete(book.BookId)}>Delete</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BooksManager;

import React, { useState, useEffect } from 'react';
import './BookManager.css'; // Import CSS file

const BooksManager = () => {
  const [books, setBooks] = useState([]);
  const [editedBook, setEditedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create a new XMLHttpRequest instance
        const xhr = new XMLHttpRequest();

        // Set up the request
        xhr.open('GET', 'https://viewbookservice-lwup2vslqa-uc.a.run.app', true);

        // Handle the response
        xhr.onload = function () {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            setBooks(response.data.bookShelfCS);
          } else {
            console.error('Request failed. Status: ' + xhr.status);
          }
        };

        // Send the request
        xhr.send();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (book) => {
    setEditedBook(book);
  };

  const handleSave = (e) => {
    e.preventDefault();

    try {
      // Create a new XMLHttpRequest instance
      const xhr = new XMLHttpRequest();

      // Set up the request
      xhr.open('POST', 'https://editbook-lwup2vslqa-uc.a.run.app/update', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      // Handle the response
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
          setBooks(prevBooks =>
            prevBooks.map(book =>
              book.BookId === editedBook.BookId ? { ...book, ...editedBook } : book
            )
          );
          setEditedBook(null);
        } else {
          console.error('Request failed. Status: ' + xhr.status);
        }
      };

      // Send the request with the edited book data
      xhr.send(JSON.stringify(editedBook));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditedBook(null);
  };

  const handleDelete = (bookId) => {
    try {
      // Create a new XMLHttpRequest instance
      const xhr = new XMLHttpRequest();

      // Set up the request
      xhr.open('POST', 'https://us-central1-bookshelfmanager-406704.cloudfunctions.net/DeleteBook', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      // Handle the response
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
          setBooks(prevBooks => prevBooks.filter(book => book.BookId !== bookId));
        } else {
          console.error('Request failed. Status: ' + xhr.status);
        }
      };

      // Send the request with the book ID to be deleted
      xhr.send(JSON.stringify({ BookId: bookId }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <div className="books-container">
      <h2>Books Manager</h2>
      <table className="books-table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Book ID</th>
            <th>Book Name</th>
            <th>Number of Pages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.BookId}>
              {editedBook && editedBook.BookId === book.BookId ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="Authoer"
                      value={editedBook.Authoer}
                      onChange={handleChange}
                    />
                  </td>
                  <td>{editedBook.BookId}</td>
                  <td>
                    <input
                      type="text"
                      name="BookName"
                      value={editedBook.BookName}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="NumberOfPages"
                      value={editedBook.NumberOfPages}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button
                      className="save-button"
                      onClick={(e) => handleSave(e)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{book.Authoer}</td>
                  <td>{book.BookId}</td>
                  <td>{book.BookName}</td>
                  <td>{book.NumberOfPages}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(book.BookId)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksManager;

