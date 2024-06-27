import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import React, { useEffect, useState } from "react";
import api from "../../api/Api";

export interface Book {
  ID: number;
  bookname: string;
}

const AdminDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token:", token);
        if (!token) {
          throw new Error("No token found");
        }

        const response = await api.get("/user/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      console.log("token:", token);
      if (!token) {
        throw new Error("No token found");
      }

      await api.delete(`/admin/deletebook/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book.ID !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-dashboard-container">
      <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
      <div className="admin-buttons">
        <Link to="/addbook" className="admin-button">
          Create Book
        </Link>
        <Link to="/viewusers" className="admin-button">
          View Users
        </Link>
        <Link to="/userbook" className="admin-button">
          View UserBooks
        </Link>
        <button
          className="action-button"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            Logout();
          }}
        >
          Logout
        </button>
      </div>
      <div className="table-container">
        <h1>Book Table</h1>
        <table className="styled-table">
          <thead>
            <tr key="header">
              {books.length > 0 &&
                Object.keys(books[0]).map((key) => <th key={key}>{key}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item) => (
              <tr key={item.ID}>
                {Object.values(item).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
                <td>
                  <button
                    className="add-book-button"
                    onClick={() => handleDeleteBook(item.ID)}
                    style={{ backgroundColor: "red" }}
                  >
                    Delete book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
