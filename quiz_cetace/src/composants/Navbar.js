import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import monLogo from '../images/monLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function BarNavigation() {
  return (
    <>
      <Navbar className='navBar-perso fixed-top' expand="lg">
        <Container>
          <Navbar.Brand href="www.instagram.com/zitraaf/#" className="text-light">
            <img
              src={monLogo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Logo de QuizCétacé"
              
            />
            
          </Navbar.Brand>     
          <Navbar.Text className="text-light">
            <p>&copy; 2025 IvanKenfack {' '}
               <a href="https://www.linkedin.com/in/ivan-kenfack-425392221/" target="_blank" rel="noopener noreferrer">
               <FontAwesomeIcon  icon={faLinkedin} color="#0b77e4" />
              </a>
              <a href="https://github.com/IvanKenfack/" target="_blank" rel="noopener noreferrer">
               <FontAwesomeIcon icon={faGithub} color="#0b77e4"/>
              </a>
            </p>

          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}

export default BarNavigation;