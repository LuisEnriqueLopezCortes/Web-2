import React, { useState, useEffect } from "react";
import "../../css/explorerMovieCrousel.css";

const images = [
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%207.png",
    title: "Pelicula",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%202.png",
    title: "Pelicula",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%203.png",
    title: "Pelicula",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%204.png",
    title: "Pelicula",
  },
  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%205.png",
    title: "Pelicula",
  },

  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%206.png",
    title: "Pelicula",
  },

  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%209.png",
    title: "Pelicula",
  },

  {
    src: "https://raw.githubusercontent.com/kunaal438/disney-plus-clone/master/images/poster%2010.png",
    title: "Pelicula",
  },
];

export const ExplorerMoviesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 4;

  const nextSlide = () => {
    const maxIndex = images.length - visibleCards;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <h1 className="carousel-title-principal text-center text-white">
        Explorar por categoría
      </h1>

      <div className="carousel-custom-categoria position-relative">
        <div className="d-flex movies-list-categoria">
          <div
            className="card-container-categoria"
            style={{
              transform: `translateX(-${currentIndex * 240}px)`,
            }}
          >
            {images.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg w-64 card-container-img-categoria"
              >
                <img
                  src={item.src}
                  alt={`Slide ${index + 1}`}
                  className="img-square-cat"
                />
                <div className="text-overlay">
                  <h2>{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-custom prev" onClick={prevSlide}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="btn-custom next" onClick={nextSlide}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </>
  );
};
