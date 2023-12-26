import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import LeftSidebar from '../../components/LeftSidebar/LeftSideBar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionsDetails from './QuestionsDetails'
import '../../App.css'
const DisplayQuestion = () => {
  let theme = useSelector((state) => state.fetchWeather);
  // theme = "light";
  theme=theme?.data;
  return (
    <div className={`${theme!=="dark"?'home-container-1':'home-container-1-dark'}`}>
    
     
        <LeftSidebar/>
<div className="home-container-2">
<QuestionsDetails/>
<RightSidebar/>
</div>
    </div>
  )
}

export default DisplayQuestion
