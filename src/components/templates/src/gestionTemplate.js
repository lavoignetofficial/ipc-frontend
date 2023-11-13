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
import fileContext from '../../../context/files/fileContext';

export const GESTION = props => {
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    const filesContext = useContext(fileContext);
    const { getImages } = filesContext;

    const formContext = useContext(formsContext);
    const { forms, obtenerForms, selectFormActual } = formContext;

    const clientContext = useContext(clientsContext);
    const { obtenerClientes, clientes } = clientContext;

    const modulesContext = useContext(moduleContext);
    const { moduloActual } = modulesContext;

    const sectionsContext = useContext(sectionContext);
    const {obtenerSecciones} = sectionsContext;

    useEffect(()=>{
        obtenerForms();
        obtenerClientes();
    }, [])

    let [spin, refreshSpin] = useState(false)
    const getClient = client => {
        const c = clientes.filter(cliente => cliente._id === client)
        if(c.length > 0){
            return(c[0].nombre)
        }
    }

    const editForm = form =>{
        moduloActual("616b4ebf7d9e48349cf3b259")
        obtenerSecciones("616b4ebf7d9e48349cf3b259")
        selectFormActual(form)
    }

    const printForm = async data =>{
        refreshSpin(true)
        let array = []
        let ready = await data.items.map(async (item,n) =>{
            if(item.files){
                let key = await getImages(item.files)
                array = [
                    ...array,
                    {
                        id: item.data["name-item"],
                        src: key
                    }
                ]
                
            }

            if(data.items.length === n+1){
                setTimeout(()=>{
                    printFile(data, clientes, usuario, array, refreshSpin)
                }, 5000)
            }
        })
    }
    
    return (<Container className="card-template">
            <Table responsive>
                <thead>
                    <tr>
                        <th className="center">No</th>
                        <th className="center">Inmueble</th>
                        <th className="center">Inspección</th>
                        <th className="center">Cliente</th>
                        <th className="center">Fecha</th>
                        <th className="center"></th>

                    </tr>
                    </thead>
                <tbody>
                {forms ? 
                        forms.map((form, i) => {
                            return (
                                <tr key={i}>
                                    <td className="center"><p  key={`no-${i}`}>{i+1}</p></td>
                                    <td className="center"><p key={`inmueble-${i}`}>{form.tipoInmueble}</p></td>
                                    <td className="center">
                                        <p key={`inspeccion-${i}`}>{
                                            form.tipoInspeccion === "basic" ? "Básica": "Avanzada"
                                        }</p>
                                    </td>                                    
                                    <td className="center"><p key={`cliente-${i}`}>{getClient(form.cliente)}</p></td>
                                    <td className="center"><p key={`fecha-${i}`}>{toDate(form.createAt)}</p></td>
                                    <td className="center">
                                        <button onClick={() => editForm(form)} type="button" className="btn btn-blank">
                                            <Ai name="AiFillEdit" />
                                        </button>
                                        {!spin ? (<button onClick={() => printForm(form)} type="button" className="btn btn-blank">
                                                <Ai name="AiOutlineDownload"/>
                                            </button>) : (
                                                <Spinner animation="border" role="status" className="forms-spinner">
                                                <span className="visually-hidden">Loading...</span>
                                              </Spinner>
                                        )}
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
    nombre: "Gestion",
    template: GESTION
};