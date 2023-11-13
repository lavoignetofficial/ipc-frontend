import React, { useReducer } from 'react';
import formsReducer from './formsReducer';
import FormsContext  from './formsContext';
import clientAxios from '../../config/axios';
import { 
    OBTENER_FORMS,
    GUARDAR_FORMS,
    SELECT_FORM,
    MODIFICAR_FORMS
} from '../../types'

const FormsState = props => {
    const initialState = {
        forms: [],
        form: {}
    }
    const [state, dispatch] = useReducer(formsReducer, initialState)

    const guardarForm = async newForm => {
        try{
            const res = await clientAxios.post('/api/forms', newForm);
            if(res.data.success){
                let data = res.data.result;
                dispatch({
                    type: GUARDAR_FORMS, 
                    payload: data 
                })
                return data;
            } else {
                return res.data
            }
        }catch(err){
            console.log(err)
        }
    }

    const obtenerForms = async () => {
        try{
            const res = await clientAxios.get('/api/forms')
            dispatch({
                type: OBTENER_FORMS,
                payload: res.data.result
            })
        } catch(err){
            console.log(err)
        }
    }

    const selectFormActual = async form => {
        dispatch({
            type: SELECT_FORM,
            payload: form
        })
    }
    
    const modificarForm = async (id, form) => {
        try{
            const res = await clientAxios.put(`/api/forms/${id}`, form)
            console.log(res)
        } catch(err){
            console.log(err)
        }
    }

    return(
        <FormsContext.Provider value={{
            forms: state.forms,
            formActual: state.formActual,
            obtenerForms,
            guardarForm,
            selectFormActual,
            modificarForm
        }}>
            {props.children}
        </FormsContext.Provider>
    )
}

export default FormsState;
