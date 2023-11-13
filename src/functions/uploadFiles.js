import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Ai } from "../config/icons"
import fileContext from '../context/files/fileContext';

const UploadFiles = ({actions}) => {
    const filesContext = useContext(fileContext);
    const { files } = filesContext;

    const {fields, saveField} = actions;
    const [file, saveFile] = useState()

    const [preview, savePreview] = useState({
        state: files ? files.success : false,
        url: files ? files.src : null
    })

    useEffect(()=>{
        savePreview({
            state: files ? files.success : false,
            url: files ? files.src : null
        })
    },[files])
    

    const handlerChange = async e => {
        saveFile({
            ...file,
            [e.target.name]: e.target.files
        })
    }

    const attachFiles = adjunt => {
        try{
            let newFile = adjunt ? adjunt.fileImages[0] : null; 
            if(newFile){
                console.log(newFile)
                let urlImg = URL.createObjectURL(newFile);
                savePreview({
                    state: true,
                    url: urlImg
                })
                saveField({
                    ...fields,
                    attachment: {
                        name: newFile.name,
                        formData: newFile
                    }
                })
            }else{
                if(fields.attachment){
                    saveField({
                        ...fields,
                        attachment: null
                    })
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    
    const deleteAttach = () => {
        saveField({
            ...fields,
            attachment: null
        })

        savePreview({state: false})
    }

    return (
        <div className="row">
            {preview.state?(
                <div className="contenedor-preview">
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <button onClick={deleteAttach} type="button" className="btn btn-blank full-display right">
                                <Ai name="AiOutlineClose"/> 
                            </button>
                        </Col>
                    </Row>
                    <img src={preview.url} className="preview-img"/>  
                        
                </div>
            ): (<div className="form-group">
                    <input 
                        onChange={handlerChange}
                        type="file" 
                        className='form-control' 
                        name="fileImages"
                        accept="image/*"
                    />
                    <Card className="space-display-top">
                        <button 
                            className='btn btn-success' 
                            type="button" 
                            onClick={() => attachFiles(file)}
                        > Upload File </button>
                    </Card>
                </div>)}
        </div>
    );
}

export default UploadFiles;