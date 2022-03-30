import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Outlet,
  Routes,
  Route,
  Navigate,
  useNavigate 
} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { firebase } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvider } from "./context/AuthContext";
import { Auth } from "./context/AuthContext";
import Dashboard from './routes/Dashboard'
import Log from './routes/Log'



const queryClient = new QueryClient()




function Appy() {

  const { currentUser } = Auth()

  const ProtectedRoute = ({ currentUser = Auth(), redirectPath = '/login' }) => {
    if (!currentUser) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
  };

  
  return (



    

    <QueryClientProvider client={queryClient}>

      
      <ToastContainer />
      <AuthProvider>
      <Routes>
      
        <Route exact path='/login' element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />  
        <Route element={<ProtectedRoute currentUser={currentUser}/>}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path=":habitId" element={<Log/>} />
        </Route>
       
        

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
            }
          />

    
          
      </Routes>
      </AuthProvider> 
  </QueryClientProvider>
  
)}



export default Appy;