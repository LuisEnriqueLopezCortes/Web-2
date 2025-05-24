import React, { useState, useEffect } from 'react';
import {
  ListGroup,
  InputGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import "../../css/navbar.css";

import '../../css/chat.css';


import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import "../../css/navbar.css";
import "../../css/publicacion.css";
import { Login } from "../usuario/login";
import { Registro } from "../usuario/registro";
import { Perfil } from "../usuario/perfil";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export const ChatsComponent = () => {

    interface Mensaje {
  texto: string;
  tipo: 'texto' | 'pelicula';
}

interface Usuario {
  nombre: string;
  // agrega más campos si los hay
}

interface Pelicula {
  nombre: string;
  // agrega más campos si los hay
}

const maxLength = 175;
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const history = useNavigate();

  const goToHome = () => {
    history("/");
  };
  const goToPelicula = () => {
    history("/peliculas");
  };
  const goToPublicaciones = () => {
    history("/publicaciones");
  };
  const goToResenia = () => {
    history("/resenias");
  };
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); // Alterna el estado del menú
  };

  const toggleLike = (index: number) => {
    setLikedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };



  const [showModal, setShowModal] = useState(false);
const [usuarios, setUsuarios] = useState<Usuario[]>([]);
const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [showPeliDropdown, setShowPeliDropdown] = useState(false);

  useEffect(() => {
    fetch('/api/usuarios')
      .then((res) => res.json())
      .then((data) => setUsuarios(data));

    fetch('/api/peliculas')
      .then((res) => res.json())
      .then((data) => setPeliculas(data));
  }, []);

  const handleEnviar = () => {
    if (nuevoMensaje.trim() !== '') {
      setMensajes([...mensajes, { texto: nuevoMensaje, tipo: 'texto' }]);
      setNuevoMensaje('');
    }
  };

  const handleMandarPelicula = () => {
    if (selectedMovie !== '') {
      setMensajes([...mensajes, { texto: selectedMovie, tipo: 'pelicula' }]);
      setSelectedMovie('');
      setShowPeliDropdown(false);
    }
  };

  return (
    <>
    <Navbar variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">MovieBox</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={goToHome}>Inicio</Nav.Link>
              <Nav.Link onClick={() => setShowRegister(true)}>
                Registro
              </Nav.Link>
              <Nav.Link onClick={goToPelicula}>Peliculas</Nav.Link>
              <Nav.Link onClick={goToResenia}>Reseñas</Nav.Link>
              <Nav.Link>Chat</Nav.Link>
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
                <Link
                  to="/publicaciones"
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
    <div className="chat-container d-flex">
      {/* Sidebar */}
      <div className="chat-sidebar bg-dark text-white p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Chats</h5>
          <Button variant="light" size="sm" onClick={() => setShowModal(true)}>
            Crear nuevo chat
          </Button>
        </div>
        <ListGroup variant="flush">
          <ListGroup.Item className="bg-dark text-white">Chat 1</ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">Chat 2</ListGroup.Item>
        </ListGroup>
      </div>

      {/* Chat principal */}
      <div className="chat-main p-3 flex-grow-1 d-flex flex-column">
        <div className="chat-messages flex-grow-1 p-2 rounded">
          {mensajes.map((msg, i) => (
            <div key={i} className={`mensaje ${msg.tipo}`}>
              {msg.tipo === 'texto' ? msg.texto : <strong>🎬 {msg.texto}</strong>}
            </div>
          ))}
        </div>
        <div className="chat-input mt-2 d-flex gap-2">
          <Form.Control
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <Button variant="primary" onClick={handleEnviar}>
            Enviar
          </Button>
          <Button variant="secondary" onClick={() => setShowPeliDropdown(!showPeliDropdown)}>
            Mandar Película
          </Button>
        </div>
        {showPeliDropdown && (
          <Form.Select
            className="mt-2"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            <option value="">Selecciona una película</option>
            {peliculas.map((peli, index) => (
              <option key={index} value={peli.nombre}>
                {peli.nombre}
              </option>
            ))}
          </Form.Select>
        )}
        {selectedMovie && (
          <Button variant="success" className="mt-2" onClick={handleMandarPelicula}>
            Confirmar envío
          </Button>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUsuarios">
            <Form.Label>Seleccionar Usuario</Form.Label>
            <Form.Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Selecciona un usuario</option>
              {usuarios.map((user, index) => (
                <option key={index} value={user.nombre}>
                  {user.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Crear Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
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
