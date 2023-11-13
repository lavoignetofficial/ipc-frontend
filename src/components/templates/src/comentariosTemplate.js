/* eslint-disable import/no-anonymous-default-export */
import {VscAdd} from "react-icons/vsc";
import React from 'react';

const COMENTARIOS = props => {
    return (
        <div className="contenedor-template">
            <div className="template-contenedor">
                <h3 className="titulo-template">Comentarios<hr/></h3>
            </div>
            <div className="template-contenedor">
            </div>
            <div className="template-contenedor centrar">
                <button className="btn btn-primario btn-seccion">
                    <div className="icon-div">
                        <VscAdd/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default {
    nombre: "Comentarios",
    template: COMENTARIOS
};