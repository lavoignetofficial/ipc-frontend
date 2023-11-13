import React, { useReducer } from 'react';
import FileContext  from './fileContext';
import FileReducer  from './fileReducer';
import {v4 as uuidv4 } from 'uuid'
import clientAxios from '../../config/axios';

import { 
    ARCHIVOS_SUBIR,
    ARCHIVOS_SUBIDOS,
    ARCHIVOS_ERROR,
    ARCHIVOS_CARGADOS,
    ARCHIVOS_ITEMS_SUBIDOS
} from '../../types'

const FileState = props => {
    const initialState = {
        files: [],
        filesItems: [],
        error: ""
    }

    const [state, dispatch] = useReducer(FileReducer, initialState)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const uploadFilesAdjunt = async (file) => { 
        try{
            const formData = new FormData();
            formData.append("file", file)
            let result = await clientAxios.post('/api/files/images', formData, config)
            dispatch({
                type: ARCHIVOS_SUBIDOS,
                payload: {
                    name: result.data.name,
                    location: result.data.key
                }
            })
        }catch (err){
            dispatch({
                type: ARCHIVOS_ERROR,
                payload: err
            })
        }
    }

    const uploadFilesItem = async (file) => {
        try{
            const formData = new FormData();
            formData.append("file", file)
            let result = await clientAxios.post('/api/files/images', formData, config)
            dispatch({
                type: ARCHIVOS_ITEMS_SUBIDOS,
                payload: {
                    name: result.data.name,
                    location: result.data.key
                }
            })

            return {
                key: result.data.key
            };
        }catch (err){
            dispatch({
                type: ARCHIVOS_ERROR,
                payload: err
            })
        }
    }

    const getImages = async dir => {
        try{
            let result = await clientAxios.post('/api/files/getImages', {dir: dir})
            let data = result.data
            if(data.success){
                dispatch({
                    type: ARCHIVOS_CARGADOS,
                    payload: {
                        src: data.src,
                        success: data.success
                    }
                })
            
                return data.src
            }else{
                dispatch({
                    type: ARCHIVOS_CARGADOS,
                    payload: {
                        src: data.src,
                        success: data.success
                    }
                })
                return data;
            }
        }catch(err){
            console.log(err)
        }
    }
    
    return(
        <FileContext.Provider value={{
            files: state.files,
            filesItems: state.filesItems,
            error: state.error,
            uploadFilesAdjunt,
            getImages,
            uploadFilesItem
        }}>
            {props.children}
        </FileContext.Provider>
    )
}

export default FileState;
