/* eslint-disable import/no-anonymous-default-export */
import {
    ESTADO_NUEVO_USUARIO
} from '../../types'

export default (state, action) => {
    switch(action.type){
        case ESTADO_NUEVO_USUARIO:
            return {
                ...state,
                nuevoUsuario: state.nuevoUsuario
            }
        default:
            return state;
    }
}