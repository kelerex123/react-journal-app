import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { } from '../../../actions/auth';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

// jest.mock('../../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn()
// }));

// const mockDispatch = jest.fn();

// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useDispatch: () => mockDispatch,
// }));

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
//store.dispatch = jest.fn();

describe('Pruebas en  <RegisterScreen/>', () => {

    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    
    test('debe de mostrase bien', () => {
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/register']}>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de hacer el dispatch de la accion respectiva', () => {

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/register']}>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                value: '', 
                name:'email'
            }
        });
        
        wrapper.find('form').simulate('submit', {preventDefault(){}});

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email no es valido'
        });

    })

    test('debe de mostrar la caja de alerta con el error', () => {

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            }
        };
        
        let store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/register']}>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);
    })


})