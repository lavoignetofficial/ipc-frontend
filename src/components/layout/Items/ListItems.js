import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Ai } from "../../../config/icons"

const ListItems = ({items, zona, actionFields}) => {
    const {fields, saveField} = actionFields;

    const editAction = async () =>{
        console.log("edit")
    }

    const deleteAction = async id =>{
        const itms = fields.items;
        const res = await itms.filter(itemDeleted => itemDeleted.data["name-item"] !== id)
        saveField({
            ...fields,
            items: res
        })
    }

    return (
        <Container>
            {items.length !== 0 ? items.map((item, i) =>{
                if(item.zona.nombre === zona){
                    return(
                        <Row key={i}>
                            <Col>
                                <label>{item.name}</label>
                            </Col>
                            <Col>
                                <div className="icon-button-new-item">
                                    <button type="button" onClick={editAction} className="btn btn-blank"><Ai name="AiTwotoneEdit"></Ai></button>
                                    <button type="button" onClick={() => deleteAction(item.data["name-item"])} className="btn btn-blank"><Ai name="AiFillDelete"></Ai></button>
                                </div>
                            </Col>
                        </Row>
                    )
                }
            }) : null}
        </Container>
    )

    
}

export default ListItems;