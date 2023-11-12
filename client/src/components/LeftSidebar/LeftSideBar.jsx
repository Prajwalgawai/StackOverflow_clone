import React from 'react'
import './LeftSidebar.css';
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
// import Globe from '../../assets/Globe.svg'

const LeftSidebar = () => {

  const User2 = useSelector((state) => state.currentUserReducer);
const User=User2?.result?._id;


  return (

    <div className='left-sidebar'>
      <nav className='side-nav'>
<NavLink to='/' className='side-nav-links' activeClassName='active'>

<div>
<p>Home</p>
</div>

</NavLink>
<div className="side-nav-div">

    <div style={{paddingBottom:'10px'}}>
        <p>PUBLIC</p>
        </div>


        <div>


        <NavLink to={`/Questions/${User}`} className="side-nav-links" activeClassName='active' style={{paddingLeft:"12px"}}>
            <img src="https://stack-overflow-clone-1.netlify.app/static/media/Globe.b4c9a5d9.svg" alt="Globe" />
            
           
            <p style={{paddingLeft:"10px"}}>
                Questions
            </p>

        </NavLink>
        </div>
        <div>
        <NavLink to="/Tags" className="side-nav-links" activeClassName='active' style={{paddingLeft:"40px"}}>
            <p>Tags</p>
        </NavLink>
        </div>
        <div>
        <NavLink to="/Users" className="side-nav-links" activeClassName='active' style={{paddingLeft:"40px"}}>
            <p>Users</p>
        </NavLink>
        </div>
    </div>

      </nav>

    </div>
  )
}

export default LeftSidebar;
