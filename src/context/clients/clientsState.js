import React, { useReducer } from 'react';
import clientsReducer from './clientsReducer';
import ClientsContext  from './clientsContext';
import clientAxios from '../../config/axios';
import { 
    GUARDAR_CLIENTE,
    OBTENER_CLIENTES
} from '../../types'

const ClientsState = props => {
    const initialState = {
        cliente: [],
        clientes: [],
    }
    const [state, dispatch] = useReducer(clientsReducer, initialState)

    const guardarCliente = async cliente => {
        try{
            const res = await clientAxios.post('/api/client', cliente);
            if(res.data.success){
                let data = res.data.result;
                dispatch({
                    type: GUARDAR_CLIENTE, 
                    payload: cliente
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

    const obtenerClientes = async () => {
        try{
            const res = await clientAxios.get('/api/client')
            dispatch({
                type: OBTENER_CLIENTES,
                payload: res.data.result
            })
        } catch(err){
            console.log(err)
        }
    }
    
    return(
        <ClientsContext.Provider value={{
            cliente: state.cliente,
            clientes: state.clientes,
            guardarCliente,
            obtenerClientes
        }}>
            {props.children}
        </ClientsContext.Provider>
    )
}

export default ClientsState;
