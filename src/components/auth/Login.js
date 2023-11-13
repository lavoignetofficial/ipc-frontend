import React, {useContext, useEffect, useState} from 'react';
import alertsContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/authentication/authContext';
import imgUrl from '../../img/icon-login.png'
import { 
    Button, 
    Form,
    Container,
    Row,
    Col,
    Alert
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

 
const Login = props => {
    // Extraer los valores del context
    const alertContext = useContext(alertsContext);
    const { alert, mostrarAlerta } = alertContext;

    //  Extraer los valores del autenticacion
    const authContext = useContext(AuthContext);
    const { mensaje, login, autenticado } = authContext;

    useEffect(()=>{
        if(autenticado){
            props.history.push('/modules')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, 'alerta-error')
            return;
        }
    }, [mensaje, autenticado, props.history])

    // State para iniciar sesión
    const [user, saveUser] = useState({
        email:'',
        password:''
    })

    const {email, password} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        // Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta(
                `${email.trim() === '' ? `El usuario ${password.trim() === '' ? "y la contraseña son campos requeridos." : " es requerido."}` : 
                    password.trim() === '' ? "La contraseña es requerida." : ""
                }
                `, 
            "alerta-error")

            return;
        }

        login({ email, password });
    }

    return(
        <Container fluid="ms">
                <Container fluid="ms" className="login-form-usuario">
                    <Row>
                        <Col xs={6} md={6} className="login-contenedor-logo">
                            <img src={imgUrl} className="login-logo"/>
                            <p>Antes de comprar o vender, inspecciona.</p>
                        </Col>
                        <Col xs={6} md={6} className="login-datos">        
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        placeholder="Correo electrónico" />
                                </Form.Group>
                
                                <Form.Group className="mb-3">
                                    <Form.Control 
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange} 
                                        placeholder="Contraseña" 
                                    />
                                </Form.Group>
                                <Form.Group>
                                    {alert ? (<Alert variant="danger">{alert.msg}</Alert>): null}
                                </Form.Group>
                                <Button variant="primary" type="submit" className="login-btn">
                                    Entrar
                                </Button>
                                <Form.Group className="center">
                                    <p className="login-recuperacion">¿Has olvidado la contraseña?</p>
                                </Form.Group>

                            
                        </Form>
                            <p className="login-msg">
                                Nunca compartiremos su correo electrónico con nadie más.
                            </p>
                        </Col>
                    </Row>
                </Container>
            <div className="login-footer">
                <p>
                    Inspección PreCompra © 2021
                </p>
            </div>
        </Container>
    )
}

export default Login;