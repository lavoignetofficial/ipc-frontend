/* eslint-disable import/no-anonymous-default-export */
import { 
    GUARDAR_ITEMS_FORM
} from "../../types"

export default (state, action) => {
    switch(action.type){
        case GUARDAR_ITEMS_FORM:
            return {
                ...state,
                fItems: [
                    ...state.fItems,
                    action.payload
                ]
            }
        default:
            return state
    }
}