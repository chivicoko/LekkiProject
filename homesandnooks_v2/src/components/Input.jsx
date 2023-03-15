import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    input{
        height: 40px;
        width: 300px;
        border-radius: 5px;
        padding: 10px;
        
    }
    

`

const Input = (props) =>{
    const {title, name, width, type, value, placeholder, handleChange,max} = props;
    return(
        <Container>
            <label htmlFor={name}>{title}</label>
            <input
                style = {{width: width}}
                type={type}
                id={name}
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                min = {type === "number"? 0 : null}
                max = {max}
                accept = {type === "file"? "image/png, image/jpeg, image/jpg": null}
                     />
                
        </Container>
    )
}

export default Input;