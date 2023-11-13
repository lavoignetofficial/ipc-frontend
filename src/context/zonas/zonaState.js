import React, { useReducer } from 'react';
import zonaReducer  from './zonaReducer';
import ZonaContext  from './zonaContext';
import clientAxios from '../../config/axios';
import { OBTENER_ZONAS } from '../../types'

const ZonaState = props => {
    const initialState = {
        zonas: []
    }
    const [state, dispatch] = useReducer(zonaReducer, initialState)

    const obtenerZonas = async formato => {
        try{
            let res = await clientAxios.get(`/api/zone`)
            dispatch({
                type: OBTENER_ZONAS,
                payload: res.data.zonas
            })
        } catch(err){
            console.log(err)
        }
    }

    return(
        <ZonaContext.Provider value={{
            zonas: state.zonas,
            obtenerZonas
        }}>
            {props.children}
        </ZonaContext.Provider>
    )
}

export default ZonaState;
