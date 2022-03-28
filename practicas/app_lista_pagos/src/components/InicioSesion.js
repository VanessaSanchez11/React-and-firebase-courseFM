import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Boton from "../elements/Boton";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Header, Titulo, ContenedorHeader } from "../elements/Header";
import {signInWithEmailAndPassword } from "firebase/auth";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "../elements/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "../imagenes/login.svg";
import styled from "styled-components";
import Alerta from "../elements/Alerta";
const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      establecerCorreo(e.target.value);
    } else if (e.target.name === "password") {
      establecerPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    //comprobacion del lado del cliente que le correo sea valido

    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingrese un correo valido",
      });
      return;
    }

    if (correo === "" || password === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los datos",
      });
      return;
    }
   
    try {
      await signInWithEmailAndPassword(auth, correo, password);
      navigate("/");
    } catch (e) {
      cambiarEstadoAlerta(true);
      let mensaje;
      switch (e.code) {
        case 'auth/wrong-password':
          mensaje = "La contraseña no es correcta"
          break;
        case 'auth//user-not-found':
          mensaje = "No se encontro ninguna cuenta con ese correo electronico"
          break;
        default:
          mensaje = "Hubo un error al intentar crear la cuenta";
          break;
      }
      cambiarAlerta({ tipo: "error", mensaje: mensaje });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Iniciar Sesión
          </Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
};

export default InicioSesion;
