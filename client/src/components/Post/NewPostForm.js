import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-bootstrap";
import { addPost, getPosts } from "../../actions/post.actions";

export const NewPostForm = () => { 
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postErrors);
    const [message,setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const[file,setFile] = useState();
    const [postPicture, setPostPicture] = useState(null);

    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setFile();
    }   
    const handlePost = async () => {
        if(postPicture || message){
            const data = new FormData();
            data.append("posterId", userData._id );
            data.append("message", message);
            if(file) data.append("file", file);
            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
        }
        else alert("You need to post something");
    }
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    useEffect(()=>{
        if(!isEmpty(userData)) {
            setIsLoading(false)
        }

    },[userData])
    return(
        <div className="post-container">
            {isLoading ?(
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        <p>
                            <span>{userData.following ? userData.following.length : 0}</span>{" "}
                                Abonnement
                            {userData.following && userData.following.length > 1 ? "s" : null}
                        </p>
                        <p>
                            <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
                                Abonné
                            {userData.followers && userData.followers.length > 1 ? "s" : null}
                        </p>
                    </div>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea 
                            name ="message"
                            id="message"
                            onChange={(e)=>setMessage(e.target.value)}
                            value={message}
                            placeholder="Write something"
                        />
                        {message || postPicture ? (
                            <li className="card-container">
                            <div className="card-left">
                              <img src={userData.picture} alt="user-pic" />
                            </div>
                            <div className="card-right">
                              <div className="card-header">
                                <div className="pseudo">
                                  <h3>{userData.pseudo}</h3>
                                </div>
                                <span>{timestampParser(Date.now())}</span>
                              </div>
                              <div className="content">
                                <p>{message}</p>
                                <img src={postPicture} alt="" />
                               </div>
                            </div>
                            </li>
                        ): null}
                    </div>
                    <div className="form-footer">
                        <div className="icon">
                            <img src="./img/icons/picture.svg" alt="img" />
                            <input 
                                type="file"
                                id="file-upload"
                                name="file"
                                accept=".jpg , .png, .jpeg"
                                onChange={(e)=> handlePicture(e)}
                            />    
                        </div>
                            {!isEmpty(error.format) && <p id="format-error">{error.format}</p>}
                            {!isEmpty(error.maxSize) && <p id="size-error">{error.maxSize}</p>}
                        <div className="btn-send">
                            {postPicture || message ? (
                                <button className="cancel" onClick={cancelPost}>Cancel</button>
                            ): null
                            }
                            <button className="send" onClick={handlePost}>Send</button>
                        </div>
                    </div>
                </>    
            )}
        </div>
    )
}