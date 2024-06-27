import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./borrowbook.css";
import api from "../../api/Api";

const BorrowBook: React.FC = () => {
  const [username, setUsername] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [bookname, setBookname] = useState("");
  const navigate = useNavigate();

  const borrowBook = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const requestData = {
        username,
        bookname,
        startdate,
        enddate,
      };

      const token = localStorage.getItem("token");
      console.log("token:", token);
      if (!token) {
        throw new Error("No token found");
      }

      const response = await api.post("/user/borrow", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert("Book borrowed successfully");
        navigate("/viewbook");
      } else {
        alert("Failed to borrow book");
      }
    } catch (error: any) {
      console.error("Error borrowing book:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error borrowing book: ${error.response.data.message}`);
      } else {
        alert("Error borrowing book");
      }
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
            defaultValue={""}
            type="text"
            value={bookname}
            onChange={(e) => setBookname(e.target.value)}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="text"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="text"
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
