// import admin from "../assets/admin.png";
import Header from "../../components/header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import moment from "moment";
// import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const handleMyProfileClick = () => {
    //This will navigate to the MYProfile page.
    window.location.href = "/Profile";
  };
  const handleFeeStructureClick = () => {
    // This will navigate to the Fee Structure page.
    window.location.href = "/FeeStructure";
  };

  // const handleCalendarClick = () => {
  //   // This will navigate to the Calendar page.
  //   window.location.href = "/Calendar";
  // };

  //   const currentDate = moment().format("MMMM Do, YYYY"); // Get the current date using moment.js

  //for bardiagram below.............................................
  // const chartData = {
  //   labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
  //   datasets: [
  //     {
  //       label: "Chart Data",
  //       data: [20, 40, 30, 10, 50], // Example data for the chart
  //       backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
  //       borderColor: "rgba(75, 192, 192, 1)", // Border color
  //       borderWidth: 1, // Border width
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (
    <>
      {/*..............top nav bars................*/}
      <div className="top-nav">
        <Header />
      </div>
      {/*...............Rest of the content...........*/}
      <div>
        <div
          className="container d-flex justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <div className="row ">
            <div className="col-md-4 d-flex justify-content-around">
              <button
                className=" p-4 rounded fs-4 text-white "
                style={{
                  backgroundColor: "#14A888",
                  marginRight: "30px",
                  borderStyle: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleMyProfileClick}
              >
                <FaIcons.FaUserGraduate style={{ marginRight: "5px" }} />
                My Profile
              </button>
            </div>
            <div className="col-md-4 d-flex justify-content-around">
              <button
                className="p-4 rounded fs-4 text-white "
                style={{
                  backgroundColor: "#0091E6",
                  borderStyle: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleFeeStructureClick}
              >
                <AiIcons.AiOutlineTable style={{ marginRight: "5px" }} />
                Fee Structure
              </button>
            </div>
            {/* <div className="col-md-4 d-flex justify-content-around">
              <button
                className="p-4 rounded fs-4 text-white "
                style={{
                  backgroundColor: "#9768D9",
                  borderStyle: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleCalendarClick}
              >
                <FaIcons.FaRegCalendarAlt style={{ marginRight: "10px" }} />
                Calendar - {currentDate}
              </button>
            </div> */}
          </div>
        </div>

        {/* <div className="bardiagram"> 
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div> */}
      </div>
    </>
  );
};
export default Dashboard;
