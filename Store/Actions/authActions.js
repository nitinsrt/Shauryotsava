import {AsyncStorage} from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token,userId,expiryTime)=>{
    return dispatch=>{
        dispatch(setlogoutTimer(expiryTime))
        dispatch({
            type: AUTHENTICATE, token: token,userId: userId
        })
    }

  
};
let timer;
export const signUp = (email,password,confirm,collegeName)=>{
  return async dispatch =>{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACRUE1NNCOPy-WB8pJS5TAkvo_4k7TzRc',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email,
              password,
              confirm,
              collegeName,
              returnSecureToken: true
          })
      })
      if(!response.ok){
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message ='Something Went Wrong!!'
        if(errorId === 'EMAIL_EXISTS'){
            message= 'This email already exists'
        }  
        throw new Error(message)
    }
      const resData = await response.json()
      dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId,collegeName:collegeName});
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000)
        saveTokenandId(resData.idToken,resData.localId,expirationDate);
  }
}

export const login = (email,password)=>{
    return async dispatch =>{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACRUE1NNCOPy-WB8pJS5TAkvo_4k7TzRc',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something Went Wrong!!'
            
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'This email does not exist'
            }
            else if(errorId === 'INVALID_PASSWORD'){
                message = 'Please enter correct password'
            }
            throw new Error(message)
        }
       
        
        const resData = await response.json()
        dispatch({type: LOGIN, token: resData.idToken, userId: resData.localId });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)* 1000)
        saveTokenandId(resData.idToken,resData.localId,expirationDate);
    }
  };

  export const logout = ()=>{
      clearLogoutTimer();
      AsyncStorage.removeItem('userData')
      return {
          type: LOGOUT
      }
  }

  const clearLogoutTimer = ()=>{
      if(timer){
          clearTimeout(timer)
      }
  }

  const setlogoutTimer = (expirationTime)=>{
    return dispatch =>{
        timer = setTimeout(()=>{
            dispatch(logout())
        },expirationTime)
    }
  }

  const saveTokenandId = (token,userId,expirationDate)=>{
      AsyncStorage.setItem('userData',JSON.stringify({
          token,
          userId,
          expiryTime: expirationDate.toISOString()
      }))
  }