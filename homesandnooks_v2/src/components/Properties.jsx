import { useEffect, useState } from "react";
import  styled  from "styled-components";
import Property from "./Property";
import PropertySearchFom from "./PropertySearchFom";
import fetchData from "../helpers/fetchData";



const Container = styled.div`
    width: 100vw;
    text-align: center;
    // height: 100vh;
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;

`

const Wrapper = styled.div`
    width: 100%;
    // height: calc(100vh - 40px);
    display: flex;
    justify-content: center;
    gap: 15px;
    padding-left: 30px;
    padding-right: 30px;
    align-items: center;
    margin-top: 40px;
    flex-wrap: wrap;
    
`

const MsgDisplay = styled.div`
    position: fixed;
    top: 10px;
    right: 0;
    height: 100px;
    width: 300px;
    background-color: #f4f4f4;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

`

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState("");

    useEffect(()=>{
        const func = async () => {
            const response = await fetchData("get", process.env.REACT_APP_GET_PROPERTY_BASE_URL, {})
            .then(handleResponse);
            if (response && response.status === "success"){
                setProperties(response.data);
            }
        }
        func();
        
    }, []);

    const formSubmit = async (params) => {
        setError("Searching...");
        let url = new URL(process.env.REACT_APP_GET_PROPERTY_QUERY_URL);

        Object.keys(params).forEach((key) => {
            url.searchParams.append(key, params[key]);
        });

        const response = await fetchData("get", url, {})
            .then(handleResponse);

        if (response && response.status === "success"){
            // console.log(response.data);
            if (response.data.length === 0) {
                setError("No item matches your search");
            }else {
                setProperties(response.data);
                setError("");
            }
        }
        
    }

    const handleResponse = (data) =>{
        if (data === "err"){
            setError("Please check your internet connection and refresh page");
        } else if (data.error){
            if (data.error.message){
                setError(data.error.message);
            }else{
                setError("Check your internet connection and refresh page");
            }
            
        } else if (data.status === "success") {
            setError("");
            console.log(data.message);
            return data
        }else{
            console.log(data);
        }
    }
    var output =  <div>
                        Loading data...
                    </div>
    if (properties.length > 0) {
        output = properties.map((p) => {
            return <Property 
                key = {p._id}
                data = {p}
                title = {`N ${p.price}`}
                desc = {p.description}
                loc = {p.address}
                img = {p.images[0] ? p.images[0].path: ""}
                />
        });
    }
  return (
    <Container>
        <PropertySearchFom formSubmit = {formSubmit}/>
        <h1>Property Listing</h1>
        <Wrapper>
            {output}
        </Wrapper>
        <MsgDisplay style = {{display: error === "" ? "none": "flex"}}>
            <p style={{color: "red"}}>{error}</p>
        </MsgDisplay>
    </Container>
  )
}

export default Properties
