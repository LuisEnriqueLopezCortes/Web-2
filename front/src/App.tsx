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

import { UserProvider } from "./context/UserContext.tsx";

import { Login } from "./components/usuario/login.tsx";
import { RequireAuth } from "./components/auth/RequireAuth";




function App() {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <UserProvider>
    <Router>
    
      <div className="App">
        
          <MyNavbar homeRef={homeRef} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/publicaciones"
              element={
                <RequireAuth>
                  <CardPublicacion />
                </RequireAuth>
              }
            />
            <Route
              path="/peliculas"
              element={
                <RequireAuth>
                  <CardPelicula />
                </RequireAuth>
              }
            />
            <Route
              path="/resenias"
              element={
                <RequireAuth>
                  <CardResenias />
                </RequireAuth>
              }
            />

            <Route
              path="/chats"
              element={
                <RequireAuth>
                  <ChatsComponent />
                </RequireAuth>
              }
            />
            
          </Routes>
          <Footer />
       
      </div>
    
    </Router>
    </UserProvider>
  );
}

export default App;
