import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
const WidgetTags = () => {
    const tags=["c", 'css', "express", "firebase", "html", "java", "javascript", "mern", "mongodb", "mysql", "next.js", "node.js", "php", "python", "reacjs"];
  
    let theme=useSelector((state)=>state.fetchWeather);
    // theme="light";
    theme=theme?.data
    return (
    <div className={`${theme!=="dark"?'widget-tags':'widget-tags-dark'}`}>
         <h3>Watched tags</h3>
          <div className={`${theme!=="dark"?'widget-tags-div':'widget-tags-div-dark'}`}>
    {
tags.map((tag)=>(
    <p key={tag}>{tag}</p>
))
}
    </div> 
    </div>
  )
}

export default WidgetTags