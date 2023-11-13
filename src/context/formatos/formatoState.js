import React, { useReducer } from 'react';
import FormatoContext from './formatoContext';
import formatoReducer from './formatoReducer';
import clientAxios from '../../config/axios'
import { 
    OBTENER_FORMATOS,
    SELECCIONAR_FORMATO
} from '../../types'

const FormatoState = props => {
    const initialState = {
        formatos:[],
        formatoActual: null
    }

    const [state, dispatch] = useReducer(formatoReducer, initialState)

    const obtenerFormatos = async () => {
        try{
            const res = await clientAxios.get('/api/format')
            dispatch({
                type: OBTENER_FORMATOS,
                payload: res.data.formatos
            })
        } catch(err){
            console.log(err)
        }
    }

    const seleccionarFormato = async formato => {
        dispatch({
            type: SELECCIONAR_FORMATO,
            payload: await formato
        })
    }

    return(
        <FormatoContext.Provider
            value={{
                formatos: state.formatos,
                formatoActual: state.formatoActual,
                obtenerFormatos,
                seleccionarFormato
            }}
        >
            {props.children}
        </FormatoContext.Provider>
    )
}

export default FormatoState 