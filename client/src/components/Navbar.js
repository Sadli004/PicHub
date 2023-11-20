import React from "react";
import { Link } from 'react-router-dom'
import {UidContext} from './AppContext'
import Logout from "./log/Logout";
import { useSelector } from "react-redux";
const Navbar = () => { 
  const uid=React.useContext(UidContext);
  const userData = useSelector((state) => state.userReducer)
    return ( 
      <nav>
      <div className="nav-container">
        <div className="logo">
          <Link  to="/" exact>
            <div className="logo">
              {/* <img src="./img/icon.png" alt="icon" /> */}
              <h3>PicHub</h3>
            </div>
          </Link>
        </div>
       <div>
        {uid?  (
        <ul>
          <li className="welcome" style={{display:"flex"}}>
            <Link to="/profile" exact>
              <img src={userData.picture} alt="pfp"  /> 
            </Link>
              {/* <span style={{margin:"5px"}}>{userData.pseudo}</span> */}
          </li>
          <li>
            <Logout />
          </li>
        </ul>
        ) : (
          <ul>
             
            <li>
              <Link to="/profile" exact>
                <img src="./img/icons/login.svg" alt="login"/>
              </Link>
            </li>
          </ul>
        ) }
       </div>
      </div>  
      </nav>
    )
}
export default Navbar;