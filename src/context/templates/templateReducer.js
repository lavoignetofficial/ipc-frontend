/* eslint-disable import/no-anonymous-default-export */
import {
    OBTENER_TEMPLATES
} from '../../types'

export default (state, action) => {
    switch(action.type){
        case OBTENER_TEMPLATES:
            return {
                ...state,
                template: action.payload 
            }
        default:
            return state;
    }
}