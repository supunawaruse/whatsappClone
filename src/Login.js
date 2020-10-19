import React from 'react'
import "./Login.css";
import { Button } from '@material-ui/core';
import {auth,provider} from './firebase';
import {useStateValue} from "./StateProvider";
import {actionTypes} from './Reducer';
import {AddUser} from './Network';

const Login = () => {

    const [state,dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then(result =>{
            console.log(result)
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            }) 
            AddUser(result.user.displayName,result.user.email,result.user.uid,result.user.photoURL)
        })
        .catch((error)=>{
            alert(error.message);
        })

        console.log(state);
    }



    return (
      <div className="login">
          <div className="login-container">
            <img src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png"/>
            <h1>WhatsApp</h1>
          <Button onClick={signIn}>Login with Google</Button>
          </div>
      </div>
    )
}

export default Login;