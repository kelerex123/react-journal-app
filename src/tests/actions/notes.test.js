/**
 * @jest-environment node
 */
import { deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNotes, startSaveNotes } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import { types }  from "../../types/types";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'testing'
    },
    notes: {
        active: {
            id: '59ckGkSFwjNvJdfTDiM6',
            title: 'titulo',
            body: 'body'
        }
    }
}

let store = mockStore(initState)

describe('Pruebas en notes-actions', () => {

    beforeEach( () => {

        store = mockStore(initState)

    })

    test('debe de crear una nueva nota en StartNewNote ', async() => {

        await store.dispatch(startNewNotes());

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[0].payload.id;
        await deleteDoc(doc(db, `testing/journal/notes/${docId}`));

    })

    test('startLoadingNotes debe cargar las notas', async() => {

        await store.dispatch(startLoadingNotes('testing'));

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const expected = {
            id: expect.any(String),
            body: expect.any(String),
            title: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected)

    })

    test('startSaveNote debe de actualizar la nota', async() => {
        
        const note = {
            id: 'Em7QhICsJQ5ax6Ltsw7Q',
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch(startSaveNotes(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdate);
        
        const docRef = await getDoc(doc(db, `/testing/journal/notes/${note.id}`));
        expect(docRef.data().title).toBe('titulo');


    })

})