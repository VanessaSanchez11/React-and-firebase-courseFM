import React, { useState, useContext, useEffect } from "react";
import { auth } from "./../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

//creamos un contexto
const AuthContext = React.createContext();

//hook para acceder el contexto
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [usuario, cambiarUsuario] = useState();

  //creamos un state para saber cuando termina de cargar la comprobacion de onAuthStateChanged
  const [cargando, cambiarCargando] = useState(true);

  //Efecto para ejecutar la comprobacion una sola vez
  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
      cambiarUsuario(usuario);
      cambiarCargando(false);
    });

    return cancelarSuscripcion;
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: usuario }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
