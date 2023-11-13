import React, { useReducer } from 'react';
import usersReducer from './usersReducer';
import usersContext from './UsersContext';

import {OBTENER_USUARIOS} from '../../types'
import clientAxios from '../../config/axios';

const UsersState = props => {
    const initialState = {
        users: null,
    }

    const obtenerUsuarios = async () => {
        const token = localStorage.getItem('token');
        if(!token){
            // TODO: funcion mandar token por headers
            console.log("El token expiro.")
            return;
        }
        try{
            let users = await clientAxios.get('http://localhost:4000/api/users');
            dispatch({
                type: OBTENER_USUARIOS,
                payload: users.data.users
            })
        } catch(err){
            console.log(err)
        }
    }


    const [state, dispatch] = useReducer(usersReducer, initialState);

    return (
        <usersContext.Provider value={{
            users: state.users,
            obtenerUsuarios
        }}>
            {props.children}
        </usersContext.Provider>
    )
}

export default UsersState;
