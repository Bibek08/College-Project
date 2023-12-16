import { useEffect, useState } from "react";
import axios from "axios";
const SeeDetails = () => {
  //! Initialize the data as an empty array
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("/payments")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error while fetching data", err);
      });
  }, []);

  return (
    <>
      <div className="card-list">
        {data.map((payment) => (
          <div className="card" key={payment._id}>
            <h2>Aadikavi Bhanubhakta Campus</h2>
            <p>{payment.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SeeDetails;
