import React, { useReducer } from 'react';
import inspectorsReducer from './inspectorsReducer';
import InspectorsContext  from './inspectorsContext';
import clientAxios from '../../config/axios';
import { 
    GUARDAR_INSPECTOR,
    OBTENER_INSPECTORES
} from '../../types'

const InspectorsState = props => {
    const initialState = {
        inpector: [],
        inspectores: [],
    }
    const [state, dispatch] = useReducer(inspectorsReducer, initialState)

    const guardarInspector = async inspector => {
        try{
            const res = await clientAxios.post('/api/inspector', inspector);
            if(res.data.success){
                let data = res.data.result;
                dispatch({
                    type: GUARDAR_INSPECTOR, 
                    payload: inspector
                })
                return {
                    id: data._id,
                    success: res.data.success
                }
            } else {
                return res.data
            }
        }catch(err){
            console.log(err)
        }
    }

    const obtenerInspectores = async () => {
        try{
            const res = await clientAxios.get('/api/inspector')
            dispatch({
                type: OBTENER_INSPECTORES,
                payload: res.data.result
            })
        } catch(err){
            console.log(err)
        }
    }
    
    return(
        <InspectorsContext.Provider value={{
            inspector: state.inspector,
            inspectores: state.inspectores,
            guardarInspector,
            obtenerInspectores
        }}>
            {props.children}
        </InspectorsContext.Provider>
    )
}

export default InspectorsState;
