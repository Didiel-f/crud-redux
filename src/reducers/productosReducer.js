// Cada reducer tiene su propio state

import { types } from "../types/types";

const initialState = {
    productos: [],
    error: null,
    loading: false
};

const productosReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }
        case types.AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case types.AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default productosReducer;