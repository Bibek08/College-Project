import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    axios.post("/logout");
    setTimeout(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <Header />
      <Button onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default Logout;
