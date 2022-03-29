import { types } from "../../types/types"

describe('Prueba con types', () => {

    test('debe tener estos types', () => {

        const typeTest = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
            notesAddNew: '[Notes] New Notes',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load Notes',
            notesUpdate: '[Notes] Updated note',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning'
        }

        expect(types).toEqual(typeTest);
        
    })

})