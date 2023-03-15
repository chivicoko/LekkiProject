import { Link } from "react-router-dom";
import  styled  from "styled-components";
import userService from "../services/userService";



const Container = styled.div`
    width: 100vw;
    height: 80px;
    background-color: rgb(51, 51, 51);
    color: #a9a9a9;
    display: flex;
    justify-content: center;
    align-items: center;


    a{
        color: #a9a9a9; 
    }

    

`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 826px) {
        margin: 0 20px;
    }

`
const Logo = styled.h1`
    flex: 1;

`

const NavLinks = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
    align-items: center;
    // border: 1px solid red;

    li{
        margin-left: 60px;
        cursor: pointer;

        @media (max-width: 826px) {
            margin-left:30px;
        }
    }

    @media (max-width: 639px) {
        display: none;
    }

`

const NavBar = () => {
  return (
    <Container>
        <Wrapper>
            <Link to="/"><Logo>HOMESandNOOKS</Logo></Link>
            <NavLinks>
                <Link to="/"><li>Home</li></Link>
                <li>AboutUs</li>
                {
                    userService.isLoggedIn() ? 
                    [
                        <li key={1} onClick={() => userService.userAccount()}>MyAccount</li>,
                        <li key={2} onClick={() => userService.doLogout({redirectUri: process.env.REACT_APP_HOME_PAGE_URL})}>Logout</li>
                    ]:
                    [
                        <li key={1} onClick={() => userService.doRegister()}>SignUp</li>,
                        <li key={2} onClick={() => userService.doLogin()}>Login</li>
                    ]
                }
                
            </NavLinks>

        </Wrapper>
      
    </Container>
  )
}

export default NavBar
