import logo from './monLogo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



// const barNavigation = () => {
//   return (
//     <>
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">Brand link</Navbar.Brand>
//         </Container>
//       </Navbar>
//       <br />
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand>Brand text</Navbar.Brand>
//         </Container>
//       </Navbar>
//       <br />
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">
//             <img
//               src="/img/logo.svg"
//               width="30"
//               height="30"
//               className="d-inline-block align-top"
//               alt="React Bootstrap logo"
//             />
//           </Navbar.Brand>
//         </Container>
//       </Navbar>
//       <br />
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">
//             <img
//               alt=""
//               src="/img/logo.svg"
//               width="30"
//               height="30"
//               className="d-inline-block align-top"
//             />{' '}
//             React Bootstrap
//           </Navbar.Brand>
//         </Container>
//       </Navbar>
//     </>
//   );
// }




function App() {
  return (
    <>
    <Navbar />
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <Navbar />
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
