import React from 'react'
import '../../App.css';
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar/LeftSideBar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
const Home = () => {
  let theme=useSelector((state)=>state.fetchWeather);
  // theme="light";
  theme=theme?.data;


  return (
    <div className={`${theme!=="dark"?'home-container-1':'home-container-1-dark'}`}>
<LeftSidebar />

<div className={`${theme!=="dark"?'home-container-2':'home-container-2-dark'}`}>
<HomeMainbar/>
<RightSidebar/>
</div>
    </div>
  )
}

export default Home;