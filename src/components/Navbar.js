import React  from 'react'
import { Link ,useLocation} from 'react-router-dom'



export default function Navbar() {
    let location=useLocation();
    // useEffect(()=>{
    //     console.log(location.pathname);
    // },[location.pathname]); // jab jab location change hogi tab tab andar wala part chlega
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} aria-current="page" to="/about">About</Link>
        </li>
        
      </ul>
      <Link
        to="/login"
        className="btn btn-primary mx-2">
        Login
      </Link>
      <Link
        to="/signup"
        className="btn btn-primary">
        Sign-Up
      </Link>
    </div>
  </div>
</nav>
  )
}
