import React, {useContext} from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
// import Alert from './Alert';

const Navbar = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();

  const { setAlert } = context;
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    setAlert({show: true, message:'Logged-out Successfully', type: 'success'});
    setTimeout(() => {
      setAlert({show:false,message:'',type:''});
    },1500);
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">Navbar</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to='/about'>About</NavLink>
              </li>
              {/* <li className="nav-item">
          <NavLink className="nav-link" to="#">Link</NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="#">Action</NavLink></li>
            <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li>
            <li><hr className="dropdown-divider"/></li>
            <li><NavLink className="dropdown-item" to="#">Something else here</NavLink></li>
          </ul>
        </li> */}

            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
              <NavLink className="btn btn-primary mx-1" to='/login'>Login</NavLink>
              <NavLink className="btn btn-primary mx-1" to='/signup'>Signup</NavLink>
            </form>:<button className='btn btn-primary' onClick={logout}>Logout</button>}
          </div>
        </div>
      </nav>

      {/* {alert && setTimeout(() => {
        <div class="alert alert-primary" role="alert">
          {props.alert}
        </div>
      }, 1500) */}
      {/* } */}
      {/* <Alert /> */}
    </>
  )
}

export default Navbar
