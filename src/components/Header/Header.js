
import styled from "@emotion/styled";
import { AppBar, Toolbar } from "@mui/material";
import {Outlet, useNavigate } from "react-router-dom";
//components
import SearchBar from "../Header/searchBar"
import MenuBar from "./MenuBar";


const StyledHeader = styled(AppBar)`
    background:#ffffff;
    padding-top:5px;
    height:88px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`

export default function Header(){
    const logo = "https://www.freepnglogos.com/uploads/logo-myntra-png/myntra-logo-m-png-3.png"
    const navigate = useNavigate();
    const handleClickLogo = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <>
        <StyledHeader>
            <Toolbar>
                <div className="logo">
                    <img onClick={handleClickLogo} src={logo} alt="logo" />
                </div>
                <div className="category">
                    <span onClick={()=>{navigate("/")}}>HOME</span>
                    <span onClick={()=>{navigate("/catalogue")}}>MEN</span>
                    <span onClick={()=>{navigate("/catalogue")}}>WOMEN</span>
                </div>
                <div className="search-container">
                    <SearchBar/>
                </div>
                <div>
                    <MenuBar/>
                </div>
            </Toolbar>
        </StyledHeader>
        <Outlet></Outlet>
        </>
        
        
    )
}