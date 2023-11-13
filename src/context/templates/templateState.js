import React, { useReducer } from 'react';
import templateReducer from './templateReducer';
import TemplateContext from './templateContext';
import clientAxios from '../../config/axios';
import { OBTENER_TEMPLATES} from '../../types'

const TemplateState = props => {
    const initialState = {
        template: []
    }
    const [state, dispatch] = useReducer(templateReducer, initialState)

    const obtenerTemplates = async () => {
        console.log("...loading tamplates")
        try{
            const result = await clientAxios.get(`/api/template`)
            dispatch({
                type: OBTENER_TEMPLATES,
                payload: result.data.template
            })
            return result.data.template
        }catch(err){
            console.log(err)
        }
    }

    return(
        <TemplateContext.Provider value={{
            template: state.template,
            obtenerTemplates
        }}>
            {props.children}
        </TemplateContext.Provider>
    )
}

export default TemplateState;
