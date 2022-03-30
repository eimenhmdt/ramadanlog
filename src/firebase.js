import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useState, useEffect} from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCriFuXe_L8ExTqBJPAhIwDs0LdSNuoeGY",
    authDomain: "ramadan-log.firebaseapp.com",
    projectId: "ramadan-log",
    storageBucket: "ramadan-log.appspot.com",
    messagingSenderId: "777514130448",
    appId: "1:777514130448:web:f786c3cdd31432eef0be95",
    measurementId: "G-WCLQNMB3JX"
});


export const auth = firebaseConfig.auth()

export { firebaseConfig as firebase };
