import {mount} from 'enzyme';
import { Sidebar } from '../../../components/journal/Sidebar';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {  startLogout } from '../../../actions/auth';
import { startNewNotes, noteLogout } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
    startNewNotes: jest.fn(),
    noteLogout: jest.fn()
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
        notes: [],
        active: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();
describe('Pruebas en <Sidebar />', () => {

    test('debe de mostrarse correctamente ', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();

    })

    test('debe de llamar el startLogout ', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )

        wrapper.find('button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
        expect(noteLogout).toHaveBeenCalled();


    })

    test('debe de llamar el startNewNote ', () => {

        const wrapper = mount(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        )

        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNotes).toHaveBeenCalled();
    })

})