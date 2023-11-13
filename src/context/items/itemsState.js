import React, { useReducer } from 'react';
import itemsReducer from './itemsReducer';
import ItemsContext  from './itemsContext';
import clientAxios from '../../config/axios';
import { 
    MOSTRAR_ITEM,
    OBTENER_ITEMS,
    OBTENER_VISTAS_ITEMS
} from '../../types'

const ItemsState = props => {
    const initialState = {
        items: [],
        viewItem: "Ninguna",
        newItem: false
    }
    const [state, dispatch] = useReducer(itemsReducer, initialState)

    const mostrarItem = async (item) => {
        console.log(item)
        dispatch({
            type: MOSTRAR_ITEM, 
            payload: item
        })
    }

    const obtenerItems = async() =>{
        try{
            const result = await clientAxios.get('/api/item');
            dispatch({
                type: OBTENER_ITEMS,
                payload: result.data.items
            })
        } catch(err){
            console.log(err)
        }
    }

    const view = async vista => {
        dispatch({
            type: OBTENER_VISTAS_ITEMS,
            payload: await vista
        })
        
    }

    return(
        <ItemsContext.Provider value={{
            items: state.items,
            viewItem: state.viewItem,
            newItem: state.newItem,
            mostrarItem,
            obtenerItems,
            view

        }}>
            {props.children}
        </ItemsContext.Provider>
    )
}

export default ItemsState;
