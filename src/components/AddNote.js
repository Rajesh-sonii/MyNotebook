import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote, setAlert } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const addTheNote = (e) => {
        e.preventDefault();

        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' })

        setAlert({ show: true, message: 'Note has been added successfully', type:'primary' });
        setTimeout(() => {
            setAlert({show: false, message: '', type: ''})
        }, 1500);
        
    }

    const textChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // function noteEditor(){
    //     document.querySelector('#inputTitle').value = props.note.title;
    //     document.querySelector('#inputDescription').value = props.note.description;
    //     document.querySelector('#inputTag').value = props.note.tag;
    // }
    // if (typeof props.note.title !== "undefined") {
    //     noteEditor();
    // }
    return (
        <div className='container'>
            <h2 className='my-3'>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' id="inputTitle" aria-describedby="enterTitle" value={note.title} onChange={textChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" name='description' id="inputDescription" value={note.description} onChange={textChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputTag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name='tag' id="inputTag" value={note.tag} onChange={textChange} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={note.title.length < 5 || note.description.length < 5} onClick={addTheNote}>Save</button>
            </form>
        </div>
    )
}

export default AddNote
