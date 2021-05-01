import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../Actions/authActions";

const initialState = {
    token: null,
    userId: null,
    collegeName: []
}

const authReducer = (state=initialState,action) =>{
      switch(action.type){
          case LOGIN: 
          return {
              token: action.token,
              userId: action.userId
          }
          case SIGNUP: 
          return{
              token: action.token,
              userId: action.userId,
              collegeName: action.collegeName
          }
          case AUTHENTICATE:
              return {
                  token: action.token,
                  userId: action.userId
              }
            case LOGOUT: return initialState
          
          default: 
          return state;
      }
};

export default authReducer;