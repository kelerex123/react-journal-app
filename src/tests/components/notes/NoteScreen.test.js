import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: '123145',
        displayName: 'Bryan'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [{
            id: 123,
            title: 'Hola',
            body: 'body',
            date: 12
        }],
        active: {
            id: 123,
            title: 'Hola',
            body: 'body',
            date: 12
        }
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <NoteScreen />', () => {

    test('debe mostrarse correctamente', () => {

        const wrapper = mount(
            <Provider store={store}>
                <NoteScreen />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();

    })

    test('debe de disparar el activeNote', () => {

        const wrapper = mount(
            <Provider store={store}>
                <NoteScreen />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {target: {name: 'title', value: 'AAAA'}});

        expect(activeNote).toHaveBeenLastCalledWith(123, {body: 'body', title: 'AAAA', id: 123, date: 12});
            
    })

})