/* eslint-disable import/no-anonymous-default-export */
import { 
    GUARDAR_CLIENTE,
    OBTENER_CLIENTES
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case GUARDAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }
        case OBTENER_CLIENTES:
            return {
                ...state,
                clientes: action.payload
            }
        default:
            return state
    }
}