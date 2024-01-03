import { Container } from "react-bootstrap";
import Header from "../../components/header/header";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicRow from "../../components/dynamic row/dynamicRow";

function Statements() {
  const [payments, setPayments] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/payments")
      .then((res) => {
        setPayments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleStatementClick = (id) => {
  //   navigate(`statements/statementDetail/${id}`);
  // };

  const convertToNepalTime = (utcTimestamp) => {
    const utcDate = new Date(utcTimestamp);
    const options = { timeZone: "Asia/Kathmandu", timeZoneName: "short" };
    return utcDate.toDateString("en-US", options);
  };
  return (
    <>
      <Header />
      <Container style={{ marginTop: "10px" }}>
        <h5>All Statements</h5>
        <div className="row">
          {payments.map((payment) => (
            <DynamicRow
              key={payment._id}
              id={payment._id} //! Make sure that id is extracted to pas as url parameter
              className="col-12"
              name={payment.name}
              amount={payment.amount}
              paymentDate={convertToNepalTime(payment.paymentDate)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Statements;
