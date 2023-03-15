import  styled  from "styled-components";
import { useState } from "react";
import Input from "./Input";
import Select from "./Select";





const Container = styled.div`
    width: 100vw;
    // height: 80px;
    border: 2px solid silver;
    color: #a9a9a9;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    form{
        display: flex;
        flex-wrap: wrap;
    }

    .a-form{
        justify-content: center;
        align-items: center;
        gap: 15px;
        
    }

`

const SubmitButton = styled.button`
    background-color: #2B4247;
    color: white;
    align-self: end;
    

    &:hover{
        background-color: rgba(0,0,255,0.1);
        color: #2B4247;
    }

`

const AButton = styled.button `
    background-color: tomato;
    color: white;


    &:hover{
        background-color: rgba(0,0,255,0.1);
        color: tomato;
    }
`

const PropertySearchFom = (props) => {
    const [address, setAddress] = useState("");
    const [aSearch, setaSearch] = useState(false);
    const [type, setType] = useState("");
    const [owner, setOwner] = useState("");
    const [bed, setBed] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    



    const handleSubmit = (e) =>{
        e.preventDefault();
        
        const params = {
            address: address === "Any" ? "": address,
            type: type === "Any" ? "": type,
            propertyOwner:owner === "Any" ? "": owner,
            bedroom:bed === "Any" ? "": bed,
            min,
            max
        }
        
        props.formSubmit(params);

    }

    const raw = {
        address:"",
        type: "",
        propertyOwner:"",
        bedroom:"",
        min: "",
        max: ""
    }
  return (
    <Container>
        <form onSubmit={handleSubmit} className={aSearch ? "a-form" : ""}>
            <Input 
                title = {aSearch ? "Address" : ""}
                width = {aSearch && "100px"}
                name="address"
                type = "text"
                value = {address}
                placeholder= {aSearch? "Any": "Enter a property address to search"}
                handleChange = {(e)=>{setAddress(e.target.value)}}
                />

            {
                aSearch === true &&
                [
                    <Select 
                        key = "1"
                        width = "100px"
                        title =  "Type"
                        name="Type"
                        value = {type}
                        // placeholder= ""
                        handleChange = {(e)=>{setType(e.target.value)}}
                        options = {["Any","Residential", "Duplex", "Commercial", "Flat"]}/>,

                    <Input 
                        key = "4"
                        width = "100px"
                        title = "Owner" 
                        name="owner"
                        type = "text"
                        value = {owner}
                        placeholder= "Any"
                        handleChange = {(e)=>{setOwner(e.target.value)}}
                        />,

                    <Select 
                        key = "5"
                        width = "100px"
                        title = "Bedrooms" 
                        name="bed"
                        value = {bed}
                        // placeholder= "Any"
                        handleChange = {(e)=>{setBed(e.target.value)}}
                        options = {["Any","0", "1", "2", "3", "4"]}/>,

                    <Input 
                        key = "6"
                        width = "100px"
                        title = "Min Price"
                        name="min"
                        type = "number"
                        value = {min}
                        placeholder= ""
                        handleChange = {(e)=>{setMin(e.target.value)}}
                        />,
                    <Input 
                        key = "7"
                        width = "100px"
                        title = "Max Price"
                        name="max"
                        type = "number"
                        value = {max}
                        placeholder= ""
                        handleChange = {(e)=>{setMax(e.target.value)}}
                        /> 
                ]
            }

            <SubmitButton type="submit">- Search -</SubmitButton>
            {
                !aSearch &&
                <AButton onClick={()=>setaSearch(true)}>- Advanced Search -</AButton>
            }
            <button type="button" onClick={() => props.formSubmit(raw)}>All Properties</button>
        </form>
    </Container>
  )
}

export default PropertySearchFom
