import React from "react";
import styled from "styled-components";
import { ReactComponent as Puntos } from "../imagenes/puntos.svg";

const Svg = styled.svg`
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  path {
    fill: rgba(135, 182, 194, 0.15);
  }
`;

const PuntosArriba = styled(Puntos)`
  //al componente de puntos le queremos dar esos estilos
  position: fixed;
  z-index: 1;
  top: 2.5rem; /* 40px */
  left: 2.5rem; /* 40px */
`;

const PuntosAbajo = styled(Puntos)`
  position: fixed;
  z-index: 1;
  bottom: 2.5rem; /* 40px */
  right: 2.5rem; /* 40px */
`;

const Fondo = () => {
  return (
    <>
      <PuntosArriba />
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,256L48,224C96,192,192,128,288,117.3C384,107,480,149,576,186.7C672,224,768,256,864,266.7C960,277,1056,267,1152,256C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </Svg>
      <PuntosAbajo />
    </>
  );
};

export default Fondo;
