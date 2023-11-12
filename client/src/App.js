import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from "./routes";
import { fetchAllQuestions } from './actions/question';
import {fetchAllUsers} from './actions/users';

function App() {

  const dispatch=useDispatch();
useEffect(()=>{
dispatch(fetchAllQuestions())
dispatch(fetchAllUsers());
}, [dispatch]);


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