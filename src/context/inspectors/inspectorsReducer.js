/* eslint-disable import/no-anonymous-default-export */
import { 
    GUARDAR_INSPECTOR,
    OBTENER_INSPECTORES
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case GUARDAR_INSPECTOR:
            return {
                ...state,
                inspector: action.payload
            }
        case OBTENER_INSPECTORES:
            return {
                ...state,
                inspectores: action.payload
            }
        default:
            return state
    }
}