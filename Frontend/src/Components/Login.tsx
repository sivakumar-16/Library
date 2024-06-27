import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/Api";

interface DecodeToken {
  id: string;
  role: string;
}

const Login: React.FC = () => {
  const [username, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/signin", { username, password });
      console.log("Form data submitted:", response.data);

      const token = response.data;

      localStorage.setItem("token", token);

      const decodedToken = jwtDecode<DecodeToken>(token);
      console.log(decodedToken);

      const role = decodedToken.role;

      if (role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/viewbook");
      }
    } catch (error) {
      alert("wrong username or password");
      console.error("login failed", error);
    }
  };

  return (
    <div className="login-container mt-5">
      <h2 style={{ textAlign: "center", color: "blue" }}>LOGIN</h2>
      <Form onSubmit={handleSubmit}>
        <div className="form" style={{ padding: "20px" }}>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              <b>User Name:</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <br></br>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <b>Password:</b>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
        </div>
        <div
          className="button"
          style={{ textAlign: "center", padding: "10px" }}
        >
          <Button variant="info" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
