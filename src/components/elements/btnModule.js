import React, { useContext } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import sectionContext from '../../context/sections/sectionContext';
import { Ai } from "../../config/icons"


const nextModule = (obtenerSecciones, moduloActual, id) => {
    moduloActual(id)
    obtenerSecciones(id)
    
}

export const BtnModule = ({id, content}) => {
    if(content.icon){
        console.log(content.icon)
    }
    const modulesContext = useContext(moduleContext);
    const { moduloActual } = modulesContext;

    const sectionsContext = useContext(sectionContext);
    const {obtenerSecciones} = sectionsContext;

    return(
        <button className="btn btn-blank" type="button" onClick={() => nextModule(obtenerSecciones, moduloActual, id)}>
            {content.icon}
        </button>)
}

export default BtnModule;