import React, { useState } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import "../../css/registro.css";

export const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [imagen, setImagen] = useState(""); // Para ahora, solo URL o nombre
  const [peliculaFavorita, setPeliculaFavorita] = useState("");
  const [usuario, setUsuario] = useState("");
  const [error, setError] = useState("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(URL.createObjectURL(file)); // Guarda una URL local para previsualización
      // O también podés hacer esto si solo querés el nombre:
      // setImagen(file.name);
    }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  if (!email || !password || !nombre || !apellidos || !fechaNacimiento || !usuario) {
    setError("Por favor, complete todos los campos.");
    return;
  }

  setError("");

  const body = {
    nombre,
    apellidos,
    fechaNacimiento,
    email,
    imagen, // puede ser el nombre o la URL, como lo estás usando ahora
    peliculaFavorita,
    usuario,
    password,
  };

  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      alert("¡Usuario registrado con éxito!");
      // podés redirigir o limpiar campos aquí
    } else {
      setError(data.error || "Error al registrar");
    }
  } catch (error) {
    setError("Error de conexión con el servidor");
  }
};

  return (
    <>
      <Container className="registro-container">
        <div className="iconregistro">
          <i className="bi bi-person-circle"></i>
        </div>
        <h2 className="text-center text-white h2-registro">
          Registrar usuario
        </h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <Form className="container-form-registro" onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3 input-box">
            <InputGroup>
              <span className="input-icon-registro">
                <i className="bi bi-person-fill"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} 
                />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3 input-box">
            <InputGroup>
              <span className="input-icon-registro">
                <i className="bi bi-person-fill"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)} 
                />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formDate" className="mb-3 input-box">
            <InputGroup>
              <span className="input-icon-registro">
                <i className="bi bi-cake2-fill"></i>
              </span>
              <Form.Control
                type="date"
                placeholder="FechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)} 
                />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3 input-box">
            <InputGroup>
              <span className="input-icon-registro">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <Form.Control
                type="email"
                placeholder="Correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3 input-box">
          <InputGroup>
          <span className="input-icon-registro">
          <i className="bi bi-file-earmark-image"></i>
          </span>
          <div className="form-control d-flex align-items-center justify-content-between bg-white position-relative">
          <span className="text-muted">
            {imagen ? "Imagen seleccionada" : "Foto de perfil"}
            </span>
          <Form.Control
            type="file"
            accept="image/*"
            className="position-absolute opacity-0"
            aria-label="Foto de perfil"
            onChange={handleImageChange}
          />
        </div>
      </InputGroup>

          {imagen && (
          <div className="mt-2 text-center">
            <img
              src={imagen}
              alt="Vista previa"
              style={{ maxHeight: "150px", objectFit: "contain" }}
                />
          </div>
            )}
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3 input-box">
            <InputGroup>
              <span className="input-icon-registro">
                <i className="bi bi-film"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Pelicula Favorita"
                value={peliculaFavorita}
                onChange={(e) => setPeliculaFavorita(e.target.value)} 
                />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3 input-box">
            <InputGroup>
              <span className="input-icon-registro">
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

          <Form.Group
            controlId="formPassword"
            className="mb-4 input-box-registro"
          >
            <InputGroup>
              <span className="input-icon-registro">
                <i className="bi bi-lock-fill"></i>
              </span>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-icon-registro toggle-password">
                <i className="bi bi-eye-slash-fill"></i>
              </span>
            </InputGroup>
          </Form.Group>

          <div className="form-button-container">
            <Button
              variant="primary"
              type="submit"
              className="btn-registro w-75"
            >
              Guardar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};
