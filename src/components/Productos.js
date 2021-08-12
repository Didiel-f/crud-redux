import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';
import { Producto } from './Producto';

export const Productos = () => {
    
    const dispatch = useDispatch();
    
    // Obtener el state
    const productos = useSelector( state => state.productos.productos );
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    useEffect(() => {
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();
    }, [dispatch]);
    
    
    return (
        <>
            <h2 className="text-center my-5">Listado de producctos</h2>

            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
            { cargando ? <p className="text-center">Cargando...</p> : null }

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { productos.lenght === 0 ? 'No hay productos' 
                        : (productos.map( (producto, i) => (
                            <Producto 
                                key={ i }
                                producto={ producto }
                            />
                        )) )
                    }
                </tbody>
            </table>
        </>
    )
}
