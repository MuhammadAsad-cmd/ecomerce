import React from "react";
import { ReactNavbar } from "overlay-navbar";
import './header.css'
import logo from "../../../asserts/logo.jpg";
import { CgProfile } from 'react-icons/cg'
import {BiSearch, BiCart} from 'react-icons/bi'


const options = {
   
    burgerColor: "#eb4034",
    logo,
    logoWidth: "100%",
    navColor1: "white",
    
    logoHoverColor: "unset",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-start",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    searchIcon : true,
    SearchIconElement:BiSearch,
    searchIconUrl: "/products/search",
    cartIcon: true,
    CartIconElement: BiCart,
    cartIconUrl:"/user/cart",
    profileIcon: true,
    ProfileIconElement: CgProfile,
    profileIconUrl:"/account"

};
const Header = () => {
    return <ReactNavbar {...options}/>;
};
export default Header;