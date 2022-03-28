import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import RutaPrivada from "./components/RutaPrivada";
import Contenedor from "./elements/Contenedor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaDeGastos from "./components/ListaDeGastos";
import RegistroUsuarios from "./components/RegistroUsuarios";
import GastosPorCategoria from "./components/GastosPorCategoria";
import EditarGasto from "./components/EditarGasto";
import InicioSesion from "./components/InicioSesion";
import { Helmet } from "react-helmet";
import favicon from "./imagenes/logo.png";
import Fondo from "./elements/Fondo";
import { AuthProvider } from "./contextos/AuthContext";
import { TotalGastadoProvider } from "./contextos/TotalGastadoEnElMesContext";

WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "sans-serif"],
  },
});
const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Routes>
                <Route path="/iniciar-sesion" element={<InicioSesion />} />
                <Route path="/crear-cuenta" element={<RegistroUsuarios />} />

                <Route
                  path="/categorias"
                  element={
                    <RutaPrivada>
                      <GastosPorCategoria />
                    </RutaPrivada>
                  }
                />

                <Route
                  path="/lista"
                  element={
                    <RutaPrivada>
                      <ListaDeGastos />
                    </RutaPrivada>
                  }
                />

                <Route
                  path="/editar/:id"
                  element={
                    <RutaPrivada>
                      <EditarGasto />
                    </RutaPrivada>
                  }
                />
                <Route
                  path="/"
                  element={
                    <RutaPrivada>
                      <App />
                    </RutaPrivada>
                  }
                />
              </Routes>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>
      <Fondo />
    </>
  );
};
ReactDOM.render(<Index />, document.getElementById("root"));
