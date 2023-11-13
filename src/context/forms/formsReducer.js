/* eslint-disable import/no-anonymous-default-export */
import { 
    OBTENER_FORMS,
    GUARDAR_FORMS,
    SELECT_FORM
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case OBTENER_FORMS:
            return {
                ...state,
                forms: action.payload
            }
        case GUARDAR_FORMS:
            return {
                ...state,
                form: action.payload
            }
        case SELECT_FORM:
            return {
                ...state,
                formActual: action.payload
            }
        default:
            return state
    }
}