import React, { useReducer } from 'react';
import formItemsReducer from './formItemsReducer';
import FormItemsContext  from './formItemsContext';
import clientAxios from '../../config/axios';
import { 
    GUARDAR_ITEMS_FORM
} from '../../types'

const FormItemsState = props => {
    const initialState = {
        fItems: [],
    }
    const [state, dispatch] = useReducer(formItemsReducer, initialState)

    const saveItems = async (item) => {
        dispatch({
            type: GUARDAR_ITEMS_FORM, 
            payload: item
        })
    }
    
    return(
        <FormItemsContext.Provider value={{
            fItems: state.fItems,
            saveItems
        }}>
            {props.children}
        </FormItemsContext.Provider>
    )
}

export default FormItemsState;
