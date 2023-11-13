/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState } from 'react';
import GoogleMaps from '../../../config/GoogleMaps';
import clientsContext from '../../../context/clients/clientsContext';
import zonaContext from '../../../context/zonas/zonaContext';
import Item from '../../layout/Items/Item'
import formsContext from '../../../context/forms/formsContext';
import AuthContext from '../../../context/authentication/authContext';
import PropertyContext from '../../../context/properties/propertyContext';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import Option from '../../elements/option'
import TextField from '../../elements/textField'
import moduleContext from '../../../context/modules/moduleContext';
import sectionContext from '../../../context/sections/sectionContext';
import UploadFiles from '../../../functions/uploadFiles';
import fileContext from '../../../context/files/fileContext';

export const FORMULARIO = props => {
    let client, inspector = {};

    const filesContext = useContext(fileContext);
    const { uploadFilesAdjunt } = filesContext;

    const zonasContext = useContext(zonaContext);
    const { obtenerZonas, zonas } = zonasContext;

    const modulesContext = useContext(moduleContext);
    const { moduloActual } = modulesContext;

    const sectionsContext = useContext(sectionContext);
    const {obtenerSecciones} = sectionsContext;

    const clientContext = useContext(clientsContext);
    const { guardarCliente, obtenerClientes, clientes } = clientContext;

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado } = authContext;

    const formContext = useContext(formsContext);
    const { guardarForm } = formContext;

    const propertiesContext = useContext(PropertyContext);
    const { obtenerPropiedades } = propertiesContext;
    
    const disabledField = val => {
        document.getElementById("customerName").disabled = val;
        document.getElementById("customerAddress").disabled = val;
        document.getElementById("customerSuburb").disabled = val;
        document.getElementById("customerCity").disabled = val;
        document.getElementById("customerPostalCode").disabled = val;
    }
    
    let customer;
    useEffect(()=>{
        obtenerZonas()
        obtenerClientes()
        usuarioAutenticado()
        obtenerPropiedades()
    }, []);

    const [fields, saveField] = useState({});

    useEffect(()=>{
        if(fields.numeroCliente){
            if(fields.numeroCliente !== "NaN"){
                customer = clientes.filter(cliente => cliente._id === fields.numeroCliente)
                console.log(customer)
                saveField({
                    ...fields,
                    customerName:       customer[0].nombre,
                    customerAddress:    customer[0].direccion,
                    customerSuburb:     customer[0].colonia,
                    customerCity:       customer[0].ciudad,
                    customerPostalCode: customer[0].codigoPostal
                })
                disabledField(true);
            }else{
                saveField({
                    ...fields,
                    customerName:       "",
                    customerAddress:    "",
                    customerSuburb:     "",
                    customerCity:       "",
                    customerPostalCode: ""
                })
                disabledField(false);
            }
        }
    },[fields.numeroCliente])

    const onSubmit = async e =>{
        if(typeof fields.numeroCliente==='undefined' || fields.numeroCliente==="NaN"){
            if(fields.customerName         && 
                fields.customerAddress     && 
                fields.customerSuburb      && 
                fields.customerPostalCode  && 
                fields.customerCity){
                client = await guardarCliente({
                        nombre: fields.customerName,
                        direccion: fields.customerAddress,
                        colonia: fields.customerSuburb,
                        ciudad: fields.customerCity,
                        estado: fields.customerCountry,
                        codigoPostal: fields.customerPostalCode,
                    })
                fields.numeroCliente = client.id
            }else{
                console.log("Los datos del cliente son obligatorios")
            }
        }

        if(await usuario){
            inspector["id"] = `${usuario._id}`
            fields.numeroInspector = inspector.id
        }

        await guardarForm({
            pisos: fields.formsFloors,
            archivos: fields.formsAdjuntfiles,
            construccion: fields.formsConstruction,
            tipoInmueble: fields.formsTypeInm,
            cliente: fields.numeroCliente,
            inspector: fields.numeroInspector,
            items: fields.items ? fields.items : []
        })

        fields.numeroCliente = "NaN"
        
        if(fields.attachment) uploadFilesAdjunt(fields.attachment.formData)

        moduloActual("616206b5e66be427b031cdf1")
        obtenerSecciones("616206b5e66be427b031cdf1")
    } 

    const handleChange = e => {
        if(e.target.name === "formsAdjuntfiles"){
            let file = e.target.files[0];

            saveField({
                ...fields,
                [e.target.name]: `${fields.inspectorFiles}-${file.name}`             
            })
        }
        saveField({
            ...fields,
            [e.target.name]: e.target.value             
        })
    }


    return (
        <Container className="card-template">
                <Card style={{ width: '100%' }} className="space-display-bottom">
                  <Card.Body>
                    <Card.Title>Datos del cliente</Card.Title>
                    <Row>
                        <Col xs={12} sm={12} md={7} sm={7}>
                            <Row className="space-display-bottom-md">
                                <Col className="space-display-top" sm={4}>
                                    <Card className="transparent left">
                                        <Card.Text className="text-field">Cliente:</Card.Text>
                                    </Card>
                                </Col>
                                <Col sm={8}>
                                    <Card className="transparent">
                                        <select
                                            className="select-custom space-display-top"
                                            id="numeroCliente"
                                            name="numeroCliente"
                                            onChange={handleChange}
                                            value={fields["numeroCliente"]}
                                        >
                                            <option value="NaN">Seleccionar...</option>
                                            {clientes.map((client,i) => (
                                                <Option key={i} value={client._id} txt={client.nombre}/>
                                            ))}
                                        </select>
                                    </Card>
                                </Col>
                            </Row>
                            <Card className="space-display-bottom-md">
                                <TextField
                                    id="customerName"
                                    name="customerName"
                                    label="Nombre del Cliente" 
                                    variant="standard"
                                    value={fields["customerName"]}
                                    onChange={handleChange}
                                />
                            </Card>
                            <Card className="space-display-bottom-md">
                                <TextField
                                        id="customerAddress"
                                        name="customerAddress"
                                        label="Calle y número" 
                                        variant="standard"
                                        value={fields["customerAddress"]}
                                        onChange={handleChange}
                                    />
                            </Card>
                            <Card className="space-display-bottom-md">
                                <TextField
                                    id="customerSuburb"
                                    name="customerSuburb"
                                    label="Colonia" 
                                    variant="standard"
                                    value={fields["customerSuburb"]}
                                    onChange={handleChange}
                                />
                            </Card>
                            <Card className="space-display-bottom-md">
                                <TextField
                                    id="customerCity"
                                    name="customerCity"
                                    label="Ciudad" 
                                    variant="standard"
                                    value={fields["customerCity"]}
                                    onChange={handleChange}
                                />
                            </Card>
                            <Row className="space-display-bottom-md">
                                <Col>
                                    <Card>
                                        <TextField
                                            id="customerCountry"
                                            name="customerCountry"
                                            label="Estado" 
                                            variant="standard"
                                            value={fields["customerCountry"]}
                                            onChange={handleChange}
                                        />
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Col>
                                            <TextField
                                                id="customerPostalCode"
                                                name="customerPostalCode"
                                                label="Código Postal" 
                                                variant="standard"
                                                value={fields["customerPostalCode"]}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="space-display-bottom-md">
                                <Col>
                                    <Card>
                                        <TextField
                                            id="formsConstruction"
                                            name="formsConstruction"
                                            label="Construcción (m2)" 
                                            variant="standard"
                                            className="flex-cell"
                                            value={fields["formsConstruction"]}
                                            onChange={handleChange}
                                        />
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <TextField
                                            id="formsFloors"
                                            name="formsFloors"
                                            label="Número de pisos" 
                                            variant="standard"
                                            value={fields["formsFloors"]}
                                            onChange={handleChange}
                                        /> 
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Card className="transparent">
                                        <p className="text-field">Tipo de inmueble</p>
                                    </Card>
                                </Col>
                                <Col sm={8}>
                                    <Card className="transparent">
                                        <select
                                            className="select-custom"
                                            id="formsTypeInm"
                                            name="formsTypeInm"
                                            onChange={handleChange}
                                            value={fields["formsTypeInm"]}
                                        >
                                            <option value="value0">Seleccionar...</option>
                                            <option value="Vivienda">Vivienda</option>
                                            <option value="Comercial">Comercial</option>
                                            <option value="Oficinas">Oficinas</option>
                                            <option value="Institucional">Institucional</option>
                                            <option value="Industrial">Industrial</option>
                                            <option value="SubUrbano">Sub-Urbano</option>
                                            <option value="Otros">Otros</option>
                                        </select>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={5} sm={5}>
                            <Card.Text>Ubicación:</Card.Text>
                            <GoogleMaps></GoogleMaps>
                        </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card className="space-display-bottom">
                  <Card.Body>
                    <Card.Title className="space-display-bottom-md">Documentos adjuntos</Card.Title>
                    <Row>
                        <Col sm={2} className="space-display-bottom-md">
                        </Col>
                        <Col sm={8} className="space-display-bottom-md">
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de documento</Form.Label>
                                <select
                                    id="inspectorFiles"
                                    name="inspectorFiles"
                                    value={fields["inspectorFiles"]}
                                    onChange={handleChange}
                                    className="select-custom space-display-bottom-md"
                                    label="Age"
                                    >
                                    <option value="select">Seleccionar...</option>
                                    <option value="luz">Recibo de Luz</option>
                                    <option value="agua">Recibo de agua</option>
                                    <option value="planos">Planos </option>
                                    <option value="docsLegales">Documentos legales</option>
                                    <option value="otro">Otros</option>
                                </select>
                                <UploadFiles actions={{fields: fields, saveField: saveField}}/>
                            </Form.Group>
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Row className="space-display-bottom-m">
                            <Col>
                                <Card.Title>Inspección del inmueble</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Item zonas={zonas} actionFields={{fields: fields, saveField: saveField}} elementos={[]}/>
                        </Row>
                        <Row>
                            <Col className="full-display center space-display-top">
                                <Button className="new-item-submit color-principal space-display-right" type="button" onClick={onSubmit}>Guardar Formulario</Button>
                                <Button className="new-item-submit color-principal space-display-left" type="button">Imprimir</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
        </Container>
    )
}

export default {
    nombre: "Formulario",
    template: FORMULARIO
};