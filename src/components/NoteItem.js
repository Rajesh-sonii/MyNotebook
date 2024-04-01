import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, } = context;
    const { note, updateNote, setAlert } = props;

    const deleteTheNote = (id) => {

        deleteNote(id);

        setAlert({ show: true, message: 'Note has been deleted successfully', type: 'success' })
        setTimeout(() => {
            setAlert({show: false, message: '', type: ''})
        }, 1500);
    }

    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"><strong>{note.title}</strong></h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text"><i>{note.tag}</i></p>
                </div>
                <div className='d-flex justify-content-end'>
                    <i className="fa-regular fa-pen-to-square m-1" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-regular fa-trash-can m-1" onClick={() => { deleteTheNote(note._id) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
