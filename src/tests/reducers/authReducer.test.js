const { authReducer } = require("../../reducers/authReducer")
const { types } = require("../../types/types")

describe('Pruebas en authReducer', () => {

    test('debe de realizar el login', () => {

        const state = {}
        const action = {
            type: types.login,
            payload: {
                uid: '123123123',
                displayName: 'Bryan'
            }
        }
        const newState = authReducer(state, action);

        expect(newState).toEqual({
            uid: '123123123',
            name: 'Bryan'
        })

    })

    test('debe de realizar el logout', () => {

        const state = {
            uid: '123123123',
            name: 'Bryan'
        }
        const action = {
            type: types.logout
        }
        const newState = authReducer(state, action);

        expect(newState).toEqual({});
    })

    test('debe de retornar el estado por defecto', () => {

        const state = {
            uid: '123123123',
            name: 'Bryan'
        }
        const action = {
            type: 'ga'
        }
        const newState = authReducer(state, action);

        expect(newState).toEqual(state);
    })

})