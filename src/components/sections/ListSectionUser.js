import React, { Fragment, useContext, useEffect } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import sectionContext from '../../context/sections/sectionContext';
import Template from '../layout/Template';
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import TemplateContext from '../../context/templates/templateContext';
import FormatoContext from '../../context/formatos/formatoContext';
import ZonaContext from '../../context/zonas/zonaContext';
import { Container } from 'react-bootstrap';

const ListSectionUser = () => {
    const templateContext = useContext(TemplateContext);
    const { obtenerTemplates } = templateContext;
  
    const modulesContext = useContext(moduleContext);
    const { module } = modulesContext;
    
    const sectionsContext = useContext(sectionContext);
    const { sectionsModules } = sectionsContext;

    const formatoContext = useContext(FormatoContext);
    const { obtenerFormatos, formatos, seleccionarFormato, formatoActual } = formatoContext;

    const zonaContext = useContext(ZonaContext);
    const { obtenerZonas } = zonaContext;
    
    useEffect(() => {
        obtenerTemplates()
        obtenerFormatos()
    }, [])
    // Si no hay ningún proyecto seleccionado
    if(!module) return (
        <Container className="module-welcolme">
            <h2>Bienvenido</h2>
        </Container>
    )
    
    // Array destruction
    const [actual] = module;

    const onChange = async e =>{
        seleccionarFormato(e.target.value)
        obtenerZonas(e.target.value)
    }

    return(
        <Container className="view-user">
            {actual.nombre==="Plantillas" ? 
                (<div>
                    <h1 className="titulo center">{actual.nombre}</h1>
                    <div className="contenedor-select-plantillas">
                        <button className="btn btn-primario margin-button">Nueva Plantilla</button>
                        <select onChange={onChange} className="select-plantillas">
                            <option disabled selected>Mis Plantillas</option>
                            {formatos.map(formato => (
                                <option value={formato._id} key={formato._id}>
                                    {formato.nombre}
                                </option>))}
                        </select>
                    </div>
                </div>) :
                (<h2 className="titulo center">{actual.nombre}</h2>)
            }
            <ul className="listado-secciones-users">
                { sectionsModules.length === 0 ?
                    (<li className="seccion"><p>El módulo esta vacío.</p></li>) :
                    <TransitionGroup>
                        {sectionsModules.map(section => 
                            (<CSSTransition 
                                key={section._id}
                                timeout={200}
                                classNames="seccion"
                            >
                                <Template section={section}/>
                            </CSSTransition>)
                        )}
                    </TransitionGroup>
                }
            </ul>
        </Container>
    )
}

export default ListSectionUser;