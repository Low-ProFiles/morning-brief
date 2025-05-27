// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.jsx';
import authInstance from "./service/auth";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
const RootComponent = () => (
  <BrowserRouter>
    <App auth={authInstance} />
  </BrowserRouter>
);
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);

