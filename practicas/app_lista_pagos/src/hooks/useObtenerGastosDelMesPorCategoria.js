import { useState, useEffect } from "react";
import useObtenerGastosDelMes from "./useObtenerGastosDelMes";

const useObtenerGastosDelMesPorCategoria = () => {
  const [gastosPorCategoria, cambiarGastosPorCategoria] = useState([]);
  const gastos = useObtenerGastosDelMes();

  useEffect(() => {
      const sumaDeGastos = gastos.reduce(
        (objectoResultante, objetoActual) => {
          const categoriaActual = objetoActual.categoria;
          const cantidadActual = objetoActual.cantidad;
    
          objectoResultante[categoriaActual] += cantidadActual;
          return objectoResultante;
        },
        {
          'comida': 0,
          'cuentas y pagos': 0,
          'hogar': 0,
          'transporte': 0,
          'ropa': 0,
          'salud e higiene': 0,
          'compras': 0,
          'diversion': 0,
        }
      );  
      //se crea un arreglo de
      cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
          return {categoria: elemento, cantidad:sumaDeGastos[elemento]}
      }));

    }, [gastos, cambiarGastosPorCategoria]);

    return gastosPorCategoria;
};

export default useObtenerGastosDelMesPorCategoria;
