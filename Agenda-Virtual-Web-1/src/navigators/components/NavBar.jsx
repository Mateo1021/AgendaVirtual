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
import Logo from '../../images/logoShort.png';

export const NavBar = () => {

  const navigate = useNavigate()

  const { logout } = useContext(AuthContext);

  const onLogut = () => {
    logout();
    navigate('/login')
  }


  const goCurso = () => {
    navigate('/curso/iniCurso')
  }
  const goHome = () => {

    navigate('/home')
  }
  return (
    <>
      {[false].map((expand) => (
        <Navbar style={{ backgroundColor: '#492013' }} className='navbar' variant={'dark'} key={expand} expand={expand} >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100% ', marginLeft: 10, marginRight: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end' }} >
              <div>
                <a href="#">
                  <img src={Logo} width="80" height="60" alt="" />
                </a>
              </div>
              <div style={{ marginLeft: 20, marginBottom: 10 }}>
                <Navbar.Brand onClick={goHome} style={{ color: 'white' }}>Inicio</Navbar.Brand>
                <Navbar.Brand onClick={goCurso} style={{ color: 'white' }}>Cursos</Navbar.Brand>
              </div>
            </div>
            <div>

              <Navbar.Toggle style={{ content: 'white' }} aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
                    <Nav.Link onClick={goHome}>Inicio</Nav.Link>
                    <Nav.Link onClick={goCurso}>Curso</Nav.Link>
                    <Nav.Link href="/login" onClick={onLogut}>Salir</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </div>



        </Navbar>
      ))}
    </>
  )
}
