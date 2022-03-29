import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

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
store.dispatch = jest.fn();

describe('Pruebas en  <LoginScreen/>', () => {

    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('debe de mostrase bien', () => {

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/login']}>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de disparar la accion de startGoogleLogin', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/login']}>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        );
        
        wrapper.find('.google-btn').simulate('click');

        expect(mockDispatch).toHaveBeenCalled();
        expect(startGoogleLogin).toHaveBeenCalled();

    })
    
    test('debe cargar el startLoginEmailPassword con los argumentos', () => {

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/login']}>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        );
        
        wrapper.find('form').simulate('submit', {preventDefault: () => {}});
        expect(startLoginEmailPassword).toHaveBeenCalledWith('bryan@gmail.com','123456');

    })

})