import "../../App.css";
import { useEffect, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import admin from "../assets/admin.png";
import "../../pages/createStudent/createStudent";
import Header from "../../components/header/header";

function Student() {
  // const Students = () => {
  const [student, setStudent] = useState([]);
  const [show, setShow] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/getStudents").then((res) => {
      setStudent(res.data);
    });
  }, []);

  //function to delete Student
  const deleteStudent = (id) => {
    //eslint-disable-next-line
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );
    axios
      .delete(`/deleteStudent/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  //function to goBack after click of Add Student Btn
  const goBack = () => {
    navigate("/CreateStudent");
  };

  const updateStudent = (student) => {
    handleShow();
    setUpdatedStudent(student);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedStudent = () => {
    axios
      .put(`/updateStudent/${updatedStudent._id}`, updatedStudent)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <>
      <div>
        <Header />
        <div
          className="d-flex justify-content-end align-item-end"
          style={{ marginTop: "50px" }}
        >
          <Button style={{ marginRight: "80px" }} onClick={() => goBack()}>
            Add Student{" "}
          </Button>
        </div>
        <Table style={{ marginTop: "10px", border: "1px solid black" }}>
          <thead>
            <tr
              className="text-center"
              style={{ backgroundColor: "blue", border: "1px solid black" }}
            >
              <th>Roll</th>
              <th>Semester</th>
              <th>Name</th>
              <th>Email</th>
              <th>Guardian Name</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {student.map((student) => (
              <tr key={student._id} className="text-center">
                <td>{student.roll} </td>
                <td>{student.semester} </td>
                <td>{student.name} </td>
                <td>{student.email} </td>
                <td>{student.guardianName} </td>
                <td>{student.contact} </td>
                <td>{student.gender} </td>
                <td>{student.status} </td>
                <td>
                  <Button
                    variant="outline-success"
                    style={{ marginRight: "5px" }}
                    onClick={() => updateStudent(student)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline-danger"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal style={{ marginLeft: "50px" }} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  name="name"
                  placeholder="Name of Student"
                  type="text"
                  value={updatedStudent.name ? updatedStudent.name : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="roll"
                  placeholder="Roll number"
                  type="number"
                  value={updatedStudent.roll ? updatedStudent.roll : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={updatedStudent.email ? updatedStudent.email : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="guardianName"
                  placeholder="Guardian Name"
                  value={
                    updatedStudent.guardianName
                      ? updatedStudent.guardianName
                      : ""
                  }
                  onChange={handleChange}
                />

                <Form.Control
                  name="contact"
                  placeholder="Contact"
                  type="number"
                  value={updatedStudent.contact ? updatedStudent.contact : ""}
                  onChange={handleChange}
                />

                <Form.Control
                  name="gender"
                  placeholder="Gender"
                  type="text"
                  value={updatedStudent.contact ? updatedStudent.contact : ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveUpdatedStudent}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Student;
