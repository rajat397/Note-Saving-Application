import React, { useContext, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const host = "http://localhost:5000";

export default function SignUp() {
  const navigate = useNavigate();
  const[name,setName]= useState();
  const[email,setEmail]=useState();
  const[password,setPassword] = useState();
  const context=useContext(noteContext);
  const {setAuthToken}=context;
  const signup=(async ()=>{
    const options={
      headers:{
        "Accept": "*/*",
        // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       },
       method:'POST',
       body:JSON.stringify({
        name,email,password
      })
    }
    const response= await fetch(`${host}/api/auth/createuser`,options);
    const json=await response.json();
    if(json.authtoken!==undefined){
      setAuthToken(json.authtoken);
      navigate('/')
    }
  });
  const handleClick=((event)=>{
    event.preventDefault();
    signup();
  })

  return (
    <div>
      <div className='container my-3 border  rounded' style={{width:"25rem"}}>
        <h1 className='my-3 '> SignUp Page</h1>
      <form>
      <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input type="text" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="Enter email"
            onChange={(event)=>{
              setName(event.target.value);
            }}
            />
            
        </div>
        <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="Enter email"
            onChange={(event)=>{
              setEmail(event.target.value);
            }}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" 
            className="form-control" 
            id="exampleInputPassword1" 
            placeholder="Password"
            onChange={(event)=>{
              setPassword(event.target.value);
            }}/>
        </div>
        <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Submit</button>
        </form>
        <div className='d-flex justify-content-center'>
        <p>Already Signed-Up? &nbsp;</p> <Link to="/login"> Login</Link>
        </div>
    </div>
    </div>
  )
}
