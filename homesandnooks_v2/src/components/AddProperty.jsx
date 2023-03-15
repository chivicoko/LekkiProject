import React, { Component } from 'react';
import styled from 'styled-components';
import propertyDetails from '../helpers/addProperty';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';
import updateDetails from '../helpers/updateProperty';
import fetchData from '../helpers/fetchData';
import imageUpload from '../helpers/imageUpload';
import RenderOnAuthenticated from './RenderOnAuthenticated';
import userService from '../services/userService';

const Container = styled.div`
    width: 100vw;
    // height: calc(100vh - 80px);
    background-image: url(images/wp3604678.jpg);
    background-size: cover;
    background-position: center;
    
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    // opacity: 0.5;

    form {
        border: 1px solid red;
        width: 800px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 10px;
        margin: 30px 0;
        padding: 10px

    }

    @media (max-width: 800px) {
        form{
            margin:10;
            // padding: 0;
            width: 100%;
            border: none;
            

            h1{
                font-size: 20px;
            }

        
        }

    @media (max-width: 639px) {
        form{
            
            div{
                width: 100% !important;
                justify-content: center !important;

                input, select, textarea{
                    width: 80% !important;
                    justify-self: center;
                    align-self: center;
                }

                label{
                    justify-self: center;
                    align-self: center;
                }
            }

        
        }
        
         
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    background-color: white;
    gap: 20px;

    textarea{
        flex-basis: 500px;
    }
`

const SubmitButton = styled.button`
    background-color: #2B4247;
    color: white;
    width: 80%;
    margin-top: 10px;
    // align-self: end;
    

    &:hover{
        background-color: rgba(0,0,255,0.1);
        color: #2B4247;
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

class AddProperty extends Component {
    constructor (props){
        super(props);
        this.state = {
            address: "",
            type: "",
            bedroom: "",
            sittingRoom: "",
            kitchen: "",
            toilet: "",
            bathroom: "",
            propertyOwner: "",
            image: "",
            validFrom: "",
            validTo: "",
            price: "",
            description: "",
            error: ""
        }
   

        
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
        

    }

    handleFileChange = (e) =>{
        this.setState({image: e.target.files[0]});
        

        // if (e.target.files) {
        //     const fileArray = Array.from(e.target.files).map((file) => (
        //         URL.createObjectURL(file)));

        //     console.log(fileArray);
        // }
    }

    handleResponse = (data) =>{
        if (data === "err"){
            this.setState({error: "An error occured, please check your internet connection and try again"});
        } else if (data.error){
            console.log("error",data.error);
            if (data.error._message && data.error._message === "Property validation failed"){
                this.setState({error: "All form fields apart from the image are required."});
            }else if (data.error.message){
                this.setState({error: data.error.message});
            }else{
                this.setState({error: "An error occured while processing your request. Check your internet connection and try again"});
            }
            
        } else if (data.status === "success") {
            this.setState({error: ""});
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

    handleSubmit = async (e) =>{
        e.preventDefault();
        this.setState({error: "loading... please wait"});
        let url = process.env.REACT_APP_ADD_PROPERTY_URL;
        let method = "post";
        let {image, error, ...others} = this.state;
        others.uploader = userService.getUser();
        if (this.props.update){
            delete others.address;
            delete others.validFrom;
            delete others.price;
            delete others.type;
            delete others.propertyOwner;
            delete others.uploader;

       
            url = process.env.REACT_APP_GET_PROPERTY_BASE_URL + `${this.props.propId}`;
            method = "put"
        }
        
        
        const response = await fetchData(method, url, others)
        .then(this.handleResponse);

        if (response && response.status === "success") {
            if (!this.props.update && this.state.image !== "") {
                const newResponse = await imageUpload(this.state.image, 
                    process.env.REACT_APP_UPLOAD_IMAGE_URL, 
                    response.id)
                    .then(this.handleResponse);
    
                if (newResponse && newResponse.status === "success"){
                    // this.setState({error: response.data});
                    this.setState({
                        address: "",
                        type: "",
                        bedroom: "",
                        sittingRoom: "",
                        kitchen: "",
                        toilet: "",
                        bathroom: "",
                        propertyOwner: "",
                        image: "",
                        validFrom: "",
                        validTo: "",
                        price: "",
                        description: "",
                        error:response.data
                    })
                }
            }else if (this.props.update) {
                this.setState({error: response.data})
            }
            
        }

    
    }

    // componentDidMount() {
    //     if (this.props.update) {
    //         this.setState({...this.props.propData});
    //     }
    // }

    

    
    render() {
        const {propId, update} = this.props;
        const details = update ? updateDetails :  propertyDetails;
        
        return (
            <RenderOnAuthenticated url = {update ? process.env.REACT_APP_PROPERTIES_PAGE_URL : process.env.REACT_APP_ADD_PROPERTY_PAGE_URL}>
                <Container style={{height: update ? "calc(100vh - 80px)": ""}}>
                    
                    <form onSubmit={this.handleSubmit} encType = "multipart/form-data">
                        <h1 style={{margin: "10px 0"}}>{update? `Update Property ${propId}` : "Add New Property Details"}</h1>
                        <Wrapper>
                            {
                                details.map((p)=>{
                                    if (p.type === "select") {
                                        return <Select 
                                                    key = {p.id}
                                                    // width = "100px"
                                                    title = {p.title} 
                                                    name={p.name}
                                                    value = {this.state[p.name]}
                                                    placeholder= {p.pHolder}
                                                    handleChange = {this.handleChange}
                                                    options = {["Residential", "Duplex", "Commercial", "Flat"]}/>

                                        
                                    } else if (p.type === "textarea"){
                                        return <TextArea
                                                    key = {p.id}
                                                    title = {p.title} 
                                                    name={p.name}
                                                    rows={10}
                                                    cols={50}
                                                    value={this.state[p.name]}
                                                    handleChange={this.handleChange}
                                                    placeHolder={p.pHolder}/>

                                    }else if (p.type === "file"){
                                        return <Input 
                                                key = {p.id}
                                                title = {p.title}
                                                name= {p.name}
                                                type = {p.type}
                                                // value = {this.state[p.name]}
                                                handleChange = {this.handleFileChange}
                                                /> 
                                        
                                    }else {
                                        return <Input 
                                                key = {p.id}
                                                // width = "100px"
                                                title = {p.title}
                                                name= {p.name}
                                                type = {p.type}
                                                max = {4}
                                                value = {this.state[p.name]}
                                                placeholder= {p.pHolder}
                                                handleChange = {this.handleChange}
                                                />

                                    }
                                })
                            }
                        </Wrapper>
                        <SubmitButton type="submit">- {update ? "Update": "Add"} Property -</SubmitButton>
                    </form>
                    <MsgDisplay style = {{display: this.state.error === "" ? "none": "flex"}}>
                        <p style={{color: "red"}}>{this.state.error}</p>
                    </MsgDisplay>
                </Container>
            </RenderOnAuthenticated>
        )
    }
}



export default AddProperty
