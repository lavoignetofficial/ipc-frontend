import React, { Fragment, useContext } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import sectionContext from '../../context/sections/sectionContext';
import Section from './Section';
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import { Container } from 'react-bootstrap';

const ListSections = () => {
    const modulesContext = useContext(moduleContext);
    const { module, eliminarModulo } = modulesContext;
    
    const sectionsContext = useContext(sectionContext);
    const { sectionsModules } = sectionsContext;

    // Si no hay ningún proyecto seleccionado
    if(!module) return (
        <Container className="module-welcolme">
            <h2>Bienvenido</h2>
        </Container>
    )
    // Array destruction
    const [actual] = module;

    const onClickEliminar = () => {
        eliminarModulo(actual._id)
    } 

    return(
        <Container>
            <h2 className="center">Módulo:  {actual.nombre}</h2>
            <ul className="listado-secciones">
                { sectionsModules.length === 0 ?
                    (<li className="seccion"><p>No hay tareas</p></li>) :
                    <TransitionGroup>
                        {sectionsModules.map(section => 
                            (<CSSTransition 
                                key={section._id}
                                timeout={200}
                                classNames="seccion"
                                >
                                <Section section={section}/>
                            </CSSTransition>)
                        )}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar módulo &times;</button>
            
        </Container>
    )
}

export default ListSections;