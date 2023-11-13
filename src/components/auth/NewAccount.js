import React, {useContext, useEffect, useState} from 'react';
import alertsContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/authentication/authContext';
 
const NewAccount = props => {
    // Extraer los valores del context
    const alertContext = useContext(alertsContext);
    const { alert, mostrarAlerta } = alertContext;

    const authContext = useContext(AuthContext);
    const { mensaje, registrarUsuario, autenticado } = authContext;

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
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    const {nombre, email, password, confirmar} = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = async e =>{
        e.preventDefault();

        // Validar que no haya campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return;
        }

        // Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('La contraseña debe ser de al menos 6 caracteres', 'alerta-error')
            return;
        }

        // Los 2 password deben ser iguales
        if(password !== confirmar){
            mostrarAlerta('La contraseña no coincide', 'alerta-error')
            return;
        }
        // Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return(
        <div className="form-usuario">
            {alert ? 
                (
                    <div className={`alerta ${alert.category}`}> <h3>{alert.msg}</h3> </div>
                )
            : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form onSubmit={onSubmit}>
                <div className="campo-form">
                        <label htmlFor="email">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Confirma tu password"
                            onChange={onChange}
                        />
                    </div>
                <div className="campo-form">
                    <input type="submit" className="btn btn-primario btn-block"
                        value="Crear cuenta"
                    />
                </div>
                </form>
            </div>
        </div>
    )
}

export default NewAccount;