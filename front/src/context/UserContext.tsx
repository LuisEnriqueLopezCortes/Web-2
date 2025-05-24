import { createContext, useContext, useState, ReactNode } from "react";

type Usuario = {
  id: number;
  nombre: string;
  usuario: string;
  email: string;
  tipo: string;
  imagen: string;
  // Agrega aquí otros campos necesarios como "tipo", "imagen", etc.
};

type UserContextType = {
  user: Usuario | null;
  setUser: (user: Usuario) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un <UserProvider>");
  }
  return context;
};