import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import authContext from '../context/auth/authContext'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
const host = "http://localhost:5000";


const Login=(()=> {
  const navigate = useNavigate();
  const [email,setEmail] =useState();
  const [password,setPassword]=useState();
  const context=useContext(noteContext);
  const {setAuthToken}=context;
    //const {login,temp}=context;
    const login= async (email,password)=>{
      console.log("Email = ",email," Pass = ",password);
      const requestOptions = {
          method: 'POST',
          body: JSON.stringify({email,password}),
          headers:{
            "Accept": "*/*",
            // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
          }
      };
      const response = await fetch(`${host}/api/auth/login`, requestOptions)
      const json=await response.json();
      console.log("Json - ",json);
      console.log("Json.authtoken = ",json.authtoken);
      if(json.authtoken!==undefined){
      setAuthToken(json.authtoken);
      navigate('/')
      }
    }
    
  const handleClick=async (event)=>{
    event.preventDefault();
    console.log("Email = ",email);
    console.log("password = ",password);
    await login(email,password);
  }
  return (
    <div className='container my-3 border  rounded' style={{width:"25rem"}}>
        <h1 className='my-3 '> Login Page</h1>
      <form >
        <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(event)=>{setEmail(event.target.value)}}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}/>
        </div>
        <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Submit</button>
        </form>
        <div className='d-flex justify-content-center'>
        <p>Haven't Signed up yet? &nbsp;</p> <Link to="/signup"> Sign-Up</Link>
        </div>
    </div>
  )
}
)
export default Login;
