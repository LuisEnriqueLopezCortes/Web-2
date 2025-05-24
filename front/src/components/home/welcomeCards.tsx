import "../../css/home.css";

export const WelcomeCards = () => {
  return (
    <>
      <div className="cards-home">
        <div className="card-ind">
          <img src="https://plus.unsplash.com/premium_photo-1661301044600-8856088002c7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <h3 className="card-subtitulo">Reseña</h3>
          <p className="card-parrafo">
            Escribe y descubre reseñas de películas, comparte tu opinión y
            explorar nuevas historias.
          </p>
        </div>
        <div className="card-ind">
          <img src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <h3 className="card-subtitulo">Chatea</h3>
          <p className="card-parrafo">
            Conéctate con otros cinéfilos, chatea, comparte recomendaciones y
            debate sobre tus películas favoritas.
          </p>
        </div>
        <div className="card-ind">
          <img src="https://plus.unsplash.com/premium_photo-1738663458243-7446dba4551d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <h3 className="card-subtitulo">Califica</h3>
          <p className="card-parrafo">
            Califica películas y ayuda a la comunidad a encontrar lo mejor del
            cine. ¡Únete y empieza a compartir!
          </p>
        </div>
      </div>
    </>
  );
};
