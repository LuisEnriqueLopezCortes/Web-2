import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import "../../css/perfil.css";

export const Perfil = () => {
  const [usuario, setUsuario] = useState({
    nombre: "María López Ruíz",
    edad: 26,
    peli: "Coraline",
    email: "maria@example.com",
    imagen: "https://i.pravatar.cc/40",
    usuario: "userExample",
  });

  return (
    <>
      <Container className="perfil-container">
        <div className="perfil-encabezado text-center">
          <h2 className="titulo-perfil">Mi Perfil</h2>
        </div>
        <Card className="datos-perfil px-5">
          <div className="imagen-perfil-container text-center">
            <Image
              src={usuario.imagen}
              alt="Imagen de perfil"
              roundedCircle
              className="img-perfil-container"
            />
          </div>

          <Card.Body className="datos-usuario">
            <h4>Usuario: {usuario.usuario}</h4>
            <p>Nombre: {usuario.nombre}</p>
            <p>Edad: {usuario.edad}</p>
            <p>Email: {usuario.email}</p>
            <p>Pelicula favorita: {usuario.peli}</p>
          </Card.Body>
        </Card>
        <div className="btn-container-perfil pt-4">
          <Button variant="primary" type="submit" className="btn-login w-100">
            Editar datos
          </Button>
        </div>
      </Container>
    </>
  );
};
