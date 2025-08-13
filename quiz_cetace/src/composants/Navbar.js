import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import monLogo from '../images/monLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';

function BarNavigation() {
  return (
    <>
      <Navbar className="bg-body-secondary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={monLogo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
            {' '}QuizCétacé
          </Navbar.Brand>     
          <Navbar.Text>
            <p>&copy; 2025 IvanKenfack {' '}
               <a href="https://www.linkedin.com/in/ivan-kenfack-425392221/" target="_blank" rel="noopener noreferrer">
               <FontAwesomeIcon  icon={faLinkedin} size="1x" color="#0A66C2" />
              </a>
            </p>

          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}

export default BarNavigation;