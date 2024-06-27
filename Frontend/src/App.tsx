import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Viewbook from "./Components/userComponents/viewBook";
import AdminDashboard from "./Components/adminComponents/adminDashboard";
import AddBookForm from "./Components/adminComponents/addBooks";
import BorrowBook from "./Components/userComponents/borrowBooks";
import ViewUser from "./Components/adminComponents/ViewUser";
import ViewUserBook from "./Components/adminComponents/ViewUserBook";
import BorrowedBook from "./Components/userComponents/BorrowedBooks";
import Protected from "./Components/Protected";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/viewbook"
              element={
                <Protected>
                  <Viewbook />
                </Protected>
              }
            />
            <Route
              path="/admindashboard"
              element={
                <Protected>
                  <AdminDashboard />
                </Protected>
              }
            />
            <Route
              path="/addbook"
              element={
                <Protected>
                  <AddBookForm />
                </Protected>
              }
            />
            <Route
              path="/borrow/:BookId"
              element={
                <Protected>
                  <BorrowBook />
                </Protected>
              }
            />
            <Route
              path="/viewusers"
              element={
                <Protected>
                  <ViewUser />
                </Protected>
              }
            />
            <Route
              path="/userbook"
              element={
                <Protected>
                  <ViewUserBook />
                </Protected>
              }
            />
            <Route
              path="/borrowedbooks"
              element={
                <Protected>
                  <BorrowedBook />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
