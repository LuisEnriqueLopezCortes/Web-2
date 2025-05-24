import React, { useState } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import "../../css/login.css";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

      // Guardar ID y otros datos útiles en localStorage (opcional)
      localStorage.setItem("userId", data.id);
      localStorage.setItem("usuario", JSON.stringify(data));

      alert(`¡Sesión iniciada con éxito! ID: ${data.id}`);
      setError("");

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
      </Form>
    </Container>
  );
};
