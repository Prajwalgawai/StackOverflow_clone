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

let theme=useSelector((state)=>state.fetchWeather);
theme="light";



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
    <nav  className={`${theme!=="dark"?'main-nav':'main-nav-dark'}`}>
      <div className="navbar">
<Link to='/' className={`${theme!=="dark"?'nav-item nav-logo':'nav-item-dark nav-logo-dark'}`} >
    <img src={Logo} alt="logo" width="150px" height="30px"/>
</Link>

<Link to='/'  className={`${theme!=="dark"?'nav-item nav-btn':'nav-item-dark nav-btn-dark'}`}>
About
</Link>

<Link to='/' className={`${theme!=="dark"?'nav-item nav-btn':'nav-item-dark nav-btn-dark'}`}>
Products
</Link>

<Link to='/' className={`${theme!=="dark"?'nav-item nav-btn':'nav-item-dark nav-btn-dark'}`}>
For Teams
</Link>

<form action="" className='change'>
    <input className={`${theme!=="dark"?'search-input':'search-input-dark'}`} type="text" placeholder='search...'/>
    <img style={{position:"absolute", left:"28px", top:"9.5px"}} src={search} alt="search" width={18} className={theme==='dark'?'invert_search_icon':''}/>
</form>
<div style={{display:"flex"}}>


{User===null?<Link to='/Auth' className={`${theme!=="dark"?'nav-item nav-links':'nav-item-dark nav-links-dark'}`}>Log in</Link>:
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

export default Navbar;