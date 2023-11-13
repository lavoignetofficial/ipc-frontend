import React, { useContext, useState, useEffect } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import sectionContext from '../../context/sections/sectionContext';

const FormSection = () =>{
    const modulesContext = useContext(moduleContext);
    const { module } = modulesContext;

    const sectionsContext = useContext(sectionContext);
    const { 
        seccionSeleccionada,
        errorSeccion, 
        agregarSección, 
        validarSeccion, 
        obtenerSecciones,
        modificaSeccion,
        limpiarSeccion
    } = sectionsContext;
    
    useEffect(()=>{
        if(seccionSeleccionada!==null){
            saveSection(seccionSeleccionada)
        }else{
            saveSection({nombre:''})
        }
    },[seccionSeleccionada])
    const [section, saveSection] = useState({
        nombre: '',
    })
    
    const { nombre } = section;
    
    if(!module) return null

    const [actual] = module;

    //Leer los valores del formulario
    const handleChange = e => {
        saveSection({
            ...section,
            [e.target.name]:e.target.value
        })
    }


    const onSubmit = e =>{
        e.preventDefault()

        //validar
        if(nombre.trim() === ''){
            validarSeccion()
            return;
        }

        // Si es edicion
        if(seccionSeleccionada===null){
            //agregar la nueva seccion al state de secciones
            section.modulo = actual._id
            section.estado = false
            agregarSección(section)
            
            //reiniciar el form
            saveSection({
                nombre: ''
            })
        }else{
            modificaSeccion(section);
            limpiarSeccion();
        }
        

        //Obtener secciones
        obtenerSecciones(actual._id)
    }

    return(
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la sección"
                        value={nombre}
                        onChange={handleChange}
                        name="nombre"
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={seccionSeleccionada ? "Editar sección" : "Agregar sección"}
                        />

                </div>
            </form>
            {errorSeccion ? <p className="mensaje error">El nombre de la sección es incorrecta</p> : null}
        </div>
    )
}

export default FormSection;