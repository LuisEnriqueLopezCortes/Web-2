import { FeaturedMoviesCarousel } from "./featuredMoviesCarousel";
import { ExplorerMoviesCarousel } from "./explorerMovieCarousel";
import { CardGrid } from "./resenia";
import { CardLanzamientos } from "./lanzamientos";
import { WelcomeCards } from "./welcomeCards";
import { Celebridades } from "./celebridades";
import "../../css/home.css";

export const Home = () => {
  return (
    <>
      {/*<div className="container-welcomecards">
        <h2>¡Bienvenido a MovieBox!</h2>
        <WelcomeCards />
      </div>*/}
      <div className="container-todo-home">
        <div className="custom-carousel-home">
          <FeaturedMoviesCarousel />
        </div>
        <div className="custom-carousel-explore">
          <ExplorerMoviesCarousel />
        </div>
        <div className="custom-cardResenia-home">
          <CardGrid />
        </div>
        <h1 className="texto-titulo">Nuevos lanzamientos</h1>
        <div className="custom-cardGrid-home">
          <CardLanzamientos />
        </div>
        <h1 className="texto-titulo">Celebridades</h1>
        <div className="custom-cardGrid-home">
          <Celebridades />
        </div>
      </div>
    </>
  );
};
