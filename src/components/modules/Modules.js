import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
import settingsContext from '../../context/settings/settingsContext';
import Settings from '../layout/Settings/Settings';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormSection from '../sections/FormSection';
import ListSections from '../sections/ListSections';
import ListSectionUser from '../sections/ListSectionUser';
import { Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modules = () => {
    // Extraer la info de autentificación.
    const authToken = useContext(AuthContext);
    const { usuarioAutenticado, usuario } = authToken;

    const settingContext = useContext(settingsContext);
    const { viewSettings, option } = settingContext;

    useEffect(()=>{
        usuarioAutenticado();
    }, [])

    if(usuario !== null){
        return(
            <div className="contenedor-app">
                <Barra/>
                <Form className="full-display">
                    <Row className="full-display">
                        <Col xs={2} sm={3} md={2} lg={2} className={window.innerWidth > 575 ? "sidebar-contenedor": "sidebar-contenedor-xs"}>
                            <Sidebar/>
                        </Col>
                        <Col xs={10} sm={9} md={10} lg={10} className="content-contenedor">
                        { option && usuario !== null ?  
                            <Settings option={option}/>
                            :viewSettings && usuario.permission === "master"? 
                            (<div>
                                    <FormSection/>
                                    <div className="contenedor-secciones">
                                        <ListSections ajustes={viewSettings}/>
                                    </div>
                            </div>
                        ): (<div className="contenedor-secciones">
                            <ListSectionUser/>
                        </div>)}
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }else {
        return(
            <h1>Bienvenido</h1>
        )
    }
}

export default Modules;