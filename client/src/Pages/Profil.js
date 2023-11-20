import React from "react";
import Log from "../components/log";
import { useContext } from "react";
import {UidContext} from "../components/AppContext"
import UpdateProfil from "../components/Profile/UpdateProfile";


const Profil  = () => { 
    const uid = useContext(UidContext);
    return( 
        <div className="profil-page">
            
            { uid ?  (<UpdateProfil/>) 
            
            : (
            <div className="log-container"> 
                <Log signin={true} signup={false} />
                 <div className="img-container"> 
                  <img alt="log.svg" src= "./img/log.svg"></img>
                 </div>
            </div>)}
        </div>
    )
}

export default Profil;