import React, { useContext, useEffect } from 'react';
import moduleContext from '../../context/modules/moduleContext';
import Module from './Module';
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import { Nav } from 'react-bootstrap';

const List = () => {

    // Extraer proyectos de state inicial
    const modulesContext = useContext(moduleContext);
    const { modules, obtenerModulos } = modulesContext;

    // Obtener proyectos cuando carga el componente.
    useEffect(()=>{
        obtenerModulos();
        //eslint.disable-next-line
    }, []);

    // verificar si modulos tienen contenido
    if(modules.length === 0) return null;

    return(
        <Nav defaultActiveKey="/home" className="flex-column">
            <TransitionGroup>
                {modules.map(module =>{
                    if(module){
                        if(module._id !== "616b4ebf7d9e48349cf3b259"){
                            return (<CSSTransition 
                                key={module._id}
                                timeout={300}
                                classNames="proyecto"
                                >
                                <Module module={module}/>
                            </CSSTransition>)
                        }
                    }
                })}
            </TransitionGroup>
        </Nav>
    )
}

export default List;