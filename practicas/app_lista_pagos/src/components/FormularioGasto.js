import React, { useState, useEffect } from "react";
import Boton from "../elements/Boton";
import {
  Formulario,
  Input,
  ContenedorBoton,
  InputGrande,
  ContenedorFiltros,
} from "../elements/ElementosDeFormulario";
import agregarGasto from "../firebase/agregarGasto";
import { ReactComponent as IconoPlus } from "../imagenes/plus.svg";
import DatePicker from "./DatePicker";
import SelectCategorias from "./SelectCategorias";
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import { useAuth } from "./../contextos/AuthContext";
import Alerta from "../elements/Alerta";
import { useNavigate } from "react-router-dom";
import editarGasto from "../firebase/editarGasto";

const FormularioGasto = ({ gasto }) => {
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputCantidad, cambiarInputCantidad] = useState("");
  const [categoria, cambiarCategoria] = useState("hogar");
  const [fecha, cambiarFecha] = useState(new Date());
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const { usuario } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    //comprobamos si hay algun gasto
    //de ser asi establecemos todo el state con los valores del gasto del
    if (gasto) {
      //comprobamos que el gasto sea del usuario actualizar
      //para eso comprobamos el uid guardado en el gasto con el uid del usuario
      if (gasto.data().uidUsuario === usuario.uid) {
        cambiarCategoria(gasto.data().categoria);
        cambiarFecha(fromUnixTime(gasto.data().fecha));
        cambiarInputDescripcion(gasto.data().descripcion);
        cambiarInputCantidad(gasto.data().cantidad);
      } else {
        navigate("/lista");
      }
    }
  }, [gasto, usuario, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "cantidad") {
      cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let cantidad = parseFloat(inputCantidad).toFixed(2);

    //comprobamos que haya descripcion y valor que

    if (inputDescripcion !== "" && inputCantidad !== "") {
      if (cantidad) {
        if (gasto) {
          editarGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
          }).then(() =>{
            navigate("/lista");
          }).catch((error) => {
            console.log(error);
          })
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid,
          })
            //despues de subir los datos que los cambios esten en blanco
            .then(() => {
              cambiarCategoria("hogar");
              cambiarInputDescripcion("");
              cambiarInputCantidad("");
              cambiarFecha(new Date());
              cambiarEstadoAlerta(true);
              cambiarAlerta({
                tipo: "exito",
                mensaje: "El gasto fue agregado correctamente",
              });
            })
            .catch((error) => {
              cambiarAlerta({
                tipo: "error",
                mensaje: "Hubo unn problema al intentar agregar tu gasto",
              });
            });
        }
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "error",
          mensaje: "El valor que ingresaste no es correcto",
        });
      }
    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
        />
        <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
      </ContenedorFiltros>
      <div>
        <Input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion del gasto"
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          id="cantidad"
          placeholder="$0"
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
         {gasto ? 'Editar Gasto' : 'Agregar Gasto'}  <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </Formulario>
  );
};

export default FormularioGasto;
