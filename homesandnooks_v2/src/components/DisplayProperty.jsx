import  styled  from "styled-components";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Input from "./Input";
import imageUpload from "../helpers/imageUpload";
import userService from "../services/userService";




const Container = styled.div`
    width: 100vw;
    padding: 15px 30px;
    p,h4{
        display: inline;
    }
    @media (max-width: 515px) {
        padding: 15px 5px;
         
    }
    

`
const Heading = styled.div`
    display: flex;
    width: 100vw;
    justify-content: start;

    .header {
        @media (max-width: 716px) {
            display: none;
             
        }
    }

`

const UpdateButton = styled.button`
    background-color: teal;
    color: white;
    margin-left: 20px;
    @media (max-width: 716px) {
        margin-left: 0;
         
    }

`

const ImageContainer = styled.div`
    overflow-x: scroll;
    width: calc(100vw - 60px);
    height: 420px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;


    div{
        // width: 100%;
        height: 400px;
        display: flex;
        justify-content:space-between;
        gap: 20px;
    }
    
`
const Slide = styled.div`
    width: 20%;
    height: 400px;
    transition: 2s;
`

const Image = styled.img`
    // width: 100%;
    // height: 400px;
    border-radius: 5px;
`

const Details = styled.div`
    display: flex;
    gap: 20px;

`

const Sub = styled.div`

    .first, .second{
        display: flex;
        gap: 40px;
        margin-bottom: 10px;

    }

    p,h4{
        display: block
    }

    p{
        font-size: 12px;
    }

    h4{
        color: coral;
    }

`

const Form = styled.form`
    display: flex;
    border: 1px solid brown;

    @media (max-width: 490px) {
        justify-content: start;
        
         
    }

    

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



const DisplayProperty = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [itemId, setId] = useState(1);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    let propertyData;
    if (location.state) {
        propertyData = location.state.data;
    } else {
        return (
            <div><h2>Access Denied: You are requesting a page wrongly. Go to <Link to="/properties">All properties page</Link> and choose the property you wish to inspect.</h2></div>
        )
    }

    


    const handleResponse = (data) =>{
        if (data === "err"){
            setError("An error occured, please check your internet connection and try again");
        } else if (data.error){
            console.log("error",data.error);
            if (data.error.message){
                setError(data.error.message);
            }else{
                setError("An error occured while processing your request. Check your internet connection and try again");
            }
            
        } else if (data.status === "success") {
            setError("");
            console.log(data.message);
            return {
                status: "success",
                data: data.message,
                id: data.data._id || null
            } 
        }else{
            console.log(data);
        }
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("Uploading Image...");
        if (image !== "") {
            const response = await imageUpload(image, 
                process.env.REACT_APP_UPLOAD_IMAGE_URL, 
                propertyData._id)
                .then(handleResponse);
    
            if (response && response.status === "success"){
                setError(response.data);
            }
        } else {
            setError('no file added');
        }
        
    }


  return (
    <Container>
        <Heading>
            <div className="header">
                <span onClick={() => navigate('/properties')} style={{border: "1px solid black", backgroundColor: "#f4f4f4", cursor: "pointer"}}>&#60;&#60;back</span>
                <div><p>Uploaded by:</p><h4> {propertyData.uploader}</h4></div>
                <div><p>Property Owner:</p><h4> {propertyData.propertyOwner}</h4></div>
            </div>
            {
                userService.isLoggedIn() && (userService.getUser() === propertyData.uploader || userService.hasRole(['admin', 'app-admin', 'Admin'])) &&
                [
                    <UpdateButton key={1} type="button" onClick={()=> navigate('/update_property', {state: {id:propertyData._id}})}>Update Property</UpdateButton>,
                    <Form key={2} onSubmit = {handleSubmit}>
                        <Input 
                            name= 'image'
                            type = 'file'
                            handleChange = {handleFileChange}
                            />
                        <input type='submit' value='upload'/>
                    </Form>
                ]
            }
            
        </Heading>
        <ImageContainer>
            <div>
                {
                    propertyData.images.length > 0 ?
                    propertyData.images.map((im, ind) =>{
                        return <Slide key={`item${ind}`}><Image src={im.path} alt={`item${ind}`}/></Slide>
                    }) :
                    <Slide><Image src="images/che.webp" alt="test"/></Slide>
                }
            </div> 
        </ImageContainer>
        <h2>{propertyData.price}</h2>
        <Details>
            <div><h4>{propertyData.bedroom}</h4><p> Bedrooms</p></div>
            <div><h4>{propertyData.sittingRoom}</h4><p> Sitting Rooms</p></div>
            <div><h4>{propertyData.kitchen}</h4><p> kitchen</p></div>
            <div><h4>{propertyData.bathroom}</h4><p> Bathrooms</p></div>
            <div><h4>{propertyData.toilet}</h4><p> Toilets</p></div>
        </Details>
        <h3 style={{margin: "10px 0"}}>{propertyData.address}</h3>
        <Sub>
            <div className="first">
                <div>
                    <h4>{propertyData.type}</h4>
                    <p>Property Type</p>
                </div>

                <div>
                    <h4>{propertyData.propertyOwner}</h4>
                    <p>Property Owner</p>
                </div>
            </div>
            <div className="second">
                <div>
                    <h4>{propertyData.validFrom}</h4>
                    <p>Valid From</p>
                </div>
                <div>
                    <h4>{propertyData.validTo}</h4>
                    <p>Valid To</p>
                </div>
            </div>
            
            
        </Sub>


        <MsgDisplay style = {{display: error === "" ? "none": "flex"}}>
            <p style={{color: "red"}}>{error}</p>
        </MsgDisplay>
    
    </Container>
  )
}

export default DisplayProperty
