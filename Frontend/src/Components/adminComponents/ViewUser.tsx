import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUser.css'

const ViewUser: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // Assuming the user data structure

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token:', token);
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(
            'http://localhost:9082/admin/viewuser',
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
          <th>Id</th>
            <th>Username</th>
            <th>password</th>
            {/* Add other user fields as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUser;
