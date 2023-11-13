import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
import settingsContext from '../../context/settings/settingsContext';
import imgUrl from '../../img/icon-menu.png'
import icoUrl from '../../img/icon-white.png'
import { Container, Navbar, Dropdown } from 'react-bootstrap';

const Barra = () =>{
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion} = authContext;

    const settingContext = useContext(settingsContext);
    const { selectOption  } = settingContext;

    useEffect(()=>{
        usuarioAutenticado();
    }, [])

    const logOut = () => {
        selectOption(null)
        cerrarSesion()
    }

    return(
      <Navbar className="bar">
        <Container className="bar-contenedor">
          <Navbar.Brand>
            <img className={window.screen.width > 840 ? "bar-imagen" : "bar-imagen-s"} src={window.screen.width > 840 ?  imgUrl : icoUrl}/>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">          
            <Navbar.Text>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
        <div className="transparent absolute-right">
          <Dropdown className="transparent absolute-right">
            <Dropdown.Toggle className="transparent Bar-title">
              <label className="Bar-title">{usuario ? `Bienvenido ${usuario.nombre}` : "no nombre"}</label>
            </Dropdown.Toggle>
            <Dropdown.Menu className="fontSize-12">
              {/* <Dropdown.Item onClick={()=>{selectOption("createUser")}}>Crear usuario</Dropdown.Item> */}
              <Dropdown.Item onClick={() => selectOption({module:"profile"})}>Mi perfil</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={logOut}>Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
    );
}

export default Barra;