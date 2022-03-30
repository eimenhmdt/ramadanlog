import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import './index.css';

// import './App.scss';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useState } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ReactDOM from 'react-dom';
import React from 'react';
import { AuthProvider } from "./context/AuthContext";




const queryClient = new QueryClient()

const rootElement = document.getElementById("root");







ReactDOM.render(
  



  <AuthProvider>
  <React.StrictMode>
    <BrowserRouter basename="/ramadanlog">
      <App/>
    </BrowserRouter>
  </React.StrictMode>
  </AuthProvider>,
   document.getElementById("root")
  
);