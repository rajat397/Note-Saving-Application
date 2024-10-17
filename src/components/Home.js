import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';
import AddNote from './AddNote';

export default function Home(props) {
   // console.log("this is the log");
    //props.setMessage('this is msg');
    //console.log("props = ",props);
    return (
        <div className='container my-3'>
            
            <Notes setMessage={props.setMessage}/>
        </div>
    )
}



