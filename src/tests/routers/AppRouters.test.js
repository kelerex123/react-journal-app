import { act } from '@testing-library/react';
import {mount} from 'enzyme';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    notes: {
        notes: [],
        active: null
    },
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Pruebas en <AppRouter />', () => {

    test('debe de llamar el login si estoy autenticado', async() => {

        let user;

        await act( async() => {
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            );  
          
        })

        expect(login).toHaveBeenCalledWith("S24c7TIY27Zp1ttVOVxIS3NKZBs1", null);
        

    })

})