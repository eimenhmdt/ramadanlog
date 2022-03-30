import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from 'moment';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid  from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Auth } from "../context/AuthContext";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import {getDoc, doc, getFirestore, onSnapshot} from 'firebase/firestore';
import TextareaAutosize from '@mui/base/TextareaAutosize';





export default function LogPage() {

    const [loading, setLoading] = useState(true);
    let { habitId } = useParams();
    const [note, setNote] = useState(''); // Hook for the form input for the user to state his opinion.
    const theme = createTheme();
    const [open, setOpen] = useState(false);
    const { currentUser } = Auth();
    const [notes, setNotes] = useState([]);
    const refNotes = firebase.firestore().collection('notes');
    const db = getFirestore()
    const docRef = doc(db, 'habits', habitId) ;
    const [habit, setHabit] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const saveNote = (e) => {   // saves the note to firebase
        e.preventDefault();
        

        firebase.firestore().collection('notes').add({
            habitId: habitId,
            note: note,
            userId: currentUser.uid,
            date: moment().format("MMM Do YY"),

        })
        .catch(error => {
            alert(error.message);
        });
        
        setNote('');
        

    };

    const handleSubmit = (e) => {
        saveNote(e);
        handleClose(e);
      };


      
      
      

      

      
  
      function getNotes() {
          setLoading(true);
          refNotes.where('habitId', '==', habitId).orderBy('date').onSnapshot((querySnapshot) => {
              const items = [];
              querySnapshot.forEach((doc) => {
                  items.push(doc.data());
              });
              setNotes(items);
              setLoading(false);
              });
      }
  
      useEffect(() => {
          getNotes();
          getDoc(docRef)
      .then(snapshot => setHabit(snapshot.data()))
      // eslint-disable-next-line
      }, []);

    

    

    

      return (
        <>




        


<Box sx={{ ml:35, mr: 15, mt: 10, flexGrow: 1, }}>

<Grid container spacing={2}>
  <Grid item xs={14}>
      <Typography sx={{mb:2}} variant="h4">My Ramadan Journal</Typography>
      <Typography variant="h6"> <strong> My Goal: </strong> {habit.habit}</Typography>
      <Typography variant="h6"> <strong>My intention:</strong> {habit.intention}</Typography>
      
      
  </Grid>
  <Grid sx={{ mt:5 }} item xs={8}>
  <Button endIcon={<HistoryEduIcon/>} variant="outlined" color="success" onClick={handleClickOpen}>
            Create a new Journal Entry
        </Button>
  </Grid>

  <Grid sx={{ mt:5, mb:5 }} item xs={12}>
  {notes.map(note => (
      <Accordion key={note.id} sx={{maxWidth: 700, width: '100%',  }}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          
          
        >
          <Typography variant="h6" sx={{}}>Journal Entry from {note.date} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {note.note}
          </Typography>
        </AccordionDetails>
      
      </Accordion>

))
}


  </Grid>
  {/* <Grid item xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid item xs={8}>
    <Item>xs=8</Item>
  </Grid> */}
</Grid>



<Dialog sx={{zIndex: 100000000000000}} open={open} onClose={handleClose}>
              <DialogTitle>Add a New Journal Entry</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Track your progress this Ramadan towards your defined goal.
                  
                </DialogContentText>
                <TextField sx={{mt:10}}
                  autoFocus
                  margin="dense"
                  id="habit"
                  label="How are you making progress with your Ramadan Goal?"
                  type="habit"
                  color="success"
                  fullWidth
                  multiline
                  rows={3}
                  variant="standard"
                  onChange={(e) => setNote(e.target.value)}
                />
            
                
              </DialogContent>
              <DialogActions>
                <Button color="error"  onClick={handleClose}>Cancel</Button>
                <Button color="success" variant="contained" onClick={handleSubmit}>Add Note</Button>
              </DialogActions>
            </Dialog>



</Box>
      </>
      
      

    

    

      )
  






    } 

