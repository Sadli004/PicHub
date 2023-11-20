import * as userActions from "../actions/user.actions"

const initialState = {};
export default function userReducer (state = initialState, action) { 
 switch (action.type) {
    case userActions.GET_USER:
        return action.payload;
    
    case userActions.UPLOAD_PICTURE :
        return {
         ...state,   
         picture:action.payload
      }
    case userActions.FOLLOW_USER :
        return {
         ...state,   
         following: [action.payload.idtoFollow, ...state.following]
      } 
    case userActions.UNFOLLOW_USER :
        return {
         ...state,   
         following: state.following.filter(
            (id) => id !== action.payload.idtoUnfollow)
      }
    case userActions.UPDATE_BIO :
        return {
         ...state,   
         bio : action.payload
      }     
    default:
        return state;
 }     
};