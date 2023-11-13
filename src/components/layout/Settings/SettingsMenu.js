import React, { Fragment, useContext } from 'react';
import UsersContext from '../../../context/users/UsersContext';
import settingsContext from './../../../context/settings/settingsContext';
import {VscAccount} from "react-icons/vsc";
import {AiOutlineTool, AiOutlineUserAdd, AiOutlineUnorderedList, AiOutlineSafety, AiOutlineClose} from "react-icons/ai";

const SettingsMenu = ({ajustes, permission}) =>{
    const settingContext = useContext(settingsContext);
    const { selectOption  } = settingContext;

    const userContext = useContext(UsersContext);
    const { obtenerUsuarios } = userContext;
    
    const gestionarUsuarios = async () =>{
        selectOption("users");
        obtenerUsuarios();
    }

    return(
        <Fragment>
            <p className="btn btn-blank"><AiOutlineTool className="icon-menu"/><label className="sidebar-settings">Ajustes</label></p>
            <div className="menu-ajustes">
                <button className="btn btn-blank" onClick={()=>{selectOption("profile")}}>
                    <p className="opciones-ajustes"><VscAccount className="icon-Menu "/>
                        <label className="sidebar-settings">Mi perfil</label>
                    </p>
                </button>
                {permission === "master" ? 
                    <div>
                        <button className="btn btn-blank" onClick={()=>{selectOption("createUser")}}>
                            <p className="opciones-ajustes"><AiOutlineUserAdd className="icon-Menu"/>
                                <label className="sidebar-settings">Crear usuario</label>
                            </p>
                        </button>
                        <button className="btn btn-blank" onClick={gestionarUsuarios}>
                            <p className="opciones-ajustes"><AiOutlineUnorderedList className="icon-Menu"/>
                                <label className="sidebar-settings">Gestionar usuarios</label>
                            </p>
                        </button>
                        <button className="btn btn-blank" onClick={()=>{selectOption("roles")}}>
                            <p className="opciones-ajustes"><AiOutlineSafety className="icon-Menu"/>
                                <label className="sidebar-settings">Permisos</label>
                            </p>
                        </button>
                    </div>
                    : null}
                
                <button className="btn btn-blank" onClick={ajustes}>
                        <p className="opciones-ajustes"><AiOutlineClose className="icon-Menu"/>
                            <label className="sidebar-settings">Cerrar</label>
                        </p>
                </button>
            </div>
                    
        </Fragment>
    );
}

export default SettingsMenu;