import React, { useContext } from 'react';
import UsersContext from '../../../../context/users/UsersContext';

const Users = () => {
    const userContext = useContext(UsersContext);
    const { users } = userContext

    return (
        <div className="contenedor-lista">
            <div className="mi-perfil">
                <h1>Usuarios</h1>

            </div>
            <form className="contenedor-inputs sombra">
                <table className="contenedor-tabla">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Permisos</th>
                            <th>_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ?
                            users.map((user, i) => 
                                (<tr key={i}>
                                    <td className="contenedor-tabla-tbody">{i+1}</td>
                                    <td className="contenedor-tabla-tbody">{user.nombre}</td>
                                    <td className="contenedor-tabla-tbody">{user.email}</td>
                                    <td className="contenedor-tabla-tbody">{user.permission}</td>
                                    <td className="contenedor-tabla-tbody">{user._id}</td>
                                </tr>))
                        : null}
                    </tbody>
                </table>
            </form>
        </div>
    )
};

export default Users;
