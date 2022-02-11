import styled from 'styled-components';
import React from 'react'
import Formulario from './components/Formulario';
import ListaContactos from './components/ListaContactos';


function App() {
  return (
    <Contenedor>
      <Titulo>Lista de contactos</Titulo>
      <Formulario/>
      <ListaContactos/>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  margin: 40px;
  width: 90%;
  max-width: 400px;
  background: #fff;
  padding: 40px;
  border-radius: 5px;
  text-align: center;
`;

const Titulo = styled.h2`
  margin-bottom: 10px;
`;

export default App;
