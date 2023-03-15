import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import userService from '../services/userService';

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    // background-color: rgb(51, 51, 51);
    // color: #a9a9a9;
    // display: flex;
    // justify-content: center;
    // align-items: start;
`
const Bg = styled.div`
    height: 80%;
    width: 100%;
    background-image: url(images/white-and-brown-house.jpg);
    background-size: cover;
    background-position: center;
    
`

const Body = styled.div`
    background-color: #2B4247;
    height: 20%;
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    h1{
        font-weight: 100;
        @media (max-width: 620px) {
            font-size: 20px;
         
        }
    }

    span{
        font-size: 14px;
    }

`
const Cta = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;

    button{
        background-color: transparent;
        color: white;

        &:hover{
            background-color: white;
            color: #2B4247;
        }

    }

`

const Home = () => {
  return (
    <Container>
      <Bg />
      <Body>
        {
            userService.hasRole(['admin', 'app-admin', 'Admin']) 
                ? <h1>{`welcome admin ${userService.getUserName()} |`}<span style={{fontSize: "30px"}}>|</span> What do you want to do today?</h1>
                : <h1>Find your dream home <span>or</span> Put up house for sale</h1>
        } 
          <Cta>
              <Link to="/properties"><button>- See available properties -</button></Link>
              <Link to="/add_property"><button>- Add property -</button></Link>
          </Cta>
      </Body>
    </Container>
  )
}

export default Home
