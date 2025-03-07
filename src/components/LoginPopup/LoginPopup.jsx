import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const LoginPopup = ({setShowLogin}) => {
  // our backend url and token
   const {url, token, setToken} = useContext(StoreContext);
   const [currState, setCurrState] = useState('Sign Up')
   //for emails and password
   const [data, setData] = useState({
    name:"",
    email:"",
    password:""
   })
//
const onChangeHandler = (e) =>{
  setData(data => ({...data, [e.target.name]: e.target.value}));
}

// login function
const onLogin = async (e)=>{
  e.preventDefault();
  let newUrl = url;
  currState === 'Login'?
   newUrl += 'api/user/login':
   newUrl += 'api/user/register'

   const response = await axios.post(newUrl, data , {withCredentials: true});
   if(response.data.success){
    setToken(response.data.token);
    setShowLogin(false);
   }
   else{
      alert(response.data.message)
   }
}

  return (
    <div className='login-popup'> 
      <form onSubmit={onLogin} className='login-popup-container' >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">

          {currState === 'Login'?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'>{currState==='Sign Up'? 'Create account' : 'login'}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login'?
        <p>Create a new account?  <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>}
       
       
      </form>
    </div>
  )
}

export default LoginPopup