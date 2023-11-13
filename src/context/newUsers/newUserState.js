import React, { useReducer } from 'react';
import NewUserContext from './newUserContext';
import NewUserReducer from './newUserReducer';
import clientAxios from '../../../src/config/axios'

import { 
    ESTADO_NUEVO_USUARIO
} from '../../types';


const NewUserState = props => {
    const initialState = {
        nuevoUsuario: null
    }

    const [state, dispatch] = useReducer(NewUserReducer, initialState)

    // Crear las funciones

    // Obtener secciones del modulo

    const crearUsuario = async user =>{
        try{
            const result = await clientAxios.post('/api/users', user)
            dispatch({
                type: ESTADO_NUEVO_USUARIO,
                payload: result.data
            })
        }catch(err){
            console.log(err)
        }
        

    }

    return(
        <NewUserContext.Provider
            value={{
                nuevoUsuario: state.nuevoUsuario,
                crearUsuario
            }}
        >
            {props.children}
        </NewUserContext.Provider>
    )

}

export default NewUserState;
