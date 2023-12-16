import { useNavigate } from "react-router-dom";
import ImageFront from "../../assets/Imagefront.jpg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../userRoleContext";

const Login = () => {
  const { updatedUserRole } = useUserContext();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth", {
        ...formData,
      });

      if (response && response.data) {
        const { success, message, role } = response.data;
        console.log(response.data);
        if (success && message && role) {
          await updatedUserRole(String(role));
          handleSuccess(message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          handleError(message);
        }
      } else {
        handleError("Invalide response from the server");
      }
    } catch (err) {
      console.error(err);
      handleError("An error occured while logging in ");
    }
    setFormData({
      ...formData,
    });
  };

  return (
    <div>
      <div className="login-template d-flex justify-content-center align-items-center">
        <div className="container p-5">
          <div className="row">
            <div className="col-md-6 rowpad">
              <div className="image-container image-animation">
                <img src={ImageFront} alt="front img" className="front-img" />
              </div>
            </div>
            <div className="col-md-6 rowpad">
              <div className="form-container p-1 rounded-end bg-white  ">
                <form>
                  <h3 className="text-center mb-5 text-black">Login Here</h3>
                  <div className="mb-4 text-black">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className=" form-control text-black mb-4"
                      value={email}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="mb-5 text-black">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className=" form-control mb-5"
                      value={password}
                      onChange={handleOnChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="loginbutton"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                  {/* <Link to="/register" className="btn btn-outline-danger">
                    Register
                  </Link> */}
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
