import React from 'react'
import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Questions from './pages/Questions/Questions';
import AskQuestions from './pages/AskQuestions/AskQuestion';
import DisplayQuestion from './pages/Questions/DisplayQuestion';
import Tags from './pages/Tags/Tags';
import Users from './pages/Users/Users';
import UserProfile from './pages/UserProfile/UserProfile';
import ProtectRoute from './pages/Auth/protectedRoute';

const AllRoutes = () => { 
 
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/Auth" element={<ProtectRoute><Auth/></ProtectRoute>} />
        <Route exact path='/Auth' element={<Questions/>}/>
        <Route exact path='/AskQuestions' element={<AskQuestions/>}/>
        <Route exact path='/Questions/:id/:user_id' element={<DisplayQuestion/>}/>
      <Route path='/Tags' element={<Tags/>} />
      <Route path='/Users' element={<Users/>} />
      <Route path='/Users/:id' element={<UserProfile/>} />

      </Routes>
    </div>
  )  
}
export default AllRoutes