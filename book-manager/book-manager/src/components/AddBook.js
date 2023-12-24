// // // src/components/AddBook.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddBook.css'; // Import CSS file

// const AddBook = () => {
//   const [formData, setFormData] = useState({
//     Authoer: '',
//     BookId: '',
//     BookName: '',
//     NumberOfPages: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('https://us-central1-bookshelf-403415.cloudfunctions.net/addBook', formData)
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="add-book-container"> {/* Add a CSS class */}
//       <h2>Add Book</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="Authoer" placeholder="Author" onChange={handleChange} />
//         <input type="text" name="BookId" placeholder="Book ID" onChange={handleChange} />
//         <input type="text" name="BookName" placeholder="Book Name" onChange={handleChange} />
//         <input type="number" name="NumberOfPages" placeholder="Number of Pages" onChange={handleChange} />
//         <button type="submit">Add Book</button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;
import React, { useState } from 'react';
import './AddBook.css'; // Import CSS file

const AddBook = () => {
  const [formData, setFormData] = useState({
    Authoer: '',
    BookId: '',
    BookName: '',
    NumberOfPages: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Create a new XMLHttpRequest instance
      const xhr = new XMLHttpRequest();

      // Set up the request
      xhr.open('POST', 'https://us-central1-bookshelfmanager-406704.cloudfunctions.net/AddBook', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      // Handle the response
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
        } else {
          console.error('Request failed. Status: ' + xhr.status);
        }
      };

      // Send the request with the form data
      xhr.send(JSON.stringify(formData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Authoer" placeholder="Author" onChange={handleChange} />
        <input type="text" name="BookId" placeholder="Book ID" onChange={handleChange} />
        <input type="text" name="BookName" placeholder="Book Name" onChange={handleChange} />
        <input type="number" name="NumberOfPages" placeholder="Number of Pages" onChange={handleChange} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
