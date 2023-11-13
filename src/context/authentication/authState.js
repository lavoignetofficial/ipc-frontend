import React, {useReducer} from 'react'
import authReducer from './authReducer'
import AuthContext from './authContext'
import clientAxios  from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        loading: true
    }

    const [ state, dispatch ] = useReducer(authReducer, initialState)

    const registrarUsuario = async data => {
        try{
            const result = await clientAxios.post('/api/users', data)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: result.data
            })

            usuarioAutenticado()
        } catch(err){
            const alert = {
                msg: err.response.data.msg,
                alert: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            })
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            // TODO: funcion mandar token por headers
            tokenAuth(token);
        }
        try{
            const result = await clientAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: result.data.user
            })
        } catch(err){
            const alert = {
                msg: err.response.data.msg,
                alert: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const login = async user => {
        try{
            const result = await clientAxios.post('/api/auth', user);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: result.data
            })
            
            usuarioAutenticado()
        } catch(err){
            const alert = {
                msg: err.response.data.msg,
                alert: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                loading: state.loading,
                registrarUsuario,
                usuarioAutenticado,
                login,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;