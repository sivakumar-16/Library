import React, { useEffect, useState } from "react";
import "./ViewUser.css";
import api from "../../api/Api";

export interface User {
  ID: number;
  username: string;
  role: string;
}

const ViewUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token:", token);
        if (!token) {
          throw new Error("No token found");
        }
        const response = await api.get("/admin/viewuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
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
