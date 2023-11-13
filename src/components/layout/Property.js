import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TextField from '../elements/textField'

const Property = ({property, key, handleChange, itms}) => {
    if(property._id === "615b436da9976b568001e0ff"){
        if(itms.itm["Semáforo"]===undefined || 
            itms.itm["Semáforo"]==="select" || 
             itms.itm["Semáforo"]==="verde" || 
            itms.itm["Semáforo"]==="amarillo"){
            return (<p></p>);
        }
    }

    if(property._id === "615b436da9976b568001e0ff"){
        // document.getElementById("Ubicación").setAttribute("required");
    }
    return(
        <Row key={key}>
            <Col xs={2}></Col>
            <Col xs={3}>
                <label>{property.nombre}:</label>
            </Col>
            <Col xs={5}>
                {property.type === "String" ? 
                    <TextField 
                        type="text"
                        placeholder={property.nombre}
                        value={itms.itm[property.nombre]}
                        onChange={handleChange}
                        name={property.nombre}
                        id={property.nombre}
                    />: null}
                {property.type === "File" ?
                    <TextField
                        type="file"
                        multiple={true}
                        placeholder={property.nombre}
                        value={itms.itm[property.nombre]}
                        onChange={handleChange}
                        name={property.nombre}
                    />
                    : null}
                {property.type === "Multiple" ? 
                    <select
                        className="select-custom type-new-item"
                        value={itms.itm[property.nombre]}
                        onChange={handleChange}
                        name={property.nombre}>
                            <option value="select">Seleccionar...</option>
                            {property.answers.map((answer, i) => (
                                <option value={answer.status}>{answer.text}</option>
                            ))}
                    </select>
                : null}
            </Col>
            <Col xs={2}></Col>
        </Row>
    )
}

export default Property;