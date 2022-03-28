import React from 'react';
import {Helmet} from 'react-helmet';
import BotonCerrarSesion from './elements/BotonCerrarSesion';
import Boton from './elements/Boton';
import { Header, Titulo, ContenedorBotones, ContenedorHeader } from './elements/Header';
import FormularioGasto from './components/FormularioGasto';
import BarraTotalGastado from './components/BarraTotalGastado';



function App() {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista">Lista de Gastos</Boton>
            <BotonCerrarSesion/>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
      <FormularioGasto/>
      <BarraTotalGastado/>
    </>
  );
}

export default App;
