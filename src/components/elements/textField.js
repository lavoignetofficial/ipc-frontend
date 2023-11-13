import React from 'react';
import { FormControl } from 'react-bootstrap';

const TextField = ({
    id,
    type,
    name,
    label,
    value,
    onChange
}) => {
    return(
        <>
            { type === "file" ? 
                (<FormControl
                    className="fields-custom"
                    type={type}
                    id={id}
                    name={name}
                    value={value} 
                    aria-label={value}
                    onChange={onChange}
                    placeholder={label}
                />)
            : (
                (<FormControl
                    className="fields-custom"
                    id={id}
                    name={name}
                    value={value} 
                    aria-label={value}
                    onChange={onChange}
                    placeholder={label}
                />)
            )}
            
        </>
    )
}

export default TextField