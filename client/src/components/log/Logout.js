import React from "react";
import axios from "axios";
import cookie from "js-cookie"
import { useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate();
    const removeCookie = (key) => {
        if (window !== "undefined") {
          cookie.remove(key, { expires: 1 });
        }
      };

    const logout = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}api/user/logout`, 
    { withCredentials : true})
    .then(() => {
      removeCookie("jwt");
      navigate('/');      
    })
    .catch((err) => console.log(err));
    }
    return (
      <li onClick={logout}>
        <img src="./img/icons/logout.svg" alt="logout" />
      </li>
    );  
}

export default Logout;