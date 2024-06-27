import React, { useEffect, useState } from "react";
import "./viewbook.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api";

const Viewbook: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<{ BookId: number; BookName: string }[]>(
    []
  );

  const viewMyBooks = () => {
    navigate("/borrowedbooks");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        setState(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      <div className="top-buttons">
        <button className="action-button" onClick={viewMyBooks}>
          View My Books
        </button>
        <button
          className="action-button"
          style={{ backgroundColor: "red" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="table-container">
        <h1>Book Table</h1>
        <table className="styled-table">
          <thead>
            <tr key="header">
              {state.length > 0 &&
                Object.keys(state[0]).map((key) => <th key={key}>{key}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item) => (
              <tr key={item.BookId}>
                {Object.values(item).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
                <td>
                  <button
                    className="add-book-button"
                    onClick={() => navigate(`/borrow/${item.BookId}`)}
                  >
                    Borrow Book
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

export default Viewbook;
