/* eslint-disable import/no-anonymous-default-export */
import { 
    FORMULARIO_MODULO, 
    OBTENER_MODULOS,
    AGREGAR_MODULO,
    VALIDAR_FORMULARIO,
    MODULO_ACTUAL,
    ELIMINAR_MODULO
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case FORMULARIO_MODULO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_MODULOS:
            return {
                ...state,
                modules: action.payload
            }
        case AGREGAR_MODULO:
            return {
                ...state,
                modules: [...state.modules, action.payload],
                formulario: false,
                errorFormulario: false
            }
        case VALIDAR_FORMULARIO:
                return {
                    ...state,
                    errorFormulario: true
        }
        case MODULO_ACTUAL:
            if(state.modules !== null){
                return {
                    ...state,
                    module: state.modules.filter(module => module._id === action.payload)
                }
            }else{
                return {
                    ...state,
                    module: null
                }
            }
        case ELIMINAR_MODULO:
            return {
                ...state,
                modules: state.modules.filter(module => module._id !== action.payload),
                module: null
        }
        default:
            return state
    }
}