import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';
import { crearNuevoProductoAction } from '../actions/productoActions';

export const NuevoProducto = ({ history }) => {

    // State del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    // Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // Validar formulario
        if ( nombre.trim() === '' || precio <= 0 ) {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                clases: 'alert alert-danger text-center text-uppercase p3'
            };
            dispatch( mostrarAlerta(alerta) );
            return;
        }

        // Si no hay errores
        dispatch( ocultarAlertaAction() );
        
        //  Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // Redireccionar
        history.push('/');
    }
    
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        
                        { alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null }

                        <form
                            onSubmit={ submitNuevoProducto }
                        >
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={ nombre }
                                    onChange={ e => setNombre(e.target.value) }
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio producto"
                                    name="precio"
                                    value={ precio }
                                    onChange={ e => setPrecio( Number(e.target.value) ) }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                            
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}
