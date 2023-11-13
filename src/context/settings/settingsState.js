import React, { useReducer } from 'react';
import settingsContext from './settingsContext';
import settingsReducers from './settingsReducers';

import {
    VALIDAR_AJUSTES,
    MOSTRAR_OPCION
} from '../../types';

const SettingsState = props => {
    const initialState = {
        viewSettings: false,
        option: null
    }

    const [state, dispatch] = useReducer(settingsReducers, initialState)

    const validarAjustes = validate => {
        dispatch({
            type: VALIDAR_AJUSTES,
            payload: validate
        })
    }

    const selectOption = desc =>{
        dispatch({
            type: MOSTRAR_OPCION,
            payload: desc
        })
    }

    return(
        <settingsContext.Provider
            value={{
                viewSettings: state.viewSettings,
                option: state.option,
                selectOption,
                validarAjustes
            }}
        >
            {props.children}
        </settingsContext.Provider>
    )
}

export default SettingsState;