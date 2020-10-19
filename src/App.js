import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import {useStateValue} from "./StateProvider";
import {actionTypes} from './Reducer';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { auth } from './firebase';

const App = () => {

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {

    console.log(user)
    auth.onAuthStateChanged(userAuth => {
      dispatch({
        type: actionTypes.SET_USER,
        user: userAuth,
      })
    })



  }, [])

  return (
    <div className="app">

      {!user ? (
        <Login />
      ) : (
          <div className="app-body">

            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:userId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>

          </div>
        )
      }
    </div>
  );
}

export default App;
