/* eslint-disable import/no-anonymous-default-export */
import { 
    OBTENER_FORMATOS,
    SELECCIONAR_FORMATO
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case OBTENER_FORMATOS:
            return {
                ...state,
                formatos: action.payload
            }
        case SELECCIONAR_FORMATO:
            return {
                ...state,
                formatoActual: action.payload
            }
        default:
            return state
    }
}