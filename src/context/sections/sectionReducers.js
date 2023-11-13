/* eslint-disable import/no-anonymous-default-export */
import {
    SECCIONES_MODULO,
    AGREGAR_SECCION,
    VALIDAR_SECCION,
    ELIMINAR_SECCION,
    ESTADO_SECCION,
    SECCION_ACTUAL,
    ACTUALIZAR_SECCION,
    LIMPIAR_SECCION
} from '../../types/index'

export default (state, action) => {
    switch(action.type){
        case SECCIONES_MODULO:
            return {
                ...state,
                sectionsModules: action.payload
            }
        case AGREGAR_SECCION:
            return {
                ...state,
                sectionsModules: [...state.sectionsModules, action.payload],
                errorSection: false
            }
        case VALIDAR_SECCION:
            return {
                ...state,
                errorSection: true
            }
        case ELIMINAR_SECCION:
            return{
                ...state,
                sectionsModules: state.sectionsModules.filter(section => section.id !== action.payload)
            }
        case ACTUALIZAR_SECCION:
        case ESTADO_SECCION:
            return {
                ...state,
                sectionsModules: state.sectionsModules.map(section => section.id === action.payload._id ? action.payload : section)
            }
        case SECCION_ACTUAL:
            return {
               ...state,
               seccionSeleccionada: action.payload 
            }
        case LIMPIAR_SECCION:
            return {
                ...state,
                seccionSeleccionada: null
            }
        default:
            return state;
    }
}