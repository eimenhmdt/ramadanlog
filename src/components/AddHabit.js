import React, { useState } from 'react';
import { firebase } from '../firebase';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Auth, currentUser } from "../context/AuthContext";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';





export const AddHabit =({
    showAddHabitMain = true,
    shouldShowMain = false,
    showQuickAddHabit,
    setShowQuickAddHabit,
    
}) => {
    const [habit, setHabit] = useState('');
    const [showMain, setShowMain] = useState(shouldShowMain);
    const { currentUser } = Auth()
    const [loading, setLoading] = useState(false);
    const ref = firebase.firestore().collection('habits');
    const userMail = currentUser.email;
    const theme = createTheme();

    const addHabit = () => {
        

        return (
            
            
            habit && 
            firebase
                .firestore()
                .collection('habits')
                .add({
                    habit, 
                    userId: currentUser.uid,
                    archived: false,
                        
                    
                })

                .then(()=> {
                    setHabit('');
                    setShowMain('');
                    
                    

   

                })
                
                
                
            );

    };

    return (

        <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
        <CssBaseline />

        
        <div
            className={showQuickAddHabit? 'add-decision add-decision__overlay' : 'add-decision'}
            data-testid="add-decision-comp"
        >
            {showAddHabitMain && (
                <div
                    className="add-decision__shallow"
                    data-testid="show-main-action"
                    onClick={() => setShowMain(!showMain)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') setShowMain(!showMain);
                    }}
                    tabIndex={0}
                    aria-label="Add decision"
                    role="button"
                >
                    <span className="add-decision__plus">+</span>
                    <span className="add-decision__text">Add Decision</span>
                </div>

               
        )}
        
        {(showMain || showQuickAddHabit) && (
            <div className="add-decision__main" data-testid="add-decision-main">
                {showQuickAddHabit && (
                    <>
                        <div data-testid="quick-add-decision">
                            {/* <h2 className="header">Quick Add Decision</h2> */}
                            <span
                                className="add-decision__cancel-x"
                                data-testid="add-decision-quick-cancel"
                                aria-label="Cancel adding decision"
                                onClick={() => {
                                    setShowMain(false);
                                    
                                    setShowQuickAddHabit(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            setShowMain(false);
                            
                            setShowQuickAddHabit(false);
                            }
                        }}
                        tabIndex={0}
                        role="button"
                        >
                        X
                        </span>
                    </div>
                    </>
                )}

                

        

                <h2> Add a new Habit</h2>

                
                
                

                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    color="secondary"
                    margin="dense"
                    placeholder="How would you describe the decision in a few words?"
                    required
                    fullWidth
                    autoFocus
                    onChange={(e) => setHabit(e.target.value)}
                />
        
        
                <button
                    type="button"
                    className="add-decision__submit"
                    data-testid="add-decision"
                    onClick={() =>
                    showQuickAddHabit
                        ? addHabit() && setShowQuickAddHabit(false)
                        : addHabit()
                    }
                >
                    Add Ramadan Habit
                </button>
                {!showQuickAddHabit && (
                    <span
                    className="add-decision__cancel"
                    data-testid="add-decision-main-cancel"
                    onClick={() => {
                        setShowMain(false);
                        
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                        setShowMain(false);
                        
                        }
                    }}
                    aria-label="Cancel adding a decision"
                    tabIndex={0}
                    role="button"
                >
                    Cancel
                </span>
                
            )}
            
           
            
            </div>
         )}
        </div>
     </Container>
    </ThemeProvider>
    );
};


