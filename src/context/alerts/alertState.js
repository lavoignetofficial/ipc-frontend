import React, { useReducer } from 'react'
import alertReducer from './alertReducer'
import alertsContext from './alertsContext'

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types'

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    const mostrarAlerta = (msg, category) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg, 
                category
            }
        })

        setTimeout(()=>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }

    return(
        <alertsContext.Provider
            value={{
                alert: state.alert,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertsContext.Provider>
    )
}

export default AlertState;  