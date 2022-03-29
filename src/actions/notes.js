import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload";

// react-journal

export const startNewNotes = () => {
    return async(dispatch, getState) => {
        
        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body : '',
            date: new Date().getTime()
        }

        try {
            const document = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
            
            dispatch(activeNote(document.id, newNote));
            dispatch(addNewNote(document.id, newNote));
            
        } catch (error) {
            console.log(error) 
        }

    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

// export const refreshNote = (id, note) => ({
//     type: types.notesUpdate,
//     payload: {
//         id,
//         ...note
//     }
// })


export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: [...notes]
})

export const startSaveNotes = (note) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;

        if(!note.url) {
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);
        console.log('ga')
        dispatch(refreshNote(note.id, noteToFirestore))

        Swal.fire({
            title: 'Saved',
            text: note.title,
            icon: 'success'
        })
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        ...note
    }
})

export const startUploading = (file) => {
    return async(dispatch, getState) => {
        
        const activeNote = getState().notes.active;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl
        dispatch(startSaveNotes(activeNote))
        console.log('ga');

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        
        const uid = getState().auth.uid;

        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));

        dispatch(deleteNote(id));

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id  
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})