import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import monLogo from './images/monLogo.svg';

function BrandExample() {
  return (
    <>
      <Navbar className="bg-body-secondary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={monLogo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt=""
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;