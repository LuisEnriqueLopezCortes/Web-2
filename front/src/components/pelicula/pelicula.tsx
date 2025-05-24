import "../../css/resenia.css";
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal, Form } from "react-bootstrap";
import "../../css/navbar.css";
import "../../css/publicacion.css";
import { Login } from "../usuario/login";
import { Registro } from "../usuario/registro";
import { Perfil } from "../usuario/perfil";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const images = [
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%207.png",
    title: "Pelicula 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, inceptos ante ut tempor euismod in libero dapibus. Enim ultricies placerat molestie blandit mauris non ad ut vestibulum inceptos donec lacinia risus a quis.",
    fecha: "2020",
    fecha_alta_resenia: "7 DE MARZO",
    autor: "Jason Scott Lee",
    foto_perfil:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%207.png",
    comentarios: "135",
    likes: "1400",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
    title: "Pelicula 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, molestie massa vel mattis egestas nascetur ut. Sed turpis habitant ad purus elementum mi sapien cras vulputate, morbi vehicula feugiat auctor nunc quam proin litora primis, inceptos ante ut tempor euismod in.",
    fecha: "2020",
    fecha_alta_resenia: "7 DE MARZO",
    autor: "Jason Scott Lee",
    foto_perfil:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
    comentarios: "135",
    likes: "1400",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%203.png",
    title: "Pelicula 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, molestie massa vel mattis egestas nascetur ut.",
    fecha: "2020",
    fecha_alta_resenia: "7 DE MARZO",
    autor: "Jason Scott Lee",
    foto_perfil:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%203.png",
    comentarios: "135",
    likes: "1400",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%207.png",
    title: "Pelicula 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, inceptos ante ut tempor euismod in libero dapibus. Enim ultricies placerat molestie blandit mauris non ad ut vestibulum inceptos donec lacinia risus a quis.",
    fecha: "2020",
    fecha_alta_resenia: "7 DE MARZO",
    autor: "Jason Scott Lee",
    foto_perfil:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%207.png",
    comentarios: "135",
    likes: "1400",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
    title: "Pelicula 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, molestie massa vel mattis egestas nascetur ut. Sed turpis habitant ad purus elementum mi sapien cras vulputate, morbi vehicula feugiat auctor nunc quam proin litora primis, inceptos ante ut tempor euismod in.",
    fecha: "2020",
    fecha_alta_resenia: "7 DE MARZO",
    autor: "Jason Scott Lee",
    foto_perfil:
      "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
    comentarios: "135",
    likes: "1400",
    valoracion: "4",
  },
];

export const CardPelicula = () => {
  const maxLength = 175;
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const history = useNavigate();

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
    setIsOpen((prevState) => !prevState); // Alterna el estado del menú
  };

  const toggleLike = (index: number) => {
    setLikedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
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
      <div className="position-relative d-flex prueba">
        <div className="container d-flex justify-content-center">
          <div className="w-50">
            <div className="row row-cols-1 g-4">
              <div className="col texto-titulo-resenia">
                <div className="d-flex justify-content-between align-items-center text-white">
                  <h2>Peliculas</h2>
                </div>
              </div>
              {images.map((item, index) => (
                <div className="col card-container" key={index}>
                  <div className="card d-flex flex-row container-card-resenia">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="card-img-left card-img-resenia"
                    />
                    <div className="card-body d-flex flex-column text-white ">
                      <h4 className="card-title titulo-pelicula">
                        {item.title} | {item.fecha}
                      </h4>

                      <p className="parrafo-descripcion card-text">
                        {item.description.length > maxLength
                          ? `${item.description.slice(0, maxLength)}`
                          : item.description}
                        {item.description.length > maxLength && (
                          <button className="ver-mas-btn">Ver más...</button>
                        )}
                      </p>
                      <div className="d-flex align-items-center gap-2 mt-5 ms-auto">
                        <div className="d-flex align-items-center gap-1">
                          <i className="bi bi-chat-right-text-fill"></i>
                          <h5 className="card-title mb-0">
                            {item.comentarios}
                          </h5>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <i
                            className={`bi bi-heart-fill ${
                              likedItems[index] ? "text-danger" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleLike(index)}
                          ></i>
                          <h5 className="card-title mb-0">{item.likes}</h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3 resenia-info-usuario">
                        <img
                          src={item.foto_perfil}
                          className="img-perfil rounded-circle"
                          alt={item.autor}
                        />
                        <h5 className="card-title nombre-usuario m-0">
                          {item.autor}
                        </h5>
                        <div className="movie-stars">
                          {[...Array(4)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
