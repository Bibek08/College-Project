import "./dynamicRow.css";
// eslint-disable-next-line react/prop-types
const DynamicRow = ({ name, amount, paymentDate }) => {
  return (
    <div className="row">
      <div className="box">
        <div className="name">{name}</div>
        <div className="amount">
          <div>{amount}</div>
          <div>{paymentDate}</div>
        </div>{" "}
        <div>
          <a href="/seeDetails" className="see-details">
            {" "}
            See Details
          </a>
        </div>
      </div>{" "}
    </div>
  );
};

export default DynamicRow;
