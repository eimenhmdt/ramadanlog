import React from 'react';
import { Auth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Drawer from '../components/Drawer';
import HabitList from '../components/HabitList';
import {Habits} from '../components/Habits';



export default function Dashboard() {

    const { currentUser, logout } = Auth();
    const navigate = useNavigate()
    

    return (

        
        
                <main
                data-testid="application">

                    

                
                   
                    <Drawer/>
                    <Habits/>
                    
  
                </main>
                
            
    );
    
    
};
