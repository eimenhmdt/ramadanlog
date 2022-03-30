import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { Auth } from "../context/AuthContext";


export const useHabits = selectedProject => {
    const [habits, setHabits] = useState([]);
    const [archivedHabits, setArchivedHabits] = useState([]);
    const { currentUser } = Auth();

    useEffect(() => { 
        let unsubscribe = firebase
            .firestore()
            .collection('habits')
            .where('userId', '==', currentUser.uid);
            
            unsubscribe = unsubscribe.onSnapshot(snapshot => {
                const newHabits = snapshot.docs.map(decision => ({
                    id: decision.id,
                    ...decision.data(),



                }));

                setHabits(
                    selectedProject === 'NEXT_7'
                    ? newHabits.filter(
                        habit => moment(habit.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                        habit.archived !==true
                    )
                    : newHabits.filter(habit => habit.archived !== true)
                );

                setArchivedHabits(newHabits.filter(decision => decision.archived !== false));
            });

            return () => unsubscribe();

    }, [selectedProject]);

    return { habits, archivedHabits};

};

