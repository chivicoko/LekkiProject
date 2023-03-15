import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 150px;

    textarea{
        height: 150px;
        width: 600px;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    

`
const TextArea = (props) =>{
    return(
        <Container>
            <label htmlFor={props.name}>{props.title}</label>
            <textarea
                name={props.name}
                rows={props.rows}
                cols={props.cols}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeHolder}>
            </textarea>
        </Container>
    )
}

export default TextArea;