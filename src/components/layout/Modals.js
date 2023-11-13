import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const Example = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(true);
    const handleShow = () => setShow(false);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <div hidden={show}>
            <p>Bienvenido</p>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
        </div>
      </>
    );
  }