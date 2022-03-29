import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { googleAuthProvider } from '../firebase/firebaseConfig'
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';

import Swal from 'sweetalert2';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return async(dispatch) => {
        dispatch(startLoading());
        const auth = getAuth();
        // signInWithEmailAndPassword(auth, email, password)
        // .then(({user}) => {
        //     dispatch(finishLoading())
        //     dispatch(login(user.uid, user.displayName))

        // })
        // .catch((error) => {
        //     dispatch(finishLoading())
        //     const errorMessage = error.message;
        //     Swal.fire({
        //         icon: 'error',
        //         text: errorMessage
        //     })
        // });
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            dispatch(finishLoading())
            dispatch(login(user.uid, user.displayName))
        } catch (error) {
            dispatch(finishLoading())
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                text: errorMessage
            })
        }

        
    }
}

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) => {
                await updateProfile(user, {displayName: name})
                dispatch(login(user.uid, user.displayName))
            })
            .catch( err => {
                const errorMessage = err.message;
                Swal.fire({
                    icon: 'error',
                    text: errorMessage
                })
            })

    }
}

export const startGoogleLogin = () => {
    return async(dispatch) => {
        const auth = getAuth();

        try {
           const {user} = await signInWithPopup(auth, googleAuthProvider);
           dispatch(login(user.uid, user.displayName));
        } catch (error) {
            console.log(error);
        }

        // signInWithPopup(auth, googleAuthProvider)
        //     .then(({user}) => {
        //         dispatch(login(user.uid, user.displayName));
        //     })
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch(logout());
        dispatch(noteLogout());
    }
};

export const logout = () => ({
    type: types.logout
});
