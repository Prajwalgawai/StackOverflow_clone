import React from 'react'
import '../../App.css';
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar/LeftSideBar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
const Home = () => {


  return (
    <div className='home-container-1'>
<LeftSidebar />
<div className="home-container-2">
<HomeMainbar/>
<RightSidebar/>
</div>
    </div>
  )
}

export default Home;