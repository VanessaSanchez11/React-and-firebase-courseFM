import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { Helmet } from "react-helmet";
import Boton from "../elements/Boton";
import { Header, Titulo, ContenedorHeader } from "../elements/Header";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "../elements/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "../imagenes/registro.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Alerta from "../elements/Alerta";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;

const RegistroUsuarios = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");
  const [password2, establecerPassword2] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        establecerCorreo(e.target.value);
        break;
      case "password":
        establecerPassword(e.target.value);
        break;
      case "password2":
        establecerPassword2(e.target.value);
        break;
      default:
        break;
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

    if (correo === "" || password === "" || password2 === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena tdos los datos",
      });
      return;
    }
    if (password !== password2) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Las contraseñas no son iguales",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, password);
      navigate("/");
    } catch (e) {
      cambiarEstadoAlerta(true);
      let mensaje;
      switch (e.code) {
        case "auth/invalid-password":
          mensaje = "La contraseña tiene que ser al menos de 6 caracteres";
          break;
        case "auth/email-already-in-use":
          mensaje = "Ya existe una cuenta con este correo electronico";
          break;
        case "auth/invalid-email":
          mensaje = "El correo no es valido";
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
        <title>Crear Cuenta</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
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
        <Input
          type="password"
          name="password2"
          placeholder="Repetir contraseña"
          value={password2}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Crear Cuenta
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

export default RegistroUsuarios;
