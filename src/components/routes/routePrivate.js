import React, { useContext, useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/authentication/authContext';

const RoutePrivate = ({ component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado, loading} = authContext;

    useEffect(()=>{
        usuarioAutenticado();
    },[])

    return(
        <Route
            {...props} render={ props => !autenticado && !loading ? (
                <Redirect to="/" />
            ): (
                <Component {...props} />
            )}
        />
    );
}

export default RoutePrivate;