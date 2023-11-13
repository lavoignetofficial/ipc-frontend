import React from 'react';
import Componente from '../../components/templates'

const Template = ({section}) => {
    return (
        <div className="seccion sombra">
            <Componente nombre={section.nombre}/>
        </div>
    )
}

export default Template;