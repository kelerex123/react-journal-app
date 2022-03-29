import { doc, updateDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startSaveNotes, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';

const noScroll = () => {};
Object.defineProperty( window, 'scrollTo', { value: noScroll, writable: true } );

jest.mock('../../helpers/fileUpload');

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
 
const initState = {
    auth: {
        uid: 'testing'
    },
    notes: {
        active: {
            id: '59ckGkSFwjNvJdfTDiM6',
            title: 'hola',
            body: 'mundo'
        }
    }
}

let store = mockStore(initState)

describe('Pruebas en notes-actions', () => {

    beforeEach( () => {

        store = mockStore(initState)

    })

    //F
    // test('StartUploading debe de actualizar el url del entry', async() => {
    
    //     fileUpload.mockReturnValue('https://hola-mundo.com/ga.jpg');
    //     const file = new File([], 'foto.jpg')
    //     await store.dispatch(startUploading(file));
    //     const actions = store.getActions();
    //     const state = store.getState();
    //     console.log(state);
    //     console.log(actions);
        
        

    // })

})