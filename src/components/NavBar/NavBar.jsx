import React,{useState} from 'react'
import './NavBar.css' 
import { assets } from '../../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const NavBar = ({setShowLogin}) => {

    const[menu, setMenu] = useState('home')
    const {getTotalCartAmount, token, setToken, url } = useContext(StoreContext)

    // logout function
    const logout = async () =>{
            const response = await axios.get(`${url}api/user/logout`,{withCredentials:true})
            if(response.data.success){
            setToken("");
            }
            else{
                alert("error")
            }
    }
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="log" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>{setMenu('home')}} className={menu==='home'?'active':''}>Home</Link>
            <a href='#explore-menu' onClick={()=>{setMenu('menu')}} className={menu==='menu'?'active':''}>Menu</a>
            <a href='#app-download' onClick={()=>{setMenu('mobile-app')}} className={menu==='mobile-app'?'active':''}>Mobile-app</a>
            <a href='#footer' onClick={()=>{setMenu('contact')}} className={menu==='contact'?'active':''}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                {getTotalCartAmount() > 0?<div className="dot"></div>:<></>}
                {/* <div className="dot"></div> */}
            </div>
            {!token? <button onClick={()=>{setShowLogin(true)}}>sign in</button>
            :<div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-dropdown">
                    <li><img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                    </li>
                    <hr />
                    <li onClick={()=>logout()}><img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                    </li>
                </ul>
                </div>}
           
        </div>
    </div>
  )
}

export default NavBar