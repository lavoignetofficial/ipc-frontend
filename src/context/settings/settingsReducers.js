/* eslint-disable import/no-anonymous-default-export */
import {
    VALIDAR_AJUSTES,
    MOSTRAR_OPCION
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case MOSTRAR_OPCION:
            return{
                ...state,
                option: action.payload
            }
        case VALIDAR_AJUSTES:
            return{
                ...state,
                viewSettings: action.payload,
                option: action.payload ? state.option : null
            }
        default:
            return state;
    }
}