import React, { useEffect, useState } from "react";
import authContext from "./authContext";
import noteContext from "../notes/noteContext";
import { useContext } from "react";

const authState= (props)=>{
    const context=useContext(noteContext);
    const {setAuthToken}=context;
    const host = "http://localhost:5000";

    //login
    const login= async (email,password)=>{
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({email,password})
        };
        const response = await fetch(`${host}/api/auth/login`, requestOptions)
        const json=await response.json();
        console.log("Json - ",json);
        setAuthToken(json.authtoken);
    }
    const temp=()=>{

    }

    return (
        <authContext.Provider value={{login,temp}}>
            {props.children}
        </authContext.Provider>
    )     
}

export default authState;
