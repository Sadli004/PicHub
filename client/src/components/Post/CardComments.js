import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addComment, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";
import { EditDeleteComment } from "./EditDeleteComment";
import FollowHandler from "../Profile/FollowHandler"

// Previous Code (with updated class names)
export const CardComment = ({ post }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.allUsersReducer);

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData._pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(''));
    }
  };

  return (
    <div className="comments-container" id="comments-cntnr" >
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client" // Updated class name
                : "comment-container" // Updated class name
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="comment-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData && (
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Write comment"
          />
          <br />
          <input type="submit" value="Comment" /> {/* Updated button text */}
        </form>
      )}
    </div>
  );
};
