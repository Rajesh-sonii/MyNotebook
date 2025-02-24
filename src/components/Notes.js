import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const { notes, fetchAllNotes, editNote, alert, setAlert } = useContext(noteContext);
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: 'general' })
    const navigate = useNavigate();

    const ref = useRef(null);
    const refClose = useRef(null);

    const textChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        
        setAlert({ show: true, message: 'Note has been updated successfully', type:'primary' })
        setTimeout(() => {
            setAlert({show: false, message: '', type: ''})
        }, 1500);
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
        fetchAllNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [notes]);

    return (<>

        {/* for showing the edit alert  */}
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit this note
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal itle</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="titleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" name='etitle' id="einputTitle" aria-describedby="enterTitle" onChange={textChange} value={note.etitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputDescription" className="form-label">Description</label>
                                <input type="text" className="form-control" name='edescription' id="einputDescription" onChange={textChange} value={note.edescription} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputTag" className="form-label">Tag</label>
                                <input type="text" className="form-control" name='etag' id="einputTag" onChange={textChange} value={note.etag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick}>Save</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Here goes the rendering of the actual data  */}
        <div className='container'>
            <h2 className='my-3'>Your Notes</h2>

            <div className='row my-3'>
                {notes.map((note, index) => {
                    return <NoteItem note={note} updateNote={updateNote} alert={alert} setAlert={setAlert} key={note._id} />
                })}
            </div>

        </div>
    </>
    )
}

export default Notes
