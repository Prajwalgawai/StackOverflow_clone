import React from "react";
import {useSelector } from 'react-redux';
import "./Tags.css";


const TagsList = ({ tag }) => {

  let theme=useSelector((state)=>state.fetchWeather);
  // theme="light";
  theme=theme?.data

  return (
    <div className={`${theme!=="dark"?'tag':'tag-dark'}`}>
      <h5>{tag.tagName}</h5>
      <p>{tag.tagDesc}</p>
    </div>
  );
};

export default TagsList;