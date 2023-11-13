import React, { useContext, useState } from 'react';
import alertsContext from '../../../../context/alerts/alertsContext';
import AuthContext from '../../../../context/authentication/authContext';
import NewUserContext from '../../../../context/newUsers/newUserContext';

const CreateUser = () => {
    const newUserContext = useContext(NewUserContext);
    const { nuevoUsuario, crearUsuario } = newUserContext;

    const alertContext = useContext(alertsContext);
    const { alert, mostrarAlerta } = alertContext;

    const authContext = useContext(AuthContext);
    const { registrarUsuario } = authContext;

    const [newUser, saveNewUser] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:'',
        permisos:'standard'
    })

    const {nombre, email, password, confirmar, permisos} = newUser;

    const onSubmit = e =>{
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
        crearUsuario({
            nombre,
            email,
            password,
            permisos
        })
    }

    const onChange = e =>{
        saveNewUser({
            ...newUser,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className>
            <div className="mi-perfil">
                <h1>Nuevo Usuario</h1>
            </div>
            <form className="contenedor-inputs sombra" onSubmit={onSubmit}>
                <div className="contenedor-input centrar">
                    <h4>Nombre</h4>
                    <input 
                        type="text"
                        className="input-text-new-user centrar"
                        placeholder="Ingresa el nombre"
                        name="nombre"
                        onChange={onChange}
                        value={nombre}
                    />
                </div>
                <div className="contenedor-input centrar">
                    <h4>Email</h4>
                    <input 
                        type="email"
                        className="input-text-new-user centrar"
                        placeholder="Ingresa el email"
                        name="email"
                        onChange={onChange}
                        value={email}
                    />
                </div>
                <div className="contenedor-input centrar">
                    <h4>Password</h4>
                    <input 
                        type="password"
                        className="input-text-new-user centrar"
                        placeholder="Ingresa la contraseña"
                        name="password"
                        onChange={onChange}
                        value={password}
                    />
                </div>
                <div className="contenedor-input centrar">
                    <h4>Confirmar password</h4>
                    <input 
                        type="password"
                        className="input-text-new-user centrar"
                        placeholder="Ingresa nuevamente la contraseña"
                        name="confirmar"
                        onChange={onChange}
                        value={confirmar}
                    />
                </div>
                <div className="contenedor-input centrar">
                    <h4>Permisos</h4>
                    <select name="permisos" id="rple" className="input-text-new-user centrar"
                        onChange={onChange}
                        value={permisos}
                    >
                      <option value="standard">Standard</option>
                      <option value="master">Master</option>
                    </select>
                </div>
                <div className="centrar-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-crear-usuario"
                        name="submit"
                        value="Crear"
                    />
                </div>
            </form>
        </div>
    )
};

export default CreateUser;
