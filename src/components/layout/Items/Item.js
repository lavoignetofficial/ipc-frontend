import React, { useContext, useEffect, useState } from 'react';
import itemsContext from '../../../context/items/itemsContext';
import { Ai } from "../../../config/icons"
import NewItem from './NewItem';
import ListItems from './ListItems';
import { 
    Accordion, 
    Card, 
    Container, 
    Button, 
    Row, 
    Col
} from 'react-bootstrap';

const Item = ({zonas, actionFields, elementos}) => {
    const itemContext = useContext(itemsContext);
    const { 
        newItem, 
        mostrarItem, 
        viewItem, 
        view, 
        obtenerItems,
        items
    } = itemContext;
    
    const [inspeccion, saveInspeccion] = useState({
        type: "basica"
    });
    const {fields} = actionFields;
    const [elemento, guardarElemento] = useState([]);
    
    useEffect(()=>{
        if(elementos.length > 0){
            guardarElemento(elementos)
        }
    },[elementos])

    useEffect(()=>{
        guardarElemento(fields.items)
    },[fields.items])
    const onClick = () => {
        view(true);
    }

    const ocultar = async (nombre) => {
        mostrarItem(nombre);
        obtenerItems();
    }

    const handleChange = e => {
        saveInspeccion({
            type: e.target.value             
        })
    }

    return (
        <div>
            <Container className="space-display-bottom">
                <Row>
                    <Col xs={4}>
                    </Col>
                    <Col xs={4}>
                        <p className="center">Tipo de inspección</p>
                        <select
                            id="tipoInspeccion"
                            name="tipoInspeccion"
                            onChange={handleChange}
                            value={inspeccion["type"]}
                            className="select-custom space-display-bottom-md"
                        >
                            <option value="NaN">Seleccionar...</option>
                            <option value="basica">Básica</option>
                            <option value="avanzada">Avanzada</option>
                        </select>
                    </Col>
                    <Col xs={4}>
                    </Col>
                </Row>
            </Container>
            {zonas ? zonas.map((zona, i) => {
                if(inspeccion.type !== zona.inspeccion){
                    if(inspeccion.type === "basica"){
                        return;
                    }
                }
                return (
                    <Accordion key={i}>
                        <Accordion.Item eventKey={i} key={i}>
                            <Accordion.Header onClick={() => ocultar(zona.nombre)}>
                            <Ai name={zona.icon}/>{zona.nombre}
                            </Accordion.Header>
                            <Accordion.Body>
                                {viewItem === zona.nombre ? 
                                    <>
                                        {newItem ? 
                                            <NewItem 
                                                zona={{id:zona._id, nombre: zona.nombre}} 
                                                items={items} 
                                                view={view} 
                                                actionElements={{elemento: elemento, guardarElemento: guardarElemento}}
                                                actionFields={actionFields}
                                            />:(
                                                <Card className="center transparent">
                                                    <ListItems zona={zona.nombre} items={elemento} actionFields={actionFields}/>
                                                    <Row>
                                                        <Col xs={5} sm={5}></Col>
                                                        <Col xs={2} sm={2}>
                                                            <Button type="button" onClick={onClick} className="color-principal">
                                                                <Ai name="AiFillPlusCircle" />
                                                            </Button>
                                                        </Col>
                                                        <Col xs={5} sm={5}></Col>

                                                    </Row>
                                                </Card>
                                            )}
                                    </> 
                                : null}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>)
            })
             : (<p>no hay nada</p>)}
        </div>
    )
}

export default Item;