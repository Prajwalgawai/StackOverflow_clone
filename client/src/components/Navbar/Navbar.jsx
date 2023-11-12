import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode as decode } from "jwt-decode";

// import logo from '../../assets/logo.png';
import "./Navbar.css";
import Logo from "../../assets/logo.png";
import { setCurrentUser } from '../../actions/currentUser';
import search from '../../assets/search.svg'
import Avatar from "../../components/Avatar/Avatar";
import Button from '../../components/Button/Button';

const Navbar = () => {
const dispatch=useDispatch();
const Navigate=useNavigate();
var User= useSelector((state)=>(state.currentUserReducer));




const handleLogout=()=>{
  dispatch({type:'LOGOUT'});
Navigate('/');
dispatch(setCurrentUser(null));
}

useEffect(()=>{

const token=User?.token;
if(token){
  const decodeToken=decode(token);
  if(decodeToken.exp *1000 <new Date().getTime()){
    handleLogout();
  }
}
dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
}, [dispatch]);






    // let User=JSON.parse(localStorage.getItem('Profile'));
  return (
    <nav className='main-nav'>
      <div className="navbar">
<Link to='/' className='nav-item nav-logo'>
    <img src={Logo} alt="logo" width="150px" height="30px"/>
</Link>

<Link to='/' className='nav-item nav-btn'>
About
</Link>

<Link to='/' className='nav-item nav-btn'>
Products
</Link>

<Link to='/' className='nav-item nav-btn'>
For Teams
</Link>

<form action="" className='change'>
    <input type="text" placeholder='search...'/>
    <img style={{position:"absolute", left:"28px", top:"9.5px"}} src={search} alt="search" width={18}/>
</form>
<div style={{display:"flex"}}>


{User===null?<Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
<>

    <Avatar backgroundColor="#009dff" px="12px" py="7px" borderRadius="50%" color="white"><Link to={`/User/${User?.result?._id}`} style={{color:"white", textDecoration:"none"
}}>{User?.result?.name.charAt(0)}</Link>
</Avatar>
    <button className='nav-item nav-links' backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%" color="white"
  onClick={handleLogout} >Log out</button>
</>
}
</div>
      </div>
    </nav>
  )
}

export default Navbar