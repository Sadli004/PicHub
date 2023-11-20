import React, { useEffect, useState } from "react";
import { followUser, UnfollowUser } from "../../actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
export const FollowHandler = ({idtoFollow, type}) => { 
    const dispatch = useDispatch();
    const userData = useSelector((state)=> state.userReducer);
    const [isFollowed, setIsFollowed] = useState (false); 
    
    const handleFollow = () => { 
        dispatch(followUser(userData._id , idtoFollow));
        setIsFollowed(true);
    }
    const handleUnfollow = () => { 
        dispatch(UnfollowUser(userData._id , idtoFollow));
        setIsFollowed(false);
    }
    useEffect(() => {
      if (!isEmpty(userData.following)) {
        if (userData.following.includes(idtoFollow)) {
          setIsFollowed(true);
        } else setIsFollowed(false);
      }
    }, [userData, idtoFollow]);
  

   return (
   <div>
     <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && <button className="unfollow-btn">Following</button>}
          {type === "card" && <img src="./img/icons/checked.svg" alt="checked"/>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && <button className="follow-btn">Follow</button>}
          {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
        </span>
      )}
    </>
   </div> 
   )
}

export default FollowHandler;