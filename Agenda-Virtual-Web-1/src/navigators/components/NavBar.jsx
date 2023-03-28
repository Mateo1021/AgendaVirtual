import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth';

export const NavBar = () => {

  const navigate = useNavigate() 

  const { logout } = useContext( AuthContext );

  const onLogut = () =>{
    logout();
    navigate('/login',{replace: true})
  }

  return (
    <>
    {[false].map((expand) => (
      <Navbar className='navbar' key={expand} bg="light" expand={expand} >
        <Container fluid>
          <Navbar.Brand href="/home">Inicio</Navbar.Brand>
          <Navbar.Brand href="/curso/iniCurso">Curso</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Agenda Virtual FEARC
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/home">Inicio</Nav.Link>
                <Nav.Link href="/curso/iniCurso">Curso</Nav.Link>
                <Nav.Link href="/login" onClick={onLogut}>Salir</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>
  )
}
