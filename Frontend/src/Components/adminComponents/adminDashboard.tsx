import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import './AdminDashboard.css'; // Import your CSS file for styling
import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface UserBook {
  UBID: number;
  username: string; // Assuming username is a string
  bookname: string; // Assuming bookname is a string
  startdate: string;
  enddate: string;
}



const AdminDashboard:React.FC = () => {

  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
useEffect(() => {
  const fetchUserBooks = async () => {
    try {
      const response = await axios.get('http://localhost:9082/admin/userbooks');
        setUserBooks(response.data);
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };
    
    fetchUserBooks();
  }, []);
  
  const deleteBook = ()=>{

  }
  
  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-buttons">
        <Link to="/addbook" className="admin-button">Create Book</Link>
        <Link to="/viewusers" className="admin-button">View Users</Link>
        <Link to="/viewusers" className="admin-button">View UserBooks</Link>

        <Link to="/update" className="admin-button">Update</Link>
      </div>
      <div className="table-container">
      <h3>User Books</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>UBID</th>
            <th>Username</th>
            <th>Book Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userBooks.map((userBook) => (
            <tr key={userBook.UBID}>
              <td>{userBook.UBID}</td>
              <td>{userBook.username}</td>
              <td>{userBook.bookname}</td>
              <td>{userBook.startdate}</td>
              <td>{userBook.enddate}</td>
              <td><button style={{borderRadius:'5px',backgroundColor:'red'}} onClick={deleteBook}>del</button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminDashboard;
