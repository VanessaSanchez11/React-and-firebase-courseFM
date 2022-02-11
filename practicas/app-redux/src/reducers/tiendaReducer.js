const estadoInicial = {
  productos: [
    { id: 1, nombre: "producto 1" },
    { id: 2, nombre: "producto 2" },
    { id: 3, nombre: "producto 3" },
    { id: 4, nombre: "producto 4" },
  ],

  carrito: [],
};

//el reducer es una funcion que se va a encargar de administrar el estado de la aplicacion

const reducer = (estado = estadoInicial, accion) => {
  switch (accion.type) {
    case "AGREGAR_PRODUCTO_AL_CARRITO":
      const { nombre, idProductoAAgregar } = accion;

      if (estado.carrito.length === 0) {
        return {
          ...estado,
          carrito: [{ id: idProductoAAgregar, nombre: nombre, cantidad: 1 }],
        };
      } else {
        const nuevoCarrito = [...estado.carrito];

        //comprobamos si el carrito tiene el id del producto a agregar
        const yaEstaEnCarrito =
          nuevoCarrito.filter((ProductoDeCarrito) => {
            return ProductoDeCarrito.id === idProductoAAgregar;
          }).length > 0;

        if (yaEstaEnCarrito) {
          //para saber si esta en carrito tenemos que buscarlo, obtener su posicion en el arreglo
          //y en base a esa posicion ya actualizamos el valor
          nuevoCarrito.forEach((ProductoDeCarrito, index) => {
            if (ProductoDeCarrito.id === idProductoAAgregar) {
              const cantidad = nuevoCarrito[index].cantidad;
              nuevoCarrito[index] = {
                id: idProductoAAgregar,
                nombre: nombre,
                cantidad: cantidad + 1,
              };
            }
          });
          //de otra forma entonces agregamos el producto al carrito
        } else {
          nuevoCarrito.push({
            id: idProductoAAgregar,
            nombre: nombre,
            cantidad: 1,
          });
        }
        return {
          ...estado,
          carrito: nuevoCarrito,
        };
      }

    default:
      return estado;
  }
};

export default reducer;
