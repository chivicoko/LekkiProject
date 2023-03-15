import { Link, useNavigate } from "react-router-dom";
import  styled  from "styled-components";



const Container = styled.div`
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 10px;
    flex-basis: 290px;
    border: 1px solid silver;
    @media (max-width: 965px) {
        flex-basis: 400px;
    }

    @media (max-width: 900px) {
        flex-basis: 350px;
    }

    @media (max-width: 778px) {
        flex-basis: 500px;
    }

    @media (max-width: 700px) {
        margin-bottom: 20px;
    }

`

const Image = styled.img`
    height: 200px;
    width: 290px;
    border-radius: 5px;

    @media (max-width: 778px) {
        width: 450px;
    }

    @media (max-width: 900px) {
        width: 300px;
    }

    @media (max-width: 965px) {
        width: 350px;
    }

`

const ImageReplace = styled.div`
    height: 200px;
    width: 290px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 778px) {
        width: 450px;
    }

    @media (max-width: 900px) {
        width: 300px;
    }

    @media (max-width: 965px) {
        width: 350px;
    }

`
const Description = styled.p`

`

const Button = styled.button`
    background-color: #2B4247;
    color: white;
    

    &:hover{
        background-color: rgba(0,0,255,0.1);
        color: #2B4247;
    }

`



const Property = (props) => {
    const {title, desc, loc, img, data} = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/property", {
            state: {
                data
            }
        });
    }
  return (
    <Container>
        <h4>{title}</h4>
        {img !== "" ? <Image src={img} alt = {img}/>: <ImageReplace><p>no image</p></ImageReplace>}
        <Description>{desc}</Description>
        <h5>{loc}</h5>
        <Button onClick= {handleClick}>- view listing -</Button>
    </Container>
  )
}

export default Property
