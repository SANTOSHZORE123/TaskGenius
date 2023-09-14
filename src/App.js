//importing libraries
import React from 'react';
import Header from './Components/Header';

import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import "./App.css"
//Main Component
function App() {
  return (
    <>
       <Header/>
       <div className='MainContainer'>
          <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/Login" component={Login}></Route>
                <Route exact path="/SignUp" component={SignUp}></Route>
                <Route exact path="/User" component={User}></Route>
          </Switch>
       </div>
    </>
  );
}

export default App;
