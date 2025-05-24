import { PrismaClient } from "@prisma/client";

import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

// Obtener un solo usuario por ID
export async function get_single_user(user_id) {
    return await prisma.user.findUnique({
        where: { id: parseInt(user_id) }
    });
}

// Obtener todos los usuarios
export async function get_multiple_users() {
    return await prisma.user.findMany();
}

// Login

export async function user_login(user, password) {
  const usuario = await prisma.user.findFirst({
    where: { usuario: user }, 
  });

  if (!usuario) return null;

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) return null;

  return usuario;
}


export async function user_register(nombre, apellidos, fechaNacimiento, email, imagen, peliculaFavorita, usuario, password) {
  try {
    // Verificar si el usuario o email ya existen
    const existente = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { usuario }
        ]
      }
    });

    if (existente) return null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.user.create({
      data: {
        nombre,
        apellidos,
        fechaNacimiento: new Date(fechaNacimiento), 
        email,
        imagen,
        peliculaFavorita,
        usuario,
        password: hashedPassword,
        tipo: "usuario",
        conectado: true,
      }
    });

    return nuevoUsuario;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return null;
  }
}

export const logout_User = async (req, res) => {
  try {
    const { id } = req.body; 

    await prisma.user.update({
      where: { id: Number(id) },
      data: { estado: false },
    });

    res.status(200).json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ error: "Error al cerrar sesión." });
  }
};

// Eliminar usuario por ID
export async function delete_user(user_id) {
    try {
        await prisma.user.delete({
            where: { id: parseInt(user_id) }
        });
        return true;
    } catch (error) {
        return false;
    }
}

// Actualizar contraseña (email en prueba)
export async function update_user_password(user_id, new_password) {
  try {
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await prisma.user.update({
      where: { id: parseInt(user_id) },
      data: { password: hashedPassword },
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Películas favoritas 
export async function get_favorita() {
    return await prisma.pelicula.findMany({
        where: { favorita: true },
        select: {
            id: true,
            nombre: true,
            imagen: true
        }
    });
}

// Obtener todas las películas
export async function get_peliculas() {
    return await prisma.pelicula.findMany();
}

// Obtener géneros distintos de películas
export async function get_generos() {
    const generos = await prisma.pelicula.findMany({
        select: { genero: true },
        distinct: ["genero"]
    });
    return generos.map((g, i) => ({ id_genero: i + 1, generop: g.genero }));
}

// Registrar una nueva película
export async function registro_pelicula(pelicula) {
  try {
    const nueva = await prisma.pelicula.create({
      data: {
        imagen: pelicula.imagen,
        titulo: pelicula.titulo,
        descripcion: pelicula.descripcion,
        duracion: pelicula.duracion,
        fechaestreno: parseInt(pelicula.fechaestreno),
        genero: pelicula.genero,
        actores: pelicula.actores,
        valoracion: parseInt(pelicula.valoracion),
      },
    });
    return nueva;
  } catch (error) {
    console.error("Error al registrar película:", error);
    return null;
  }
}


//Para traer usuarios disponibles pa chat
export async function get_usuarios_disponibles(idUsuario) {
    const usuarioId = parseInt(idUsuario);

    const chats = await prisma.chat.findMany({
        where: {
            participantes: {
                some: {
                    usuarioId: usuarioId,
                },
            },
        },
        include: {
            participantes: true,
        },
    });

const idsBloqueados = new Set();
    chats.forEach(chat => {
        chat.participantes.forEach(p => {
            if (p.usuarioId !== usuarioId) {
                idsBloqueados.add(p.usuarioId);
            }
        });
    });

    idsBloqueados.add(usuarioId);

    const disponibles = await prisma.user.findMany({
        where: {
            id: { notIn: Array.from(idsBloqueados) },
        },
        select: {
            id: true,
            usuario: true,
            imagen: true,
        },
    });

    return disponibles;
}


//Pa Traer los chats del usuario
export async function get_chats_usuario(idUsuario) {
  const usuarioId = parseInt(idUsuario);

  const chats = await prisma.chat.findMany({
    where: {
      participantes: { some: { usuarioId } },
    },
    include: {
      participantes: {
        include: {
          usuario: {
            select: {
              id: true,
              usuario: true,
              imagen: true,
            },
          },
        },
      },
      mensajes: true,
    },
  });

  const resultado = chats.map(chat => ({
    ...chat,
    participantes: chat.participantes.map(p => ({
      ...p,
      usuario: {
        ...p.usuario,
        imagen:
          p.usuario.imagen
            ? `data:image/png;base64,${p.usuario.imagen.toString('base64')}`
            : null,
      },
    })),
  }));

  return resultado;
}


//ahora si crea chats xd
export async function crear_chat(req, res) {
    const { idUsuario1, idUsuario2 } = req.body;

    if (!idUsuario1 || !idUsuario2 || idUsuario1 === idUsuario2) {
        return res.status(400).json({ error: "IDs inválidos o iguales" });
    }

    try {
        const nuevoChat = await prisma.chat.create({
            data: {
                participantes: {
                    create: [
                        { usuario: { connect: { id: idUsuario1 } } },
                        { usuario: { connect: { id: idUsuario2 } } }
                    ]
                }
            },
            include: {
                participantes: {
                    include: {
                        usuario: {
                            select: { id: true, usuario: true, imagen: true }
                        }
                    }
                }
            }
        });

        return res.status(201).json(nuevoChat);
    } catch (error) {
        console.error("Error al crear el chat:", error);
        return res.status(500).json({ error: "No se pudo crear el chat" });
    }
}


//Para la parte d emensajes

export async function get_mensajes_chat(idChat) {
  const chatId = parseInt(idChat);

  const mensajes = await prisma.mensaje.findMany({
    where: { chatId },
    orderBy: { horaFecha: "asc" }, 
    include: {
      usuario: {
        select: {
          id: true,
          usuario: true,
          imagen: true
        }
      }
    }
  });

  const resultado = mensajes.map(mensaje => ({
    ...mensaje,
    usuario: {
      ...mensaje.usuario,
      imagen: mensaje.usuario.imagen
        ? `data:image/png;base64,${mensaje.usuario.imagen.toString('base64')}`
        : null
    }
  }));

  return resultado;
}

export async function crear_mensaje(req, res) {
  const { chatId, usuarioId, textoMensaje } = req.body;

  if (!chatId || !usuarioId || !textoMensaje?.trim()) {
    return res.status(400).json({ error: "Datos faltantes o inválidos" });
  }

  try {
    const nuevoMensaje = await prisma.mensaje.create({
      data: {
       chatId,
     usuarioId,
        textoMensaje
      },
      include: {
        usuario: {
          select: {
        id: true,
            usuario: true,
            imagen: true
       }
        }
      }
    });

    nuevoMensaje.usuario.imagen = nuevoMensaje.usuario.imagen
      ? `data:image/png;base64,${nuevoMensaje.usuario.imagen.toString("base64")}`
      : null;

    res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.error("Error al crear el mensaje:", error);
    res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
}
