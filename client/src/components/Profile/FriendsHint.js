import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.allUsersReducer);

  useEffect(() => {
    const notFriendList = () => {
      let notFriends = usersData.filter((user) =>
        user._id !== userData._id && !user.followers.includes(userData._id)
      );
      notFriends.sort(() => 0.5 - Math.random());

      // Limit the number of suggestions based on screen height
      let suggestionsLimit = 0;
      if (window.innerHeight > 780) suggestionsLimit = 5;
      else if (window.innerHeight > 720) suggestionsLimit = 4;
      else if (window.innerHeight > 615) suggestionsLimit = 3;
      else if (window.innerHeight > 540) suggestionsLimit = 1;

      setFriendsHint(notFriends.slice(0, suggestionsLimit));
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint.map((user) => (
            <li className="user-hint" key={user._id}>
              <img src={user.picture} alt="user-pic" />
              <p>{user.pseudo}</p>
              <FollowHandler idtoFollow={user._id} type={"suggestion"} />
            </li>
          ))
          }
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
