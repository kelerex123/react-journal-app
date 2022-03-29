import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { JournalEntry } from '../../../components/journal/JournalEntry';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <JournalEntry />', () => {

    test('debe de mostrarse correctamente ', () => {
        const nota = {
            id: 10,
            date: 0,
            title: 'hola',
            body: 'mundo',
            url: 'https://hola-mundo.com/foto.jpg'
        }
        const wrapper = mount(
            <Provider store={store}>
                <JournalEntry {...nota}/>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();

    })

    test('debe de activar la nota', () => {

        const nota = {
            id: 10,
            date: 0,
            title: 'hola',
            body: 'mundo',
            url: 'https://hola-mundo.com/foto.jpg'
        }
        const wrapper = mount(
            <Provider store={store}>
                <JournalEntry {...nota}/>
            </Provider>
        )

        wrapper.find('.journal__entry').simulate('click');

        expect(store.dispatch).toHaveBeenCalledWith(activeNote(nota.id, {...nota}));
        
    })

})