import React, { useReducer } from 'react';
import propertyReducer from './propertyReducer';
import PropertyContext  from './propertyContext';
import clientAxios from '../../config/axios';
import { 
    OBTENER_PROPIEDADES
} from '../../types'

const PropertyState = props => {
    const initialState = {
        properties: []
    }
    
    const [state, dispatch] = useReducer(propertyReducer, initialState)
 
    const obtenerPropiedades = async() =>{
        try{
            const result = await clientAxios.get('/api/property');
            dispatch({
                type: OBTENER_PROPIEDADES,
                payload: result.data.Propiedades
            })
        } catch(err){
            console.log(err)
        }
    }

    return(
        <PropertyContext.Provider value={{
            properties: state.properties,
            obtenerPropiedades
        }}>
            {props.children}
        </PropertyContext.Provider>
    )
}

export default PropertyState;
