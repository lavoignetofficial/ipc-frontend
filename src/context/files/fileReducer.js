/* eslint-disable import/no-anonymous-default-export */
import { 
    ARCHIVOS_SUBIR,
    ARCHIVOS_SUBIDOS,
    ARCHIVOS_ERROR,
    ARCHIVOS_CARGADOS,
    ARCHIVOS_ITEMS_SUBIDOS
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case ARCHIVOS_ITEMS_SUBIDOS:
            console.log(action.payload)
            return {
                ...state,
                filesItems: action.payload
            }
        case ARCHIVOS_CARGADOS:
            return {
                ...state,
                files: action.payload
            }
        case ARCHIVOS_SUBIDOS:
            return {
                ...state,
                files: action.payload
            }
        case ARCHIVOS_ERROR:
            console.log("error")
            return;
        default:
            return state
    }
}