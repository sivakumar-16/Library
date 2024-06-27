import React, { useEffect, useState } from "react";
import { Book } from "../adminComponents/adminDashboard";
import { User } from "../adminComponents/ViewUser";
import api from "../../api/Api";
import { jwtDecode } from "jwt-decode";

interface DecodeToken {
  id: number;
  role: string;
}

interface UserBook {
  UBID: number;
  username: User;
  bookname: Book;
  startdate: string;
  enddate: string;
}

const BorrowedBook: React.FC = () => {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  let decodedToken: DecodeToken | null = null;
  if (token) {
    decodedToken = jwtDecode<DecodeToken>(token);
  }

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await api.get("/admin/userbooks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (decodedToken) {
          const filteredBooks = response.data.filter(
            (book: UserBook) => book.username.ID === decodedToken.id
          );

          setUserBooks(filteredBooks);
        }
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };

    fetchUserBooks();
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBook;
