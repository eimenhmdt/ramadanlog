
import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from "react-router-dom";
import { firebase } from '../firebase';
import {Auth} from '../context/AuthContext';
import LogPage from '../components/LogPage';
import Drawer from '../components/Drawer';
import { useNavigate } from 'react-router-dom';


export default function Log() {

    const { currentUser, logout } = Auth();
    const navigate = useNavigate()
    

    return (

        
        
                <main
                data-testid="application">

                    

                

                    <Drawer/>
                    <LogPage/>
                    
  
                </main>
                
            
    );
    
    
};



