/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import {VscAdd} from "react-icons/vsc";
import ZonaContext from '../../../context/zonas/zonaContext';
import { Ai } from "../../../config/icons"
import { Example } from '../../layout/Modals'

const ZONAS = () => {
    const zonaContext = useContext(ZonaContext);
    const { zonas } = zonaContext;


    return (
            <div className="contenedor-template">
                <div className="template-contenedor">
                    <h3 className="titulo-template">Zonas<hr/></h3>
                </div>
                <div className="data-contenedor">
                    <ul>
                        {zonas ? zonas.map(zona => (
                            <li key={zona._id}>
                                <button className="btn btn-blank">
                                    <Ai name={zona.icon}/>
                                    {zona.nombre}

                                </button>
                                <Example/>
                            </li>
                            )): null}
                    </ul>
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
    nombre: "Zonas",
    template: ZONAS
};
