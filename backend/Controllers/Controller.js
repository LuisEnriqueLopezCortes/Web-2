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
        fechaNacimiento: new Date(fechaNacimiento), // Convierte string 'YYYY-MM-DD' a Date
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
    const { id } = req.body; // recibe el ID del usuario que cerró sesión

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

// Películas favoritas (se asume un campo "favorita")
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