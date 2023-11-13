import React, { Fragment, useContext, useState } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import {AiOutlinePlus} from "react-icons/ai";

const NewModule = () =>{
    // Obtener el state del formulario
    const modulesContext = useContext(moduleContext);
    const { 
        formulario, 
        errorFormulario, 
        mostrarFormulario, 
        agregarModulo, 
        mostrarError
    } = modulesContext; 

    const [module, saveModule] = useState({
        nombre:''
    })

    const { nombre } = module;

    const onChangeModule = e =>{
        saveModule({
            ...module,
            [e.target.name] : e.target.value
        })
    }
    // Cuando el usuario envia un proyecto
    const onSubmitModule = e => {
        e.preventDefault();
        // Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        // agregar al state
        agregarModulo(module)

        // Reiniciar el form
        saveModule({
            nombre:''
        })
        
    }

    return(
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            ><AiOutlinePlus className="icon-new-module"/>Nuevo Módulo</button>
            { formulario ? 
            (
                <form className="formulario-nuevo-proyecto" onSubmit={onSubmitModule}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre del proyecto"
                        onChange={onChangeModule}
                        value={nombre}
                        name="nombre"
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Módulo"
                    />
                </form>
            ): null}
            {errorFormulario ? <p className="mensaje error">El nombre del módulo es obligatorio.</p>: null}
        </Fragment>
    )
}

export default NewModule;