import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect, useState } from 'react';

function App() {
  const[message,setMessage]=useState();
  const[visible,setVisible]=useState(true);
  useEffect(()=>{
    console.log("new message= ",message);
  },[message])
  return (
    <NoteState setMessage={setMessage}>
    <div className="App">
      <Router>
        <Navbar/>
        {visible && <Alert message={message} visible={setVisible}/>}
        <div className='contianer'>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route exact path="/about" element={<About setMessage={setMessage}/>}/>
          <Route exact path="/" element={<Home setMessage={setMessage}/>}/>
          <Route exact path="/login" element={<Login setMessage={setMessage}/>}/>
          <Route exact path="/signup" element={<SignUp setMessage={setMessage}/>}/>
        </Routes>
        </div>
    </Router>
    </div>
    </NoteState>
  );
}

export default App;
