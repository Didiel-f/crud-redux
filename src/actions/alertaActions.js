import { types } from "../types/types";


export const mostrarAlerta = (alerta) => {
    return ( dispatch ) => {
        dispatch( crearAlerta( alerta ) );
    };
};

const crearAlerta = ( alerta ) => ({
    type: types.MOSTRAR_ALERTA,
    payload: alerta
});

export const ocultarAlertaAction = () => {
    return (dispatch) => {
        dispatch( ocultarAlerta() );
    };
};

const ocultarAlerta = () => ({
    type: types.OCULTAR_ALERTA
});