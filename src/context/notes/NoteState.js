import React, { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const token = localStorage.getItem('token');

  // state for storing the data fetched from the api
  const [notes, setNotes] = useState([]);

  // state for showing the alert 
  const [alert, setAlert] = useState({ show: false, message: '', type:'' });

  // function for fetching all of the notes from api for the user logged in
  const fetchAllNotes = async () => {
    const fetchedData = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': token,
      },
    })
    const data = await fetchedData.json()
    setNotes(data)
    // console.log(data)
    // return;
  }

  // Adding a new note / on server side
  const addNote = async (title, description, tag) => {
    const fetchedData = await fetch(`${host}/api/notes/savenote`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await fetchedData.json()
    // console.log(note.title)
    // adding a new note on the client side
    setNotes(notes.concat(note));
    // return;

    // Adding a note on the client side 
    // const newNote = {
    //   "_id": "65cbcad75e3b701668d73654",
    //   "user": "65c288eb47d3e16b286d0f64",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2024-02-13T20:02:31.362Z",
    //   "__v": 0
    // };

  }

  // Deleting a note
  // Logic for deleting the node in the database
  const deleteNote = async (id) => {

    const fetchedData = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'auth-token': token,
      },
    })
    const data = await fetchedData.json()
    console.log(data)

    // logic for deleting the note on the client side
    // console.log("Deleting the note with id: " + id)
    let tempNotes = [];
    for (let i = 0; i < notes.length; i++) {
      if (id === notes[i]._id) {
        continue;
      }
      tempNotes.push(notes[i]);
    }
    setNotes(tempNotes);
    // return;
  }

  // Editing a note ->> server side
  const editNote = async (id, title, description, tag) => {

    const fetchedData = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ title, description, tag })
    })
    const data = await fetchedData.json()
    console.log(data)

    // editing a note ->> client side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const elem = newNotes[i];
      if (id === elem._id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
    // console.log(newNotes)
    // return;
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes, alert, setAlert }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
