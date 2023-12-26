import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from "./routes";
import { fetchAllQuestions } from './actions/question';
import {fetchMyQuestions} from './actions/question';
import {fetchAllUsers} from './actions/users';
import fetchWeather from './actions/fetchWeather.js';

function App() {
  const dispatch=useDispatch();
useEffect(()=>{
dispatch(fetchAllQuestions())
dispatch(fetchAllUsers());
dispatch(fetchWeather());

}, [dispatch]);

let User = useSelector((state) => state.currentUserReducer);
User=User?.result?._id

useEffect(()=>{
  dispatch(fetchMyQuestions(User));
},[dispatch, User]);


let theme=useSelector((state)=>state.fetchWeather);
// theme="light";
theme=theme?.data

theme!=="dark"? document.querySelector("body").style.backgroundColor="" : document.querySelector("body").style.backgroundColor="hsl(210,3%,15%)"


const [ham, setHam]=("block");

return (
    <div className="App">
      <BrowserRouter>
<Navbar/>
<AllRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;


//BrowserRouter allows us to use things like link and wrapping it in parent component allow us to use it troughout our application , means browser router redirects the links to router so we can manage the routes properly.