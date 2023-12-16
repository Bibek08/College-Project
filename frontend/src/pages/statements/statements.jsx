import { Container } from "react-bootstrap";
import Header from "../../components/header/header";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicRow from "../../components/dynamic row/dynamicRow";

function Statements() {
  const [payments, setPayments] = useState([]);
  //   const navigate = useNavigate();

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

// import React from "react";

// const Statements = () => {
//   return (
//     <div>
//       <Header />

//  <Table>
//         <thead>
//           <tr>
//             <tbody>
//               {payments.map((payment) => (
//                 <tr key={payment._id} className="text-center">
//                   <td>{payment.name}</td>
//                   <td>{payment.amount}</td>
//                   <td>{payment.paymentDate}</td>
//                   <td>
//                     <a href="/view">See details</a>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </tr>
//         </thead>
//       </Table>

//     </div>
//   );
// };

// export default Statements;
