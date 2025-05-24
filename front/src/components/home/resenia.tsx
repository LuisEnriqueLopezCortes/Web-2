import "../../css/resenia.css";
import React, { useState } from "react";

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

export const CardGrid = () => {
  const maxLength = 175;
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});

  const toggleLike = (index: number) => {
    setLikedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
      <div className="position-relative d-flex">
        <div className="container d-flex justify-content-center">
          <div className="w-50">
            <div className="row row-cols-1 g-4">
              <div className="col texto-titulo-resenia">
                <div className="d-flex justify-content-between align-items-center text-white">
                  <h2>Reseñas recientes</h2>
                  <h6>Más..</h6>
                </div>
              </div>
              {images.map((item, index) => (
                <div className="col card-container" key={index}>
                  <div className="card d-flex flex-row container-card-resenia">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="card-img-resenia"
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
        <div
          className="position-absolute"
          style={{
            left: "calc(58% + 320px)",
            width: "17%",
          }}
        >
          <div className="texto-titulo-resenia">
            <div className="d-flex justify-content-between align-items-center text-white">
              <h2>Top Reseñadores</h2>
            </div>
          </div>
          {images.map((item, index) => (
            <div
              className="card-top-reseniadores text-white d-flex flex-column"
              key={index}
            >
              <div className="d-flex align-items-center gap-3 resenia-info-usuario mb-1 ms-2">
                <img
                  src={item.foto_perfil}
                  className="img-perfil rounded-circle"
                  alt={item.autor}
                />
                <div>
                  <h5 className="card-title nombre-usuario m-0">
                    {item.autor}
                  </h5>
                  <div className="d-flex gap-1">
                    <i className="bi bi-chat-right-text-fill me-1"></i>
                    <h5 className="card-title mb-0">{item.comentarios}</h5>
                    <h5 className="card-title mb-0">Reseñas</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <h6 className="text-white mt-3 text-end">Más..</h6>
        </div>
      </div>
    </>
  );
};
