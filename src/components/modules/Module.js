import React, { useContext, useEffect, useState } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import sectionContext from '../../context/sections/sectionContext';
import settingsContext from '../../context/settings/settingsContext';
import { Ai } from "../../config/icons"
import { Card, Col, Nav, Row } from 'react-bootstrap';

const Module = ({module}) => {
    const modulesContext = useContext(moduleContext);
    const { moduloActual } = modulesContext; 
    
    const sectionsContext = useContext(sectionContext);
    const {obtenerSecciones} = sectionsContext;

    const settingContext = useContext(settingsContext);
    const { selectOption } = settingContext;

    //Funcion para agregar el proyecto actual
    const seleccionarModulo = async id => {
        moduloActual(id) //Fijar modulo actual
        obtenerSecciones(id) //Filtrar secciones
        selectOption(null);
    }
    
    return(
        <Nav.Link onClick={() => seleccionarModulo(module._id)} className="module-list-element">
            <Card className="module-element-list transparent">
                <Row>
                    <Col xs={1} className="module-icon">
                        <div className="module-icon">
                            <Ai name={module.icon}/> 
                        </div>
                    </Col>
                    <Col xs={7} className="module-text">
                        <div>
                            {window.screen.width > 840 ? (<label className="sidebar-modules">{module.nombre}</label>) : null}
                        </div>
                    </Col>
                </Row>
            </Card>
        </Nav.Link>
    )
}

export default Module;