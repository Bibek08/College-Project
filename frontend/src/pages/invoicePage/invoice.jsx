import Header from "../../components/header/header";
import { Container } from "react-bootstrap";
const Invoice = () => {
  return (
    <>
      <Header />
      <Container>
        <div
          style={{ backgroundColor: " red ", borderRadius: "0px 0px 5px 5px" }}
        >
          Aadikavi Bhanubhakta Campus
        </div>
      </Container>
    </>
  );
};

export default Invoice;
