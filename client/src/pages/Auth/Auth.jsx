import React from 'react'
import  {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import icon from '../../assets/favicon.png'
import AboutAuth from "./AboutAuth";
import {signup, login} from "../../actions/auth";
import "./Auth.css";





const Auth = () => {

const [isSignup, setIsSignup]=useState(false);
const [name, setName]=useState('');
const [email, setEmail]=useState('');
const [password, setPassword]=useState('');
 
const dispatch=useDispatch();
const navigate=useNavigate();

  const handleSwitch=()=>{
        setIsSignup(!isSignup);
        setName("");
    setEmail("");
    setPassword("");
    }

  const handleSubmit=(e)=>{
    e.preventDefault();
if(!email && !password){
    alert('Enter email and password');
}
if(isSignup){
    if(!name){
        alert("Enter a name to continue");
    }
    dispatch(signup({name, email, password}, navigate));
}else{
    dispatch(login({email, password}, navigate));
}

  }
  let theme=useSelector((state)=>state.fetchWeather);
theme=theme?.data;

//   
  return (

    <section className={`${theme!=="dark"?'auth-section':'auth-section-dark'}`}>
        <div className='cont-1' >
<div>
    
        {isSignup && <AboutAuth/>}
</div>
        </div>
        <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className='' width={32} height={37}/>
        
<form onSubmit={handleSubmit}>
{
    isSignup && (
        <label htmlFor='name'>
            <h4>Display Name</h4>
            <input type="text" id="name" value={name} onChange={(e)=>{
             setName(e.target.value)   
            }}/>
        </label>
    )
}

    <label htmlFor="email" style={{display:"flex", flexDirection:"column",justifyContent:"flex-start"}}>
        <h4>Email</h4>
        <input type="email" name='email' id="email" value={email} onChange={(e)=>{
             setEmail(e.target.value)   
            }}/>
        </label>

        <label htmlFor="password">
<div style={{display:"flex", justifyContent:"space-between"}}>
    <h4>Password</h4>
   {!isSignup && <p style={{color:"#007ac6"}}>forgot password?</p>}
</div>

<input type="password" name='password' id="password" value={password} onChange={(e)=>{
             setPassword(e.target.value)   
            }}/>
{isSignup && <p style={{fontSize:"13px" ,color:"rgb(102, 103, 103)", margin:"13px 0px 13px 0px"}}>Password must contain at least eight characters including atleast 1 letter and 1 number</p>}
        </label>

{
    isSignup && (
        <label htmlFor="check"  >
<input type="checkbox" id="check" style={{backgroundColor:"yellow"}}/>
<div >


<p style={{fontSize:"67%",margin:"11px 0px 11px 0px"}}>
Opt-in to receive occasional 
<br />
 product updates, user research invitations,
 <br />
company announcements, and digests.
</p>
</div>
</label>
    )
}

       <button type="submit" className='auth-btn'>
        {isSignup?'Sign up':'Log in'}

       </button>

      {
        isSignup &&(
            <p style={{color:"#666767", fontSize:"13px"}}>

                By clicking "Sign up", you agree to our 

            <span style={{color:"#007ac6"}}> terms of <br /> services</span>,
            <span style={{color:"#007ac6"}}> privacy policy</span> and 
            <span style={{color:"#007ac6"}}> cookie policy</span>
            </p>
        )
      } 
       
        </form>        
        
        <p style={{margin:"13px 0px 13px 0px"}}>
            {isSignup?'Already have an account?':"Don't have an account?"}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
                {isSignup?"Log in":"sign up"}
            </button>
        </p>
        
        </div>
    </section>

  )
}

export default Auth;