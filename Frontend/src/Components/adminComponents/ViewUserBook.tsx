import React, { useEffect, useState } from "react";
import { Book } from "./adminDashboard";
import { User } from "./ViewUser";
import api from "../../api/Api";
import "./ViewUserBook.css";

interface UserBook {
  UBID: number;
  username: User;
  bookname: Book;
  startdate: string;
  enddate: string;
}

const ViewUserBook: React.FC = () => {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedUserBook, setSelectedUserBook] = useState<UserBook | null>(
    null
  );
  const [formData, setFormData] = useState<{
    startdate: string;
    enddate: string;
  }>({
    startdate: "",
    enddate: "",
  });

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await api.get("/admin/userbooks");
        setUserBooks(response.data);
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };
    fetchUserBooks();
  }, []);

  const handleUpdate = (userBook: UserBook) => {
    setSelectedUserBook(userBook);
    setFormData({ startdate: userBook.startdate, enddate: userBook.enddate });
    setShowPopup(true);
  };

  const handleDelete = async (id: number) => {
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

      await api.delete(`/admin/deleteub/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserBooks((prevUserBook) =>
        prevUserBook.filter((userBook) => userBook.UBID !== id)
      );
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserBook) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await api.patch(`/admin/updateUB/${selectedUserBook.UBID}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserBooks((prevUserBooks) =>
        prevUserBooks.map((userBook) =>
          userBook.UBID === selectedUserBook.UBID
            ? {
                ...userBook,
                startdate: formData.startdate,
                enddate: formData.enddate,
              }
            : userBook
        )
      );

      setShowPopup(false);
      setSelectedUserBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userBooks.map((userBook) => (
            <tr key={userBook.UBID}>
              <td>{userBook.UBID}</td>
              <td>{userBook.username.username}</td>
              <td>{userBook.bookname.bookname}</td>
              <td>{userBook.startdate}</td>
              <td>{userBook.enddate}</td>
              <td>
                <button
                  className="add-book-button"
                  onClick={() => handleUpdate(userBook)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="add-book-button"
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDelete(userBook.UBID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Update User Book</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Start Date:
                <input
                  type="text"
                  name="startdate"
                  value={formData.startdate}
                  onChange={handleFormChange}
                />
              </label>
              <br />
              <label>
                End Date:
                <input
                  type="text"
                  name="enddate"
                  value={formData.enddate}
                  onChange={handleFormChange}
                />
              </label>
              <br />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUserBook;
