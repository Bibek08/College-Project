import { useEffect, useState } from "react";
import { Container, Table, Button, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TableComponent = () => {
  const [semester, setSemester] = useState("defaultSemester");
  const [feeStructure, setFeeStructure] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/fees/${semester}`).then((res) => {
      setFeeStructure(res.data);
    });
  }, [semester]);

  const fee = () => {
    navigate("/feeStructure/CreateFee");
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  return (
    <>
      <Container fluid style={{ border: "1px solid black" }}>
        <div style={{ textAlign: "center" }}>
          <h4>Aadikavi Bhanubhankta Campus </h4>
          <span>Estd.2004</span>
          <h5>vyas-1 Bigyanchaur, Damauli </h5>
        </div>
        <div>
          <Button onClick={() => fee()}>Create Fee Structure</Button>
        </div>
        <Form>
          <Form.Label>Semester: </Form.Label>
          <FormControl
            as="select"
            value={semester}
            onChange={handleSemesterChange}
          >
            <option value="defaultSemester">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
            <option value="9">Semester 9</option>
          </FormControl>
        </Form>
        <Table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Particulars</th>
              <th>Amount (Rs.)</th>
            </tr>
            <tbody>
              {feeStructure.map((feeStructure, index) => (
                <tr key={feeStructure._id}>
                  <td>{index + 1}</td>
                  <td>{feeStructure.feeName}</td>
                  <td>{feeStructure.feeAmount}</td>
                </tr>
              ))}
            </tbody>
          </thead>
        </Table>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Container>
    </>
  );
};

export default TableComponent;
