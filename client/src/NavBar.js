import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function NavBar() {

  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete("/api/v1/logout")
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error(`No way bruch ${error}`)
    }
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">Posts-Comments</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          { user ? 
          <Nav>
            <NavDropdown title={user.username} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          : null }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;