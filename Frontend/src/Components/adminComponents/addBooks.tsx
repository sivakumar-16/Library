
import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css'

const AddBookForm: React.FC = () => {
  const [bookName, setBookName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        console.log('token:', token);
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.post(
            'http://localhost:9082/admin/createbook',
            { bookname: bookName },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
      if (response.status === 201) {
        alert('Book added successfully');
        setBookName(''); // Clear the input field
      } else {
        alert('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book');
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookName">Book Name</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={bookName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
