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
            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) );

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
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

// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {

            const respuesta = await clienteAxios.get('/productos');

            dispatch( descargaProductosExitosa( respuesta.data ) );
             
        } catch (error) {
            console.log(error);
            dispatch( descargaProductosError() );
        }
        
    };
};

const descargarProductos = () => ({
    type: types.COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = (productos) => ({
    type: types.DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: types.DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

export const borrarProductoAction = (id) => {
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) );
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente',
                'success'
            );
            
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() );
        }
        dispatch( obtenerProductosAction() );
    };
};

const obtenerProductoEliminar = (id) => ({
    type: types,
    payload: id
});

const eliminarProductoExito = () => ({
    type: types.PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: types.PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

// Colocar producto en edicion
export const obtenerProductoEditar = (producto) => {
    return ( dispatch ) => {
        dispatch( obtenerProductoEditarAction(producto) );
    }
};

const obtenerProductoEditarAction = (producto) => ({
    type: types.OBTENER_PRODUCTO_EDITAR,
    payload: producto
});


export const editarProductoAction = ( producto ) => {
    return async ( dispatch ) => {
        dispatch( editarProducto() );

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExitoso( producto ) );
        } catch (error) {
            console.log(error);
            dispatch( editarProductoError() );
        }
        
    }
};

const editarProducto = () => ({
    type: types.COMENZAR_DESCARGA_PRODUCTOS
});

const editarProductoExitoso = ( producto ) => ({
    type: types.PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: types.PRODUCTO_EDITADO_ERROR,
    payload: true
});