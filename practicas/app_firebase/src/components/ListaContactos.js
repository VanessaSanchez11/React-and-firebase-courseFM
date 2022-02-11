import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db from "../firebase/firebaseConfig";
import Contacto from "./Contacto";
import { collection, onSnapshot } from "firebase/firestore";

const ListaContactos = () => {
  const [contactos, cambiarContacto] = useState([]);

  useEffect(() => {
    //onSnapshot sirve para traer los datos de firebase en tiempo real
    onSnapshot(collection(db, "usuarios"),
     (snapshot) => {
      const arregloUsuarios = snapshot.docs.map((documento) => {
        return {...documento.data(), id: documento.id};
      })
      cambiarContacto(arregloUsuarios);

    });
  }, []);

  return (
    contactos.length > 0 && (
      <ContenedorContactos>
        {contactos.map((contacto) => (
          <Contacto
            key={contacto.id}
            id={contacto.id}
            nombre={contacto.nombre}
            correo={contacto.correo}
          />
        ))}
      </ContenedorContactos>
    )
  );
};
const ContenedorContactos = styled.div`
  margin-top: 40px;
`;

export default ListaContactos;
