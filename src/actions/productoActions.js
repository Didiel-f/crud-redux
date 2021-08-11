import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import { types } from "../types/types";


// Crear nuevos productos
export const crearNuevoProductoAction = (producto) => {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);
            console.log(producto)
            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) );

            // Alerta
            Swal.fire(
                'Correcto',
                'El proceso se agregó correctamente',
                'success'
            )
            
        } catch (error) {
            console.log(error);
            dispatch( agregarProductoError(true) );            

            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
};

const agregarProducto = () => ({
    type: types.AGREGAR_PRODUCTO,
    payload: true
});

// Si el producto se guarda en ka base de datos
const agregarProductoExito = producto => ({
    type: types.AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo un error
const agregarProductoError = (estado) => ({
    type: types.AGREGAR_PRODUCTO_ERROR,
    payload: estado
});