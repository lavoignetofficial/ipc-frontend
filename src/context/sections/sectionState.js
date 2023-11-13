import React, { useReducer } from 'react';
import SectionContext from './sectionContext';
import SectionReducers from './sectionReducers';
import clientAxios from '../../../src/config/axios'

import { 
    SECCIONES_MODULO,
    AGREGAR_SECCION,
    VALIDAR_SECCION,
    ELIMINAR_SECCION,
    ESTADO_SECCION,
    SECCION_ACTUAL,
    ACTUALIZAR_SECCION,
    LIMPIAR_SECCION
} from '../../types';


const SectionState = props => {
    const initialState = {
        sectionsModules: [],
        errorSection: false,
        seccionSeleccionada: null
    }

    const [state, dispatch] = useReducer(SectionReducers, initialState)

    // Crear las funciones

    // Obtener secciones del modulo

    const obtenerSecciones = async modulo =>{
        try{
            const res = await clientAxios.get('/api/sections', {params:{modulo}})
            dispatch({
                type: SECCIONES_MODULO,
                payload: res.data.secciones
            })
        } catch(err){
            console.log(err.status)

        }
    }

    const agregarSección = async section => {
        try{
            const res = await clientAxios.post('/api/sections', section)
            dispatch({
                type: AGREGAR_SECCION,
                payload: res
            })
        }catch(err){
            console.log(err)
        }
    }

    const validarSeccion = () => {
        dispatch({
            type: VALIDAR_SECCION
        })
    }

    const eliminarSeccion = id => {
        dispatch({
            type: ELIMINAR_SECCION,
            payload: id
        })
    }

    const cambiarEstado = async val => {
        try{
            await clientAxios.put(`/api/sections/${val._id}`, {modulo:val.modulo, estado: val.estado})
            dispatch({
                type: ESTADO_SECCION,
                payload: val
            })
        }catch(err){
            console.log(err)    
        }
    }

    const guardarSeccionActual = seccion => {
        dispatch({
            type: SECCION_ACTUAL,
            payload: seccion
        })
    }

    const modificaSeccion = seccion => {
        dispatch({
            type: ACTUALIZAR_SECCION,
            payload: seccion
        })
    }

    // Elimina seccion seleccionada
    const limpiarSeccion = () => {
        dispatch({
            type: LIMPIAR_SECCION
        })
    }
    return(
        <SectionContext.Provider
            value={{
                sectionsModules: state.sectionsModules,
                errorSeccion: state.errorSection,
                estado: state.estado,
                seccionSeleccionada: state.seccionSeleccionada, 
                obtenerSecciones,
                agregarSección,
                validarSeccion,
                eliminarSeccion,
                cambiarEstado,
                guardarSeccionActual,
                modificaSeccion,
                limpiarSeccion
            }}
        >
            {props.children}
        </SectionContext.Provider>
    )

}

export default SectionState;
