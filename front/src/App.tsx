import { useRef } from "react";
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Home } from "./components/home/home.tsx";
import { MyNavbar } from "./components/layouts/navbar.tsx";
import { Footer } from "./components/layouts/footer.tsx";
import { CardPublicacion } from "./components/pelicula/publicacion.tsx";
import { CardPelicula } from "./components/pelicula/pelicula.tsx";
import { CardResenias } from "./components/pelicula/resenias.tsx";
import { ChatsComponent } from "./components/usuario/chat.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';

import { UserProvider } from "./context/UserContext";

//import { Login } from "./components/login";
//import { Chat } from "./pages/Chat";

function App() {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <UserProvider>
      <div className="App">
        <Router>
          <MyNavbar homeRef={homeRef} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publicaciones" element={<CardPublicacion />} />
            <Route path="/peliculas" element={<CardPelicula />} />
            <Route path="/resenias" element={<CardResenias />} />

            <Route path="/chats" element={<ChatsComponent />} />

          </Routes>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
