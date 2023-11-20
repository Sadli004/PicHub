import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { UidContext } from "../AppContext";
import { deleteComment, editComment } from "../../actions/post.actions";


export const EditDeleteComment = ({comment , postId}) => {
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const [isAuthor, setIsAuthor] = useState(false);
    const [text, setText] = useState("");
    const [edit,setEdit] = useState("false");

 useEffect(() => {   
    const checkAuthor = () => {
        if (uid === comment.commenterId) {
            setIsAuthor(true);
        }    
        else setIsAuthor(false);
    }
    checkAuthor();
},[uid, comment.commenterId])

const handleEdit = (e) => {
    e.preventDefault();
    if(text) {
    dispatch(editComment(postId, comment._id, text))
    setEdit(false);
    setText("")
    }
}
const handleDelete = () => {
    dispatch(deleteComment(postId,comment._id))
} 
  return( 
    <div className="edit-comment">
        { isAuthor && edit === false && (
            <span onClick={()=>setEdit(!edit)}>
                <img src="./img/icons/edit.svg" alt="edit-comment" />
            </span>
        ) }
        { isAuthor && edit && (
            <form action="" className="edit-comment-form" onSubmit={()=> handleEdit()}>
             <label htmlFor="edit" >Edit comment</label>
             <input
               type= "text" 
               name="text"
               onChange={(e)=> setText(e.target.value)}
               defaultValue={comment.text}
              /> 
              <br/>
            <div className="btn">     
             <span onClick={() => 
               {if(window.confirm("Do you want to delete this comment?"))
               handleDelete()}}>
               <img src="./img/icons/trash.svg" alt="delete"/>
             </span> 
            </div>
            <input type="submit" value="Confirm changes"/>
            </form>
        )} 
    </div>
  )
}
