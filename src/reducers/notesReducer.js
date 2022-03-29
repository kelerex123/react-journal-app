/*
    {
        notes: [],
        active: null,
        active: {
            id: 'gaa',
            title: 'asad',
            body: 'adssad',
            imageUrl: 'dsd',
            date: 12321
        }
    }
*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export  const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            };

        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            };
        
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            };

        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map( note => note.id === action.payload.id ? action.payload : note )
            }

        case types.notesDelete:
            return {
                ...state,
                notes: state.notes.filter( note => note.id !== action.payload),
                active: null
            };

        case types.notesLogoutCleaning:
            return {
                notes: [],
                active: null
            };

        default:
            return state;
    }

}
