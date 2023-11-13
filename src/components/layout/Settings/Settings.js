import React from 'react';
import CreateUser from './Options/CreateUser';
import Profile from './Options/Profile';
import Roles from './Options/Roles';
import Users from './Options/Users';
import PrintView from './Options/PrintView';

const Settings = ({option}) => {
    return(
        <div className="listado-ajustes">
            {option.module === 'createUser' ? <CreateUser /> : null}
            {option.module === 'profile' ? <Profile /> : null}
            {option.module === 'roles' ? <Roles /> : null}
            {option.module === 'users' ? <Users /> : null}
            {option.module === 'printView' ? <PrintView props={option.props}/> : null}
        </div>

    )
};

export default Settings;
