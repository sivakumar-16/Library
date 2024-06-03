// src/components/RegisterPage.tsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';


const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9082/user/signup', formData);
      console.log('Form data submitted:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="register-container">
    <Container className="mt-5 ">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 style={{textAlign:'center',color:'blue'}}><b>Register</b></h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label><b>Username:</b></Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </Form.Group>
              <br />
            <Form.Group controlId="formBasicPassword">
              <Form.Label><b>Password:</b></Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
              <br />
              <div className="button" style={{textAlign:'center', padding:'10px'}} >
            <Button variant="primary" type="submit">
              Register User
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Register;
