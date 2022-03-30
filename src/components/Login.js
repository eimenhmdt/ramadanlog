import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid  from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth } from '../context/AuthContext';
import { useRef, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import Typewriter from 'typewriter-effect';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        <a>
        Created with 🤲 by Eimen Hamedat.
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
const theme = createTheme();



export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { login } = Auth()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const linkStyle = {
        textDecoration: "none",
        color: 'blue'
      };


   

    async function handleSubmit(e) {
        e.preventDefault()

        // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        //     toast.error("Passwords do not match");
        // }

        setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          .then((response) => {
            navigate('/dashboard')
        })
        .catch((error) => {
            console.log(error.code)
            if (error.code === 'auth/wrong-password') {
              toast.error('Your password is incorrect');
            }
            if (error.code === 'auth/user-not-found') {
              toast.error('Your email is incorrect');
            }
          })
        
        
    
        setLoading(false)
      }


    return (

        
        


    <ThemeProvider theme={theme}>
    <Confetti/>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >




<Typography sx={{ m: 5}}  variant="h5">
<Typewriter
  options={{
    strings: ['Ramadan Mubarak! 🎉', 'Keep me in your Duas 🤲 '],
    autoStart: true,
    loop: true,
  }}
  textStyle={{
    fontSize: '30px',
  }}
/>
          </Typography>
          <Avatar sx={{ m: 1, backgroundColor: '#4caf50', }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>



    <Grid  justifyContent="center">

   


        


        <div className="loginpage">
 
                <TextField sx ={{color: '#4caf50'}}
                    id="email"
                    label="Email Address "
                    variant="outlined"
                    color="success"
                    margin="dense"
                    required
                    fullWidth
                    autoFocus
                    inputRef={emailRef}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    color="success"
                    margin="dense"
                    name="password"
                    type="password"
                    required
                    fullWidth
                    inputRef={passwordRef}
                />


               

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
                <Button fullWidth sx={{ mt: 3, mb: 2 }} color="success" variant="contained" onClick={handleSubmit}> Log In </Button>
            {/* </Box> */}

            <Grid container>
              <Grid item>

            <Typography varian="body" >
           Don't have an account yet? <Link to='/signup' style={linkStyle}> Sign Up</Link>
          </Typography>
              </Grid>
            </Grid>
        
            

            
        </div>

    </Grid>

    </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

    </Container>
    </ThemeProvider>
        
    );
}