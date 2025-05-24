import "../../css/featuredMoviesCarousel.css";
import React, { useState, useEffect } from "react";

const images = [
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%207.png",
    title: "Pelicula 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, inceptos ante ut tempor euismod in libero dapibus. Enim ultricies placerat molestie blandit mauris non ad ut vestibulum inceptos donec lacinia risus a quis, eleifend purus varius nascetur venenatis dictumst habitasse scelerisque est accumsan duis hendrerit hac viverra.",
    tiempo: "1h 27 min",
    fecha: "2020",
    genero: "Aventura, Fantasía, Acción, Familia",
    actores:
      "Jason Scott Lee, Yoson An, Tzi Ma, Rosalind Chao, Ming-Na Wen, Xana Tang",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
    title: "Pelicula 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, molestie massa vel mattis egestas nascetur ut. Sed turpis habitant ad purus elementum mi sapien cras vulputate, morbi vehicula feugiat auctor nunc quam proin litora primis, inceptos ante ut tempor euismod in libero dapibus. Enim ultricies placerat molestie blandit mauris non ad ut vestibulum inceptos donec lacinia risus a quis.",
    tiempo: "1h 27 min",
    fecha: "2020",
    genero: "Aventura, Fantasía, Acción, Familia",
    actores:
      "Jason Scott Lee, Yoson An, Tzi Ma, Rosalind Chao, Ming-Na Wen, Xana Tang",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%203.png",
    title: "Pelicula 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, molestie massa vel mattis egestas nascetur ut. Sed turpis habitant ad purus elementum mi sapien cras vulputate, morbi vehicula feugiat auctor nunc quam proin litora primis, inceptos ante ut tempor euismod in libero dapibus.",
    tiempo: "1h 27 min",
    fecha: "2020",
    genero: "Aventura, Fantasía, Acción, Familia",
    actores:
      "Jason Scott Lee, Yoson An, Tzi Ma, Rosalind Chao, Ming-Na Wen, Xana Tang",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%204.png",
    title: "Pelicula 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, molestie massa vel mattis egestas nascetur ut. Sed turpis habitant ad purus elementum mi sapien cras vulputate, morbi vehicula feugiat auctor nunc quam proin litora primis, inceptos ante ut tempor euismod in libero dapibus. Enim ultricies placerat molestie blandit mauris non ad ut vestibulum inceptos donec lacinia risus a quis.",
    tiempo: "1h 27 min",
    fecha: "2020",
    genero: "Aventura, Fantasía, Acción, Familia",
    actores:
      "Jason Scott Lee, Yoson An, Tzi Ma, Rosalind Chao, Ming-Na Wen, Xana Tang",
    valoracion: "4",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%205.png",
    title: "Pelicula 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis, feugiat magna consequat fames accumsan cum lobortis posuere, molestie massa vel mattis egestas nascetur ut. Sed turpis habitant ad purus elementum mi sapien cras vulputate, morbi vehicula feugiat auctor nunc quam proin litora primis, inceptos ante ut tempor euismod in libero dapibus.",
    tiempo: "1h 27 min",
    fecha: "2020",
    genero: "Aventura, Fantasía, Acción, Familia",
    actores:
      "Jason Scott Lee, Yoson An, Tzi Ma, Rosalind Chao, Ming-Na Wen, Xana Tang",
    valoracion: "4",
  },
];

export const FeaturedMoviesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };


  return (
    <>
      <h1 className="carousel-title-principal text-center text-white">
        Mejores valoradas
      </h1>

      <div className="carousel-custom-wrapper position-relative">
        <div className="carousel-inner">
          {images.map((item, index) => (
            <div
              className={`carousel-item ${index === currentSlide ? "active" : "inactive"}`}
              key={index}
              style={{ display: index === currentSlide ? "flex" : "none" }}
            >
              <div className="carousel-content d-flex h-100">
                <div className="image-container">
                  <img
                    src={item.src}
                    className="d-block"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
                <div className="carousel-information d-flex h-100 flex-column justify-content-center">
                  <h1 className="carousel-title">{item.title}</h1>
                  <div className="container-time-date d-flex">
                    <div className="time-container d-flex align-items-center">
                      <i className="bi bi-clock-fill"></i>
                      <h5 className="m-0">{item.tiempo}</h5>
                    </div>
                    <div className="calendar-container d-flex align-items-center">
                      <i className="bi bi-calendar2-week-fill"></i>
                      <h5 className="m-0">{item.fecha}</h5>
                    </div>
                  </div>
                  <div className="description-container d-flex aling-items-center">
                    <p>{item.description}</p>
                  </div>
                  <h6>Género:&nbsp; {item.genero}</h6>
                  <h6>Actores:&nbsp; {item.actores}</h6>

                  <div className="d-flex align-items-center w-100 justify-content-end mt-1 me-1">
                    <div className="movie-stars">
                      {[...Array(4)].map((_, index) => (
                        <i key={index} className="bi bi-star-fill ms-1"></i>
                      ))}
                    </div>
                    <h1 className="movie-vote ms-3 text-aling-center">
                      {item.valoracion}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-custom prev"
          onClick={prevSlide}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className="btn-custom next"
          onClick={nextSlide}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>

        <div className="custom-indicators d-flex justify-content-center mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`indicator-dot ${
                index === currentSlide ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
