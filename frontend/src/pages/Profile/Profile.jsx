import React from "react";
import Header from "../../components/header/header";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Bibek from "../../assets/Bibek.png";
import "../Profile/profile.css";
function Profile() {
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "10px" }}>
        <div className="row">
          <div className="col-md-3">
            <div className="row">
              <div className="profile-img-container">
                <img src={Bibek} alt="bibek" className="profile-img" />
                <h5>User Name</h5>
                <i>Admin</i>
                <br />
                <i>of PayEase System</i>
                <div style={{ marginBottom: "10px" }}>
                  <button className="follow-btn">Follow</button>
                  <button className="message-btn">Message</button>
                </div>
                <div></div>
              </div>
              <div className="profile-links" style={{ fontSize: "30px" }}>
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>
          </div>
          
          <div className="col-md-9" >
         <div className="profile-details">
<label htmlFor="">Bibek</label>
         </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
