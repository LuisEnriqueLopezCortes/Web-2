import { useState } from "react";
import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import "../../css/navbar.css";
import { Login } from "../usuario/login";
import { Registro } from "../usuario/registro";
import { Perfil } from "../usuario/perfil";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

interface MyNavbarProps {
  homeRef: React.RefObject<HTMLDivElement | null>;
}

export const MyNavbar = ({ homeRef }: MyNavbarProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const history = useNavigate();

  const goToPublicaciones = () => {
    history('/publicaciones');
  };
  const goToPelicula = () => {
    history("/peliculas");
  };
  const goToResenia = () => {
    history("/resenias");
  };

   const goToChats = () => {
    history("/chats");
  };

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState); // Alterna el estado del menú
  };

  const scrollToHome = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    {location.pathname === "/" && (
      <div className="header-container-navbar">
        <Navbar variant="dark" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">MovieBox</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link onClick={() => setShowLogin(true)}>Inicio</Nav.Link>
                <Nav.Link onClick={() => setShowRegister(true)}>
                  Registro
                </Nav.Link>
                <Nav.Link onClick={goToPelicula}>Peliculas</Nav.Link>
                <Nav.Link onClick={goToResenia}>Reseñas</Nav.Link>
                <Nav.Link onClick={goToChats}>Chat</Nav.Link>
              </Nav>
              <Form className="d-flex ms-3">
                <Form.Control
                  type="search"
                  placeholder="Buscar..."
                  className="me-2"
                  aria-label="Buscar"
                />
                <Button variant="outline-light">
                  <i className="bi bi-search" />
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
          <div className="profile-dropdown-navbar">
            <div className="profile-dropdown-container" tabIndex={0}>
              <button onClick={toggleMenu} className="profile-dropdown-toggle">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Perfil"
                  className="rounded-circle profile-img"
                />
              </button>

              {isOpen && (
                <div className="profile-dropdown-menu">
                  <a
                    className="profile-dropdown-item"
                    onClick={() => setShowPerfil(true)}
                  >
                    <i className="bi bi-person"></i>&nbsp; Perfil
                  </a>
                  <Link to='/publicaciones'
                    className="profile-dropdown-item"
                    onClick={goToPublicaciones}
                  >
                    <i className="bi bi-layout-text-sidebar-reverse"></i>&nbsp;
                    Mis reseñas
                  </Link>
                  <a className="profile-dropdown-item">
                    <i className="bi bi-box-arrow-left"></i>&nbsp; Cerrar sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        </Navbar>

        <section className="titles">
          <h1>MovieBox</h1>
          <p>
            Las películas son historias que nos acompañan para siempre.
            Encuentra las tuyas aquí.
          </p>
        </section>

        <div className="section-icon aboutme" data-anchor="aboutme">
          <i className="bi bi-caret-down-fill" onClick={scrollToHome} />
        </div>
      </div>
)}
      <Modal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        centered
        className="custom-modal-login"
      >
        <Login />
      </Modal>
      <Modal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        centered
        className="custom-modal-registro"
      >
        <Registro />
      </Modal>

      <Modal
        show={showPerfil}
        onHide={() => setShowPerfil(false)}
        centered
        className="custom-modal-registro"
      >
        <Perfil />
      </Modal>
    </>
  );
};
