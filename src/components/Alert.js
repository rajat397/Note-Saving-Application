import React, { useEffect } from 'react'

export default function Alert(props) {
    // useEffect(()=>{
    //     props.visible(true);
    //     setTimeout(()=>{
    //         console.log("sssssss");
    //     },2000)
    //     props.visible(false);
    // },[props.message])
    return (
        <>
            <div className="alert alert-dark" role="alert">
                {props.message}
            </div>
        </>


    )
}







