import express from "express";
import cors from "cors";
import {
    get_single_user,
    user_login,
    user_register,
    get_multiple_users,
    delete_user,
    update_user_password,
    get_favorita,
    get_peliculas,
    get_generos,
    registro_pelicula,
    logout_User,
     get_usuarios_disponibles,
     get_chats_usuario,
     crear_chat,
      get_mensajes_chat, crear_mensaje 
} from "./Controllers/Controller.js";


const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"  
}));

function validateRegisterData(req, res, next) {
  const {
    nombre,
    apellidos,
    fechaNacimiento,
    email,
    usuario,
    password
  } = req.body;

  if (!nombre || !apellidos || !fechaNacimiento || !email || !usuario || !password) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados" });
  }

  if (isNaN(Date.parse(fechaNacimiento))) {
    return res.status(400).json({ error: "Fecha de nacimiento inválida" });
  }

  next(); 
}

//Logout
app.post('/logout', logout_User);

// Ruta de login
app.post("/login", async (req, res) => {
  console.log("Body recibido:", req.body);
  const { user, password } = req.body;
  const user_obj = await user_login(user, password);
  
  if (user_obj) {
    res.status(200).json(user_obj);
  } else {
    res.status(404).send("Usuario o contraseña incorrectos");
  }
});

//RegistraUsuarios
app.post("/register", validateRegisterData, async (req, res) => {
  const {
    nombre,
    apellidos,
    fechaNacimiento,
    email,
    imagen,
    peliculaFavorita,
    usuario,
    password
  } = req.body;

  const newUser = await user_register(
    nombre,
    apellidos,
    fechaNacimiento,
    email,
    imagen,
    peliculaFavorita,
    usuario,
    password
  );

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ error: "Usuario ya existe o error al registrar" });
  }
});



// Obtener todos los usuarios
app.get("/user", async (req, res) => {
    const users = await get_multiple_users();
    res.status(200).json(users);
});

// Obtener usuario específico por id
app.get("/user/:id", async (req, res) => {
    const user = await get_single_user(parseInt(req.params.id));
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

// Eliminar usuario
app.delete("/user/:id", async (req, res) => {
    const deleted = await delete_user(parseInt(req.params.id));
    if (deleted) {
        res.status(200).json({ mensaje: "Usuario eliminado" });
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

// Actualizar contraseña de usuario
app.put("/user/:id", async (req, res) => {
    const { new_password } = req.body;
    const updated = await update_user_password(parseInt(req.params.id), new_password);
    if (updated) {
        res.status(200).json({ mensaje: "Contraseña actualizada" });
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

// Obtener películas favoritas
app.get("/favorita", async (req, res) => {
    const favoritas = await get_favorita();
    res.status(200).json(favoritas);
});

// Obtener todas las películas
app.get("/peliculas", async (req, res) => {
    const peliculas = await get_peliculas();
    res.status(200).json(peliculas);
});

// Obtener todos los géneros de películas
app.get("/genero", async (req, res) => {
    const generos = await get_generos();
    res.status(200).json(generos);
});

// Registrar una nueva película
app.post("/registropelicula", async (req, res) => {
    const { titulo, genero, descripcion, imagen, duracion, fechaestreno, actores, valoracion } = req.body;

    if (!titulo || !genero || !descripcion || !imagen || !duracion || !fechaestreno || !actores || !valoracion) {
        res.status(400).send("Todos los campos son obligatorios");
    } else {
        const new_pelicula = await registro_pelicula({
            titulo,
            genero,
            descripcion,
            imagen,
            duracion,
            fechaestreno,
            actores,
            valoracion,
        });

        res.status(201).json(new_pelicula);
    }
});

//PARA CHATS
app.get("/usuarios-disponibles/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params;
    const usuarios = await get_usuarios_disponibles(idUsuario);
    res.status(200).json(usuarios);
});

app.get("/chats-usuario/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params;
    const chats = await get_chats_usuario(idUsuario);
    res.status(200).json(chats);
});

app.post("/crear-chat", crear_chat);

//Pa mandar mensasjes
app.get("/mensajes-chat/:idChat", async (req, res) => {
  const { idChat } = req.params;
  const mensajes = await get_mensajes_chat(idChat);
  res.status(200).json(mensajes);
});

app.post("/enviar-mensaje", crear_mensaje);



// Configurar el puerto
app.listen(4000, () => {
    console.log("Servidor levantado en el puerto 4000");
});


