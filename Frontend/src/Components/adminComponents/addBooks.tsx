import React, { useState } from "react";
import "./AddBook.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api";

const AddBookForm: React.FC = () => {
  const [bookName, setBookName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("token:", token);
      if (!token) {
        throw new Error("No token found");
      }
      const response = await api.post(
        "/admin/createbook",
        { bookname: bookName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Book added successfully");
        setBookName("");
        navigate("/admindashboard");
      } else {
        alert("Book already exist");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Book already exist");
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
