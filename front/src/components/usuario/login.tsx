import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Modal, InputGroup } from "react-bootstrap";
import "../../css/login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // ajusta la ruta si es necesario
import { Registro } from "../usuario/registro";


export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();
    const [showRegister, setShowRegister] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

    if (!usuario || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: usuario, password })
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const data = await response.json();
      console.log("Usuario autenticado:", data);

      // Guardar ID y otros datos útiles en localStorage
      sessionStorage.setItem("userId", data.id);
      sessionStorage.setItem("usuario", JSON.stringify({ ...data, estado: true }));
      setUser(data);


      alert(`¡Sesión iniciada con éxito! ID: ${data.id}`);
      setError("");

      navigate("/");

      // Aquí podrías redirigir o cambiar de vista
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <Container className="login-container">
      <div className="iconLogin">
        <i className="bi bi-person-circle"></i>
      </div>
      <h2 className="text-center text-white h2-login">Iniciar sesión</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <Form className="container-form-login" onSubmit={handleSubmit}>
        <Form.Group controlId="formUsuario" className="mb-3 input-box">
          <InputGroup>
            <span className="input-icon-login">
              <i className="bi bi-person-fill"></i>
            </span>
            <Form.Control
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-4 input-box-login">
          <InputGroup>
            <span className="input-icon-login">
              <i className="bi bi-lock-fill"></i>
            </span>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-icon-login toggle-password">
              <i className="bi bi-eye-slash-fill"></i>
            </span>
          </InputGroup>
        </Form.Group>

        <div className="form-button-container">
          <Button variant="primary" type="submit" className="btn-login w-75">
            Iniciar sesión
          </Button>

          
        </div>
        <div className="text-center mt-3">
  <Button variant="link" onClick={() => setShowRegister(true)} className="text-white">
    ¿No tienes cuenta? Regístrate aquí
  </Button>
</div>

      </Form>
       <Modal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        centered
        className="custom-modal-registro"
      >
        <Registro />
      </Modal>
    </Container>
    
  );
};