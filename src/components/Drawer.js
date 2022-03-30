import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { Auth } from '../context/AuthContext';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { firebase } from '../firebase';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



const drawerWidth = 240;

export default function PermanentDrawerLeft() {

    const { currentUser, logout } = Auth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [habit, setHabit] = useState('');
    const [intention, setIntention] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    


    const addHabit = () => {
              
      
        return (
            
            
            habit && 
            firebase
                .firestore()
                .collection('habits')
                .add({
                    habit,
                    intention,
                    userId: currentUser.uid,
                    intention,
                        
                    
                })
    
                .then(()=> {
                    setHabit('');
                    setIntention('')
                    handleClose();
    
                })
            );
    };



    
    

   
    

    async function handleLogout() {
        await logout()
        navigate("/login")
   
    }

    return (

        <>

        <div>
            

        

        <Dialog sx={{zIndex: 100000000000000}} open={open} onClose={handleClose}>
        
              <DialogTitle>Add a New Goal 🎯 </DialogTitle>
              <DialogContent>
                <DialogContentText>
                 Use the form below to add a new Ramadan goal and your intentions for this goal to your Ramadon Log! 
                </DialogContentText>
                <TextField sx={{mt:5}}
                  autoFocus
                  margin="dense"
                  id="habit"
                  label="Give your Ramadan goal a catchy title"
                  type="habit"
                  color="success"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setHabit(e.target.value)}
                />
                <TextField sx={{mt:4}}
                  margin="dense"
                  id="intention"
                  label="What is your intention for this goal?"
                  type="habit"
                  color="success"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setIntention(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button color="error"  onClick={handleClose}>Cancel</Button>
                <Button color="success" variant="contained" onClick={addHabit}>Add Goal</Button>
              </DialogActions>
            </Dialog>
        </div>
      
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer 
          sx={{
            width: drawerWidth,
            zIndex: 100000000000000000000,
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#4caf50',
              color:'white'
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar style={{ height: '40px' }}> </Toolbar>
          <Divider />
          <List>
            <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <FormatListBulletedIcon style={{fill: "#ffea00"}}/>
                </ListItemIcon>
                <ListItemText primary= "Goal List" />
              </ListItem>
          </List>
          <List>
            <ListItem button onClick={handleClickOpen}
                >
                <ListItemIcon>
                  <AddCircleOutlineIcon style={{fill: "#ffea00"}}/>
                </ListItemIcon>
                <ListItemText primary= "Add New Goal" />
              </ListItem>
          </List>
          <List>
            <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon style={{fill: "#ffea00"}} />
                </ListItemIcon>
                <ListItemText primary= "Sign Out" />
              </ListItem>
          </List>
          
        </Drawer>
        
      </Box>
      </>
    );
  }