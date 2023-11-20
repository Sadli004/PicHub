import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, dateParser } from "../Utils";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";
import { CardComment } from "./CardComments";


export const CardPost = ({post}) => { 
const [isLoading, setIsLoading] = useState(true);
const [isUpdated,setIsUpdated] = useState(false);
const [textUpdate, setTextUpdate] = useState(null);
const [showComments, setShowComments] = useState(false);
const usersData = useSelector(state => state.allUsersReducer);
const userData =   useSelector(state => state.userReducer); 
const dispatch = useDispatch();

const updateItem = () => { 
  if(textUpdate) {
   dispatch(updatePost(post._id, textUpdate))
  }
  setIsUpdated(false)
}
const cancelUpdatePost = () => {
  setIsUpdated(false);
}

useEffect(() => {
  if (!isEmpty(usersData[0])) { 
   setIsLoading(false);
  }

}, [usersData]
)
return ( 
    <li className="card-container" key={post._id}>
    {isLoading ? (
     <i className="fas fa-spinner fa-spin"></i>
    ): (
      <>
      
       <div className="card-left">
        <img src= { 
          !isEmpty(usersData[0]) && 
           usersData.map((user) => { 
             if ((user._id === post.posterId)) return user.picture;
            else return null;
           })
           .join("")   
        } 
        alt="profile-pic" />
       </div>
       
        <Card style={{border : "none"}}>
          
        <div className="card-right">
          <Card.Header style={{display : "flex", justifyContent: "space-between", backgroundColor : "white", border : "none"}}> 
            
            <h3>
              {!isEmpty(usersData[0]) && 
                usersData.map((user) =>{
                  if(user._id === post.posterId) return user.pseudo
                    else return null;
                })
                  .join("")
              }
           </h3>
           <span>{dateParser(post.createdAt)}</span>
          </Card.Header> 
          
        <Card.Body>  
            {isUpdated === false && <p>{post.message}</p>}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                    />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}>
                    Confirm changes
                    </button>
                    <button className="btn" onClick={cancelUpdatePost} type="reset" value="Cancel">
                      Cancel
                    </button>
                  </div>
                </div>
            )}
        </Card.Body>
        { post.picture &&
        <Card.Img src= {post.picture} alt = "post pic" className="card-pic" />
          }
        {userData._id === post.posterId && ( 
            <div className="button-container">
             <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
              </div>
                <DeleteCard id = {post._id} />  
            </div>
          
        )  
        } 
        </div> 
        {/* <div className="card-footer"> */}
          <Card.Footer style={{border : "none", display : "flex", justifyContent :"space-between", backgroundColor : "white"}}>
            <div className="comment-icon">
             <img 
             onClick={() => setShowComments(!showComments)}
             src="./img/icons/message1.svg" 
             alt="comments" 
             />
             <span>{post.comments.length}</span>   
            </div>
             
             < LikeButton post = {post} />
              <img src="./img/icons/share.svg" alt="share" />
          </Card.Footer>
        {/* </div>   */}
        
       </Card>
      
      </>
    )}
    {showComments && <CardComment post={post}/>}
    </li>
)
}
export default Card;