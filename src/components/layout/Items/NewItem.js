import React, { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import fileContext from '../../../context/files/fileContext';
import PropertyContext from '../../../context/properties/propertyContext';
import Property from '../../layout/Property'

const NewItem = ({zona, items, view, actionElements, actionFields}) => {
    const propertiesContext = useContext(PropertyContext);
    const { properties } = propertiesContext;

    const filesContext = useContext(fileContext);
    const { uploadFilesItem, files, filesItems } = filesContext;

    const {fields, saveField} = actionFields;
    const {elemento, guardarElemento} = actionElements;

    useEffect(()=>{
        saveField({
            ...fields,
            items: elemento
        })
    },[elemento])

    const [itms, saveItem] = useState({
        name: "",
        itm:{},
    });

    const [img, saveImg] = useState();

    const saveNewItem = async () => {
        const keys = Object.keys(itms.itm);
        let selectItem = items.filter(i => i._id === itms.itm["name-item"])

        for(let key of keys){
            if(itms.itm[key].trim() === ""){
                console.log(`El campo ${key} es obligatorio`)
                return;
            }
        }

        let data = null;

        if(img){
            data = await uploadFilesItem(img.files)
        }

        guardarElemento([
            ...elemento,
            {zona: zona,
            name: `${selectItem[0].nombre}-${itms.itm["Ubicación"]}`,
            data: itms.itm,
            files: img ? data.key : null}
        ])

        view(false)
    }

    const handleChange = async e => {
        if(e.target.name === "Fotografías"){
            saveImg({
                ...img,
                files: e.target.files[0]
            })
        }
        saveItem({
            ...itms,
            itm:{
                ...itms.itm,
                [e.target.name]: e.target.value 
            }             
        })
    }

    const onClick = () => {
        view(false)
    }

    return (
        <Form className="list-item-conetenedor" id="new-item">
            <Row>
                <Col xs={2}></Col>
                <Col xs={2}>
                    <label>Item:</label>
                </Col>
                <Col xs={6}>
                    <select 
                        className="type-new-item select-custom"
                        onChange={handleChange}
                        name="name-item"
                        value={itms.itm["name-item"]}>
                            <option selected>Seleccione una opción...</option>
                            {items.map((item, i) => {
                                if(item.asignToZone === zona.id){
                                    return(
                                        <option value={item._id}>{item.nombre}</option>
                                    )
                                }
                            })}
                    </select>    
                </Col>
                <Col xs={2}></Col>
            </Row>
                {properties ? 
                properties.map((property, i) => {
                    if(property.itemAsign !== null){
                        if(property.itemAsign === itms.itm["name-item"]){
                            return (<Property 
                                key={i} 
                                property={property} 
                                handleChange={handleChange}
                                itms={itms}
                            />)
                        }
                    } else {
                        return (<Property 
                            key={i} 
                            property={property} 
                            handleChange={handleChange}
                            itms={itms}
                            saveImg={saveImg}
                        />)
                    }
                }) : null}
            <div>
                <div className="right">
                    <Row className="space-display-bottom-md space-display-top">
                        <Col xs={2} md={1}></Col>
                        <Col xs={4} md={5} className="right">
                            <button className="btn color-principal white-color txt-size-12" type="button" onClick={onClick}>Cancel</button>
                        </Col>
                        <Col xs={4} md={5} className="left">
                            <button className="btn color-principal white-color txt-size-12" type="button" onClick={saveNewItem}>Guardar Item</button>
                        </Col>
                        <Col xs={2} md={1}></Col>
                    </Row>
                </div>
            </div>
        </Form>
    )    
}

export default NewItem;