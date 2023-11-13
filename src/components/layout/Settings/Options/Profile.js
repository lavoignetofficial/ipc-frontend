/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import AuthContext from '../../../../context/authentication/authContext';
import url from '../../../../img/profile_3.jpg'
import TextField from '../../../elements/textField'

const EditMode = () => {
    return(
        <form className="contenedor-inputs sombra">
            <Card className="transparent space-display-top-m">
                <Row>
                    <Col xs={2}>
                        <label className="fontSize-12">Nombre</label>
                    </Col>
                    <Col xs={10}>
                        <TextField 
                            type="text"
                            className="input-text-new-user centrar"
                            label="Ingresa el nombre"
                            name="nombre"
                        />
                    </Col>
                </Row>
            </Card>
            <Card className="transparent space-display-top-m">
                <Row>
                    <Col xs={2}>
                        <label className="fontSize-12">Dirección</label>
                    </Col>
                    <Col xs={10}>
                        <TextField 
                            type="text"
                            className="input-text-new-user centrar"
                            label="Ingresa la dirección"
                            name="address"
                        />
                    </Col>
                </Row>
            </Card>
            <Card className="transparent space-display-top-m">
                <Row>
                    <Col xs={2}>
                        <label className="fontSize-12">Telefóno</label>
                    </Col>
                    <Col xs={10}>
                        <TextField 
                            type="text"
                            className="input-text-new-user centrar"
                            label="Ingresa el telefóno"
                            name="permisos"
                        />
                    </Col>
                </Row>
            </Card>
        </form>             
    )
}

const ProfileMode = ({usuario}) => {
    return(
        <form className="contenedor-inputs sombra">
            <Card className="transparent">
                <Row>
                    <Col xs={2}>
                        <label className="fontSize-12">Nombre</label>
                    </Col>
                    <Col xs={10}>
                        <label className="fontSize-12">{usuario.nombre}</label>
                    </Col>
                </Row>
            </Card>
            <Card className="transparent space-display-top-m">
                <Row>
                    <Col xs={2}>
                        <label className="fontSize-12">Email</label>
                    </Col>
                    <Col xs={10}>
                        <label className="fontSize-12">{usuario.email}</label>
                    </Col>
                </Row>
            </Card>
            <Card className="transparent space-display-top-m">
                <Row>
                    <Col xs={2}>
                        <label className="fontSize-12">Dirección:</label>
                    </Col>
                    <Col xs={10}>
                        <label className="fontSize-12">{usuario.address}</label>
                    </Col>
                </Row>
            </Card>
            <Card className="transparent space-display-top-m">
                <Row>
                    <Col xs={2}>
                        <label className="fontSize-12">Telefóno:</label>
                    </Col>
                    <Col xs={10}>
                        <label className="fontSize-12">{usuario.phone}</label>
                    </Col>
                </Row>
            </Card>
        </form>             
    )
}

const Profile = () => {
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;
    
    const [profile, saveProfile] = useState({
        edit: false
    })
    
    const printProfile = () => {
        saveProfile({edit: profile.edit ? false : true})
        console.log(usuario)
    }
    
    return (
        <Container className="space-display-top">
            <Row>
                <Col xs={2} sm={1}></Col>
                <Col xs={8} sm={10} className="card-template center">
                    <Row>
                        <div className="mi-perfil">
                            <h5>Mi Perfil</h5>
                        </div>
                        <Col xs={3}>
                            <img className="pp-imagen" src={url}/>
                            <button className="btn btn-blank" type="button" onClick={printProfile}>
                                {profile.edit ? "Confirmar" : "Editar"}
                            </button>
                        </Col>
                        <Col xs={9}>
                            {profile.edit ? <EditMode />:
                            <ProfileMode usuario={usuario}/>}
                        </Col>
                    </Row>
                </Col> 
                <Col xs={2} sm={1}></Col>           
            </Row>
        </Container>
    )
};

export default Profile;
