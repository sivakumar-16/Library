import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './borrowedbook.css'

const BorrowBook: React.FC = () => {
  const [username, setUsername] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [bookname, setBookname] = useState('');
  const navigate = useNavigate();

  const borrowBook = async () => {
    try {
      const requestData = {
        username,
        bookname,
        startdate,
        enddate,
      };

      const token = localStorage.getItem('token');
      console.log('token:', token);
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.post(
          'http://localhost:9082/user/borrow',requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      if (response.status === 201) {
        alert('Book borrowed successfully');
        navigate('/viewbook'); // Navigate back to the viewbook page after borrowing
      } else {
        alert('Failed to borrow book');
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      alert('Error borrowing book');
    }
  };

  return (
    <div>
      <h2>Borrow Book</h2>
      <form onSubmit={borrowBook}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Bookname:
          <input
            type="text"
            value={bookname}
            onChange={(e) => setBookname(e.target.value)}
            required

          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Borrow Book</button>
      </form>
    </div>
  );
};

export default BorrowBook;
