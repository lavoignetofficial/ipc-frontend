/* eslint-disable import/no-anonymous-default-export */
import { 
    OBTENER_ITEMS,
    MOSTRAR_ITEM,
    OBTENER_VISTAS_ITEMS
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case MOSTRAR_ITEM:
            return {
                ...state,
                    viewItem: action.payload
            }
        case OBTENER_VISTAS_ITEMS:
            return{
                ...state,
                newItem: action.payload
            }
        case OBTENER_ITEMS:
            return{
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}