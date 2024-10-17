import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, editNote, addNotes, getNotes,setNotes } = context;
    useEffect(() => {
        const initialize = () => {
            getNotes();
        }
        initialize();
    }, []);
    const updateNote = async (note) => {
        console.log("Button daba")
        setNote(note);
        console.log(note);
        ref.current.click();
    }
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = async (e) => {
        e.preventDefault(); // to prevent page reload
        console.log(note);
        await editNote(note._id,note.title, note.description, note.tag);
        const newNotes=[...notes]
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === note._id) {
                element.title = note.title;
                element.description = note.description;
                element.tag = note.tag;
               // setNote({title:note.title,tag:note.tag,description:note.description});
            }
        }
        setNotes(newNotes);
        console.log("Kuch toh hua ");
        ref.current.click();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const ref = useRef(null);
    return (
        <>
            <AddNote />

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden="true" ref={ref}>

            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-content">
                    <div className='mx-3 my-3'>
                        <form>
                            <div className="mb-3">
                                <h2 >Modify note</h2>
                                <div className="input-group">
                                    <span className="input-group-text">Title</span>
                                    <textarea className="form-control" aria-label="With textarea" name="title" onChange={onChange} value={note.title}></textarea>
                                </div>
                            </div>
                            <div className="mb-3">
                                {/* <label htmlfor="description" className="form-label">Description</label> */}
                                <div className="input-group">
                                    <span className="input-group-text">Description</span>
                                    <textarea className="form-control" aria-label="With textarea" name="description" onChange={onChange} value={note.description}></textarea>
                                </div>
                            </div>

                            <div className="mb-3">
                                {/* <label htmlfor="description" className="form-label">Tag</label> */}
                                <div className="input-group">
                                    <span className="input-group-text" >Tag</span>
                                    <textarea className="form-control" aria-label="With textarea" name="tag" onChange={onChange} value={note.tag}></textarea>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='my-3 row'>
                <h1>Your Notes</h1>
                {notes?.map((note) => {
                    console.log("Note ki id ", note._id);
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}
