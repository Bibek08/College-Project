import "../../App.css";
import { useEffect, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import admin from "../assets/admin.png";
import "../../pages/createAccountant/createAccountant";
import Header from "../../components/header/header";

function Accountant() {
  // const Students = () => {
  const [accountant, setAccountant] = useState([]);
  const [show, setShow] = useState(false);
  const [updatedAccountant, setUpdatedAccountant] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/getAccountant").then((res) => {
      setAccountant(res.data);
    });
  }, []);

  //function to delete Student
  const deleteAccountant = (id) => {
    //eslint-disable-next-line
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this accountant?"
    );
    axios
      .delete(`/deleteAccountant/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  //function to goBack after click of Add Accountant Btn
  const goBack = () => {
    navigate("/CreateAccountant");
  };

  const updateAccountant = (accountant) => {
    console.log(accountant);
    handleShow();
    setUpdatedAccountant(accountant);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccountant((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedAccountant = () => {
    axios
      .put(`/updateAccountant/${updatedAccountant._id}`, updatedAccountant)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-end align-item-end"
        style={{ marginTop: "50px" }}
      >
        <Button style={{ marginRight: "80px" }} onClick={() => goBack()}>
          Add Accountant{" "}
        </Button>
      </div>
      <Table style={{ marginTop: "10px", border: "1px solid black" }}>
        <thead>
          <tr className="text-center" style={{ backgroundColor: "blue" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accountant.map((accountant) => (
            <tr key={accountant._id} className="text-center">
              <td>{accountant.name} </td>
              <td>{accountant.email} </td>
              <td>{accountant.contact} </td>
              <td>
                <Button
                  variant="outline-success"
                  style={{ marginRight: "5px" }}
                  onClick={() => updateAccountant(accountant)}
                >
                  Edit
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={() => deleteAccountant(accountant._id)}
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
          <Modal.Title>Update Accountant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                name="name"
                placeholder="Name of Accountant"
                type="text"
                value={updatedAccountant.name ? updatedAccountant.name : ""}
                onChange={handleChange}
              />

              <Form.Control
                name="contact"
                placeholder="Contact Number"
                type="number"
                value={
                  updatedAccountant.contact ? updatedAccountant.contact : ""
                }
                onChange={handleChange}
              />

              <Form.Control
                name="email"
                placeholder="Email"
                type="email"
                value={updatedAccountant.email ? updatedAccountant.email : ""}
                onChange={handleChange}
              />

              {/* <Form.Control
                  name="password"
                  placeholder="Password"
                  value={
                    updatedAccountant.password ? updatedAccountant.password : ""
                  }
                  onChange={handleChange}
                /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedAccountant}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Accountant;
