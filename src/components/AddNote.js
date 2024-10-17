import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext.js';

export default function AddNote() {
  const context = useContext(noteContext);
  const { notes, setNotes, addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = async (e) => {
    e.preventDefault(); // to prevent page reload
    addNote(note.title, note.description, note.tag);
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <h1> Add a Note </h1>

      <div className="mb-3">
        <form>
          <div className="mb-3">

            <div className="input-group">
              <span className="input-group-text">Title</span>
              <textarea className="form-control" aria-label="With textarea" name="title" onChange={onChange}></textarea>
            </div>
          </div>
          <div className="mb-3">
            {/* <label htmlfor="description" className="form-label">Description</label> */}
            <div className="input-group">
              <span className="input-group-text">Description</span>
              <textarea className="form-control" aria-label="With textarea" name="description" onChange={onChange}></textarea>
            </div>
          </div>

          <div className="mb-3">
            {/* <label htmlfor="description" className="form-label">Tag</label> */}
            <div className="input-group">
              <span className="input-group-text" >Tag</span>
              <textarea className="form-control" aria-label="With textarea" name="tag" onChange={onChange}></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}





