import React, { useContext } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import sectionContext from '../../context/sections/sectionContext';

const Section = ({section}) =>{
    const sectionsContext = useContext(sectionContext)
    const { eliminarSeccion, obtenerSecciones, cambiarEstado, guardarSeccionActual } = sectionsContext;

    const modulesContext = useContext(moduleContext);
    const { module } = modulesContext;
    
    if(!module) return
    const [actual] = module;

    const onClickDelete = id => {
        // eliminarSeccion(id)
        // obtenerSecciones(actual._id)
    }
    
    const onChangeState = data =>{
        data.estado = data.estado ? false : true; 
        cambiarEstado(data)
    }

    const seleccionarSeccion = seccion => {
        guardarSeccionActual(seccion)
    }

    return(
        <li className="seccion sombra" >
            <p>{section.nombre}</p>
            <p>{section.template}</p>
            <div className="estado">
                {section.estado ? 
                    (<button
                        type="button"    
                        className="completo"
                        onClick={() => onChangeState(section)}
                    >Habilitado</button>)
                : (<button
                    type="button"    
                    className="incompleto" 
                    onClick={() => onChangeState(section)}
                >Inhabilitado</button>)}
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarSeccion(section)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickDelete(section.id)}
                >Eliminar</button>
            </div>
        </li>
    )

}

export default Section;