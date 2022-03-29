import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NoteAppBar } from './NoteAppBar'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'
import { useRef } from 'react'

import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
        if(note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
        formValues.url = note.url;
    }, [note, reset])
    
    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues, dispatch])
    
    const handleDelete = () => {
        dispatch(startDeleting(note.id));
    }

    return (
        <div className='notes__main-content'>

            <NoteAppBar />

            <div className='notes__content'>

                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input' 
                    autoComplete='off'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    className='notes__textarea'
                    placeholder='What happened today'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                >

                </textarea>

                {
                    note.url &&
                    <div className='notes__image'>
                        <img
                            src={note.url}
                            alt='Imagen' 
                        />
                    </div>
                }

            </div>

            <button className='btn btn-danger' onClick={handleDelete}>
                Delete
            </button>

        </div>
    )
}
