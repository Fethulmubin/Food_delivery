import React from 'react'
import './Spinner.css'
import burgerSpinner from '../../assets/assets/frontend_assets/burger_spin.png'
import { useEffect, useState } from 'react'


const Spinner = () => {
    const [message, setMessage] = useState("Fetching your bestis...");

    useEffect(() => {
      const timer = setTimeout(() => {
        setMessage("Almost there...");
      }, 2000); // 4 seconds
  
      return () => clearTimeout(timer);
    }, []);
    return (
        <div className="spinner-container">
            <img src={burgerSpinner} alt="Loading..." className="burger-spinner" />
            <p>{message}</p>

        </div>
    )
}

export default Spinner