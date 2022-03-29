import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";
import configureStore from 'redux-mock-store'; 
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {

    beforeEach( () => {
      store = mockStore(initState);
    })
    
    test('Login y Logout deben crear la accion respectiva', () => {

        const loginAction = login('testing', 'Bryan');
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid: 'testing',
                displayName: 'Bryan'
            }
        })

        expect(logoutAction).toEqual({
            type: types.logout 
        })

    })

    test('Realizar el logout', async() => {
        
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        })

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })

    })

    test('Debe de iniciar el startLoginEmailPassword', async() => {

        await store.dispatch(startLoginEmailPassword('test@testing.com','123456'));
        
        const actions = store.getActions();

        expect(actions[2]).toEqual({
            type: types.login,
            payload: { 
                uid: 'S24c7TIY27Zp1ttVOVxIS3NKZBs1', 
                displayName: null
            }
        })

    })

})