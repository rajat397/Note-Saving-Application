import React, { useEffect, useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const {setMessage}=props;

    const [notes, setNotes] = useState();
    const [authToken,setAuthToken] = useState();
    // useEffect(async ()=>{
    //     //setNotes(await getNotes());
    // },[])

    //get all notes
    const getNotes = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjljOTkwNTgxMjNkNDMyODA4ZTMzMCIsImlhdCI6MTcwNjY3OTg5M30.WuNsJ3ft2aBufAuItb_Vde7l5cg0bOFOr-9a4BRVJCs',
                'auth-token': `${authToken}`
            }
        }
        const response = await fetch(`${host}/api/notes/fetchallnotes`, requestOptions);
        //console.log("chii");
        const json = await response.json();
        //console.log("Json  = ",json);
        setNotes(json.notes);
    }
    //add a note
    const addNote = async (title, description, tag) => {
        setMessage("New note added succesfully");
        console.log("Note aaay re");
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${authToken}`
                },
                body: JSON.stringify({ title, description, tag })
            };
            const response = await fetch(`${host}/api/notes/addnote`, requestOptions)
            const json = await response.json();

            console.log("Adding a new note");
            const note = json.note;
            setNotes(notes.concat(note));
        } catch (e) {
            console.log(e);
        }
    }
    //delete a note
    const deleteNote = async (id) => {
        setMessage("Note deleted succesfully");
        console.log("Deleting node with id ", id);
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${authToken}`,
            }
        }
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, requestOptions);

        const newNotes = notes.filter((notes) => {
            return notes._id !== id
        })
        setNotes(newNotes);
    }
    //edit a note
    //id, title, description, tag



    const editNote = async (id, title, description, tag) => {
        setMessage("Note edited succesfully");
        //const id=note._id,title=note.title,description=note.description,tag=note.tag;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${authToken}`,
            },
            body: JSON.stringify({ title, description, tag })
        };
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, requestOptions)
        const json = await response.json();

    }

    return (
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes,setAuthToken }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;