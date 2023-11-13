/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
import settingsContext from '../../context/settings/settingsContext';
import List from '../modules/List';
import NewModule from '../modules/NewModule';
import { Card } from 'react-bootstrap';

const Sidebar = () =>{
    const settingContext = useContext(settingsContext);
    const { viewSettings, validarAjustes } = settingContext;

    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    const vistaAjustes = async () => { 
        validarAjustes(viewSettings ? false : true)
    }

    if(usuario !== null){
        return(
            <Card className="sidebar transparent">
                {viewSettings && usuario !== null && usuario.permission === "master" ? <NewModule/>: null}
                <div className="proyectos">
                    <List/>
                    <div className="sidebar-settings-container">
                    {/* {viewSettings ? 
                        (<SettingsMenu permission={usuario.permission} ajustes={vistaAjustes}/>)
                    : (<button 
                            className="btn btn-blank"
                            onClick={vistaAjustes}>
                                <AiOutlineTool className="icon-menu"/>
                                <label className="sidebar-settings">Ajustes</label>
                        </button>)} */}
                    </div>
                </div>
            </Card>)
    }else {
        return (
            <div className="module-welcolme">
                <h1 className="module-welcolme">Bienvenidos</h1>
            </div>
        )
    }
}

export default Sidebar;