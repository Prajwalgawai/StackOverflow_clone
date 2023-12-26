import React from 'react'
import {useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {countUpvotedQuestions} from '../../actions/question';
import {getUser} from '../../actions/users';
import './Users.css';

const User = ({user}) => {
  let theme=useSelector((state)=>state.fetchWeather);
  // theme="light";
  theme=theme?.data
console.log("theme is "+JSON.stringify(theme?.data));
const dispatch=useDispatch();
  const handleclick=(id)=>{
    // alert("user clicked");
    dispatch(countUpvotedQuestions(id));
    dispatch(getUser(id));
  }
  return (
  <Link to={`/Users/${user._id}`} className={`${theme!=="dark"?'user-profile-link':'user-profile-link-dark'}`}
  onClick={()=>{handleclick(user?._id)}}>
  <h3>{user.name.charAt(0).toUpperCase()}</h3>
  <h5>{user.name}</h5>
  </Link>
  )
}
export default User