/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useState } from 'react';
import formsContext from '../../../context/forms/formsContext';
import { Ai } from "../../../config/icons"
import clientsContext from '../../../context/clients/clientsContext';
import moduleContext from '../../../context/modules/moduleContext';
import sectionContext from '../../../context/sections/sectionContext';
import AuthContext from '../../../context/authentication/authContext';
import {Container, Spinner, Table} from 'react-bootstrap';
import { printFile } from "../../layout/FileJsonToPdf"
import {toDate} from '../../../functions'

export const CONTACT = props => {
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    const clientContext = useContext(clientsContext);
    const { obtenerClientes, clientes } = clientContext;

    useEffect(()=>{
        obtenerClientes();
    }, [])

    const editClient = form =>{
        console.log("edit")
    }

    const deleteClient = async data =>{
        console.log("print")
    }
    
    return (<Container className="card-template">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="center">No</th>
                        <th className="center">Nombre</th>
                        <th className="center">Teléfono</th>
                        <th className="center">Email</th>
                        <th className="center">Dirección</th>
                        <th className="center"></th>
                    </tr>
                    </thead>
                <tbody>
                {clientes ? 
                        clientes.map((cliente, i) => {
                            return (
                                <tr key={i}>
                                    <td className="center"><p>{i+1}</p></td>
                                    <td className="center"><p>{cliente.nombre}</p></td>
                                    <td className="center"><p>{cliente.telefono}</p></td>                                    
                                    <td className="center"><p>{cliente.email}</p></td>
                                    <td className="center"><p>{cliente.direccion}, {cliente.colonia}, {cliente.ciudad}</p></td>
                                    <td className="center">
                                        <button onClick={() => editClient()} type="button" className="btn btn-blank">
                                            <Ai name="AiFillEdit"/>
                                        </button>
                                        <button onClick={() => deleteClient()} type="button" className="btn btn-blank">
                                            <Ai name="AiFillDelete" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    :null}
                </tbody>
            </Table>    
        </Container>)
}

export default {
    nombre: "Contactos",
    template: CONTACT
};