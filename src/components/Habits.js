import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { useHabits } from '../hooks';
import { Auth } from "../context/AuthContext";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CardActionArea from '@mui/material/CardActionArea';








export const Habits = () => {

    const ref = firebase.firestore().collection('habits');
    const { currentUser } = Auth();
    const refHabits = firebase.firestore().collection('habits');
    
    const { habits } = useHabits();

    function deleteHabit(id) {
        
        refHabits.doc(id).delete()
        
    };
    

    function Counter() {
        const [count, setCount] = React.useState(0)
        const increment = () => setCount(c => c + 1)
        return (
        <div className="votebox">
            <button className="votebutton" onClick={increment}>  <HowToRegIcon/>  </button>
            <div> Successful Completions: {count} </div>
        </div>
        )
    
      }



    
    


    return (

        <>
        
   

        <Box ml={50} mt={10}>
        <h2> My Goals for Ramadan</h2>
        

        

        <Grid container spacing={2} margin= "0" sx={{width: '100%', maxWidth:'800px'}}>
        
        {
        habits.map(habit=> (
            
            <Grid item xs={4}>
                
                
            <Card key={habits.id} sx={{
    // some styles
    maxWidth: 600,
    height: 250,
    boxShadow: 3,
    borderRadius: 5,
    
    ":hover": {

    
    
    transform: "scale(1.01)",
    
    boxShadow: 3,
    },
  }}
 >
   
                <CardHeader
                className={"MuiCardHeader-root"}
                // title={habit.habit}
                action={<IconButton onClick={()=> deleteHabit(habit.id)}> <DeleteOutlined/>  </IconButton> }
                // action={<IconButton onClick={()=> console.log('The link was clicked.')}> <DeleteOutlined/>  </IconButton> }
                // action={ <Button color="secondary" fullWidth variant="outlined" ><Link to={`/${decision.id}`}  key={`${decision.id}`}>Open Decision </Link></Button>}
                
                
                />
                 
                
                <CardContent className={"MuiCardContent-root"}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >

                    <Grid container>
                    <Grid container justify="space-evenly">
                        <Typography variant="h6"> {habit.habit} </Typography>
                        </Grid>
                        
                        
                    </Grid>
                    {/* <Grid item xs={12} >
                    <Counter/>
                    </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={14}> 
                    <CardActions>
                            <Button position="absolute"  color="success" fullWidth  variant="outlined" component={RouterLink} to={`/${habit.id}`} >Open Journal</Button>
                    </CardActions>

                </Grid>
                </CardContent>
               
            </Card>
            
            </Grid>
        ))
        }
        </Grid>


    

    </Box>
        
    

        </> 

 )}

