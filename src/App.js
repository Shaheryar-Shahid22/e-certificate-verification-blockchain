import React, { useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client'
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';
// import "./sb-admin-2.min.css"
import axios from "axios";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './dashboard';
import Login from './Components/Login';
import "../src/firebase";
import Buttons from './Components/buttons';
import SidebarAndHeader from './Components/SidebarAndHeader';
import Routes from './Routes';
import Signup from './Components/Signup';
import AfterLogin from './Components/AfterLogin';
import NotFound from './Components/NotFound';

function App() {
  let validation = localStorage.getItem("webToken");
  debugger;
  if (!validation) {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/Signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AfterLogin} />
          <Route path="/dashboard" component={Routes} />
        </Switch >
      </div >
    </Router >
  );
}

export default App;
