/* eslint-disable import/no-anonymous-default-export */
import { 
    OBTENER_PROPIEDADES
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case OBTENER_PROPIEDADES:
            return {
                ...state,
                properties: action.payload
            }
        default:
            return state
    }
}