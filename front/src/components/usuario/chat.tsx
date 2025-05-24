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
  id: number;
  textoMensaje: string;
  usuario: Usuario;
}

interface Usuario {
  id: number;
  usuario: string;
  imagen?: string | null;
}

interface Participante {
  usuario: Usuario;
}

interface Chat {
  id: number;
  participantes: Participante[];
}


interface Pelicula {
  nombre: string;
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
  const goToChats = () => {
    history("/chats");
  };
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); 
  };

  const toggleLike = (index: number) => {
    setLikedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };



  const [showModal, setShowModal] = useState(false);
const [usuariosDisponibles, setUsuariosDisponibles] = useState<Usuario[]>([]);
const [usuario, setUsuario] = useState<Usuario | null>(null);

const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedChat, setSelectedChat] = useState<any | null>(null);

const [chats, setChats] = useState<any[]>([]);

const [chatSeleccionado, setChatSeleccionado] = useState<Chat | null>(null);
const [mensajes, setMensajes] = useState<Mensaje[]>([]);
const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [showPeliDropdown, setShowPeliDropdown] = useState(false);

//Traer usuario del login
useEffect(() => {
  const storedUser = sessionStorage.getItem("usuario");
  if (storedUser) {
    setUsuario(JSON.parse(storedUser));
  }
}, []);




  useEffect(() => {
    fetch('/api/peliculas')
      .then((res) => res.json())
      .then((data) => setPeliculas(data));
  }, []);


  //Llamar endpoints del backend para traer usuarios y chats
      useEffect(() => {
  if (!usuario?.id) return;

  fetch(`/usuarios-disponibles/${usuario.id}`)
    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        console.error("Error usuarios:", text);
        throw new Error("Respuesta no válida");
      }
      return res.json();
    })
    .then(data => setUsuariosDisponibles(data))
    .catch(err => console.error("Error en usuarios disponibles:", err));

  fetch(`/chats-usuario/${usuario.id}`)
    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        console.error("Error chats:", text);
        throw new Error("Respuesta no válida");
      }
      return res.json();
    })
.then(data => {
  const chats = data as {
    participantes: { usuario: { usuario: string; imagen: string } }[];
  }[];

  chats.forEach(chat => {
    chat.participantes.forEach(part => {
      console.log(`📸 Imagen del usuario ${part.usuario.usuario}:`, part.usuario.imagen);
    });
  });

  setChats(chats);
})
    .catch(err => console.error("Error en chats:", err));
}, [usuario]);



//Handle pa crear el chat
const handleCrearChat = () => {
 if (!usuario) {
    console.warn("No hay usuario logueado");
    return;
  }
  if (!selectedUser) {
    alert("Debes seleccionar un usuario para chatear.");
    return;
  }
  fetch('/crear-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario1: usuario.id,
      idUsuario2: parseInt(selectedUser)
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Chat creado:", data);
      setShowModal(false);

      goToChats(); 
    })
    
    .catch(err => {
      console.error("Error creando chat:", err);
      alert("Ocurrió un error al crear el chat.");
    });
};


const handleSeleccionarChat = async (chat: Chat) => {
    setSelectedChat(chat);
    try {
const res = await fetch(`/mensajes-chat/${chat.id}`);
        if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
        }
        const data = await res.json();
        setMensajes(data); 
    } catch (err) {
        console.error("Error cargando mensajes del chat:", err);
    }
    };


 const handleEnviar = async () => {
    if (!usuario) {
  console.error("No hay usuario logueado");
  return;
}

  if (!nuevoMensaje.trim() || !selectedChat) return;

  const payload = {
    chatId: selectedChat.id,
    usuarioId: usuario.id,
    textoMensaje: nuevoMensaje,
  };

  try {
    const res = await fetch("/enviar-mensaje", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const nuevoMsg = await res.json();
    setMensajes(prev => [...prev, nuevoMsg]);
    setNuevoMensaje("");
  } catch (err) {
    console.error("Error al enviar mensaje:", err);
  }
};

/*
  const handleMandarPelicula = () => {
    if (selectedMovie !== '') {
      setMensajes([...mensajes, { texto: selectedMovie, tipo: 'pelicula' }]);
      setSelectedMovie('');
      setShowPeliDropdown(false);
    }
  };
*/

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
  {chats.length > 0 && usuario ? (
    chats.map((chat: Chat) => {
      const otroParticipante = chat.participantes
        .map((p) => p.usuario)
        .find((u) => u.id !== usuario.id);

      if (!otroParticipante) {
        return null;
      }

      return (
        <ListGroup.Item
          key={chat.id}
          action
          active={selectedChat?.id === chat.id}
onClick={() => handleSeleccionarChat(chat)}
          className="d-flex align-items-center bg-dark text-white"
        >
          <img
  src="/default.png"
  alt="avatar"
  width={30}
  className="rounded-circle me-2"
/>

          <span>{otroParticipante.usuario}</span>
        </ListGroup.Item>
      );
    })
  ) : (
    <ListGroup.Item className="bg-dark text-white">
      No hay chats existentes
    </ListGroup.Item>
  )}
</ListGroup>




      </div>

      {/* Chat principal */}
      <div className="chat-main p-3 flex-grow-1 d-flex flex-column">
        <div className="chat-messages flex-grow-1 p-2 rounded">
            {usuario && mensajes.map((msg: Mensaje, i: number) => (
                <div
                    key={msg.id || i}
                    className={`mensaje ${msg.usuario.id === usuario.id ? "mio" : "otro"}`}
                >
                    <div className="autor">
                    <img
  src="/default.png"
  alt="avatar"
  width={30}
  className="rounded-circle me-2"
/>

                    <strong>{msg.usuario.usuario}</strong>
                    </div>
                    <div>{msg.textoMensaje}</div>
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
                {usuariosDisponibles
                .filter((user) => user.id !== usuario?.id) 
                .map((user, index) => (
                    <option key={index} value={user.id.toString()}>
                    {user.usuario}
                    </option>
                ))}
            </Form.Select>
            </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
         <Button variant="primary" onClick={handleCrearChat}>
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
