import "./dynamicRow.css";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const DynamicRow = ({ id, name, amount, paymentDate }) => {
  return (
    <div className="row">
      <div className="box">
        <div className="name">{name}</div>
        <div className="amount">
          <div> Rs.{amount}</div>
          <div>{paymentDate}</div>
        </div>{" "}
        <div>
          <Link
            to={`/statements/statementDetails/${id}`}
            className="see-details"
          >
            {" "}
            See Details
          </Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default DynamicRow;
