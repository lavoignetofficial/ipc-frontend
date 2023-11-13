import React, { useReducer } from 'react';
import moduleContext from './moduleContext';
import moduleReducer from './moduleReducer';
import clientAxios from '../../config/axios'
import { 
    FORMULARIO_MODULO, 
    OBTENER_MODULOS,
    AGREGAR_MODULO,
    VALIDAR_FORMULARIO,
    MODULO_ACTUAL,
    ELIMINAR_MODULO
} from '../../types'

const ModuleState = props => {
    const initialState = {
        modules:[],
        formulario: false,
        errorFormulario: false,
        module: null
    }

    const [state, dispatch] = useReducer(moduleReducer, initialState)

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_MODULO
        })
    }

    const obtenerModulos = async ()  => {
        try{
            const res = await clientAxios.get('/api/modulos')
            dispatch({
                type: OBTENER_MODULOS,
                payload: res.data.modulos
            })
        } catch(err){
            console.log(err)
        }
    }

    const agregarModulo = async modulo => {
        try{
            const res = await clientAxios.post('/api/modulos', modulo)

            dispatch({
                type: AGREGAR_MODULO,
                payload: res.data
            })
        }catch(err){
            console.log(err)
        }
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // selecciona el modulo en el que el usuario dio clic
    const moduloActual = id => {
        dispatch({
            type: MODULO_ACTUAL,
            payload: id
        })
    }

    const eliminarModulo = async id =>{
        try{
            const res = await clientAxios.delete(`http://localhost:4000/api/modulos/${id}`)
            dispatch({
                type: ELIMINAR_MODULO,
                payload: id
            })
        }catch(err){
            console.log(err)
        }
    } 

    return(
        <moduleContext.Provider
            value={{
                modules: state.modules,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                module: state.module,
                mostrarFormulario,
                obtenerModulos,
                agregarModulo,
                mostrarError,
                moduloActual,
                eliminarModulo
            }}
        >
            {props.children}
        </moduleContext.Provider>
    )
}

export default ModuleState 