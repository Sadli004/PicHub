import { useDispatch, useSelector } from "react-redux";
import React,{ useEffect } from "react";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "./Utils";
import {NavLink} from 'react-router-dom'
export const Trends = () => {
    const dispatch=useDispatch();
    const posts = useSelector(state => state.allPostsReducer);
    const usersData = useSelector(state=>state.allUsersReducer);
    const trendList = useSelector(state=>state.trendingReducer);
    
    
    useEffect(() => {
        if(!isEmpty(posts[0])){
            const postsArr = Object.keys(posts).map(i => posts[i]);
            const sortedArray = postsArr.sort((a,b) => {
                return b.likers.length - a.likers.length
            })

             sortedArray.length = 3;
            dispatch(getTrends(sortedArray));
        }
    },[posts,dispatch])
    return (
        <div className="trending-container">
            <h4>Trending</h4>
                <ul>
                    {trendList.length 
                    && trendList.map(post => {
                        return (
                            <li key={post._id}>
                                <div>
                                    {post.picture && (<img src={post.picture} alt="post-pic"/> )}
                                    {isEmpty(post.picture) && (<img src = {usersData[0] && usersData.map(user => {
                                        if(user._id === post.posterId){ return user.picture}
                                        else return null
                                    })
                                    .join("")
                                    } alt ="profile-pic"/>
                                    )}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <NavLink exact to ="/trending" >
                                        <span>Lire</span>
                                    </NavLink>
                                </div>
                            </li>
                        )
                    }
                    )}
                </ul>
        </div>
    )
}

export default Trends;