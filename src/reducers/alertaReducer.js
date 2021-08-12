import { types } from "../types/types";


const initialState = {
    alerta: null
};

const alertaReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        case types.OCULTAR_ALERTA:
            return {
                ...state,
                alerta: null
            }
        default:
            return state;
    };
};

export default alertaReducer;