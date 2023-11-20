import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";

const LikeButton = ({ post }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const uid = useContext(UidContext);

  const like = () => {
    dispatch(likePost(post._id, uid));
    setIsLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setIsLiked(false);
  }

  useEffect(() => {
    // Only depend on uid and post.likers
    if (post.likers.includes(uid)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [uid, post.likers]);

  return (
    <div className="like-container">
      {isLiked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {isLiked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
}

export default LikeButton;
