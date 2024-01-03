import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { MDBFile } from "mdb-react-ui-kit";

import { useState } from "react";
import axios from "axios";
import "../../App.css";

function CreateStudent() {
  //useNavigate to switch between pages
  const navigate = useNavigate();

  const [post, setPost] = useState({
    name: "",
    gender: "",
    roll: "",
    email: "",
    guardianName: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;

    //change the default post value to new input value using prev hook
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //send data to backend api and store it on databse after call of api
  const handleClick = (e) => {
    //to prevent form default behaviour OF FORM
    e.preventDefault();

    //use axios to communicate with backend
    axios
      .post("/registerStudent", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // after completion navigate to posts
    navigate("/Students");
  };

  return (
    <div className="formContainer ">
      <h2 className="heading">Create Student </h2>
      <Form className="studentForm">
        <Form.Group>
          <h1>Fill this form</h1>

          <label>Student Name</label>
          <Form.Control
            name="name"
            placeholder="Name of Student"
            type="text"
            value={post.name}
            onChange={handleChange}
          />
          <label>Gender</label>
          <Form.Control
            name="gender"
            placeholder="Gender"
            as="select"
            value={post.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Control>
          <label>Roll Number</label>
          <Form.Control
            name="roll"
            placeholder="Roll number"
            type="number"
            value={post.roll}
            onChange={handleChange}
          />
          <label>Email ID</label>
          <Form.Control
            name="email"
            placeholder="Email"
            type="email"
            value={post.email}
            onChange={handleChange}
          />
          <label>Guardian Name</label>
          <Form.Control
            name="guardianName"
            placeholder="Guardian Name"
            value={post.guardianName}
            onChange={handleChange}
          />
          <label>Contact</label>
          <Form.Control
            name="contact"
            placeholder="Contact"
            type="number"
            value={post.contact}
            onChange={handleChange}
          />
          <label>Password</label>
          <Form.Control
            name="password"
            placeholder="Password"
            type="password"
            value={post.password}
            onChange={handleChange}
          />

          <Button
            className="submitBtn"
            variant="outline-primary"
            onClick={handleClick}
          >
            Submit
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            className="submitBtn"
            variant="outline-dark"
            onClick={() => navigate("/Students")}
          >
            Manage Student
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateStudent;
