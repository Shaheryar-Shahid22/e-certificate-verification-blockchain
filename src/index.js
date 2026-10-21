import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"; // importing bootstrap css for reactStrap
import "bootstrap/dist/js/bootstrap"; // importing bootstrap Js for collapse
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";
import * as admin from "firebase-admin";
import "../src/email";

admin.initializeApp();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
