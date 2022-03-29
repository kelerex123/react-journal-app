import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged( auth, async(user) => {
            if ( user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));

            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);

        })
    }, [dispatch, setChecking, setIsLoggedIn])

    if(checking) {
        return (
            <h1>Esperen...</h1>
        )
    }
    

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/auth/*' element={
                        <PublicRoute isAuthenticated={isLoggedIn}>
                            <AuthRouter />
                        </PublicRoute>
                    }/>

                    <Route path='/' element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <JournalScreen />
                        </PrivateRoute>
                    }/>
                    <Route path='*' element={<Navigate to='/auth/login' />} />
                </Routes>
            </div>
            
        </BrowserRouter>
    )
}
