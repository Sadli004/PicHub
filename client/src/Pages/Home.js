import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import { Thread } from "../components/Thread";
import Log from "../components/log"; 
import FriendsHint from "../components/Profile/FriendsHint"
import { NewPostForm } from "../components/Post/NewPostForm";
import Trends from "../components/Trends";
import '../styles/pages/_profil.scss';
import '../styles/components/_connectionForm.scss';
import '../styles/components/_newPostForm.scss';
import LeftNav from "../components/LeftNav";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home-container">
      {uid ? (
        <div className="home">
          <LeftNav />
          <div className="main">
            <div className="home-header">
              <NewPostForm />
            </div>
              <Thread />
          </div>
          <div className="right-side">
            <div className="right-side-container">
              <div className="wrapper">
                <Trends />
                {uid && <FriendsHint />}
              </div>
            </div>
          </div>
         </div> 
      ) : (
        <div className="welcome-sign-container">
          <h1>Welcome Back</h1>
          <div className="log-container" >
            <Log signin={true} signup={false} />
              <div className="img-container"> 
                  <img alt="log.svg" src= "./img/log.svg"></img>
              </div>
          </div>
        </div>
      )}
      </div>
  );
}

export default Home;
