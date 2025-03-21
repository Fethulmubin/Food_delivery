import React, {useState} from 'react'
import './FoodItem.css'
import {useContext} from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'
const FoodItem = ({id,name,price,description,image,catagory}) => {
const{cartItems, addToCart,removeFromCart, url} = useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={`${url}images/${image}`} alt="" className="food-item-image" />
                {
                    !cartItems[id] ? <img src={assets.add_icon_white} alt="add" className="add" onClick={()=>{addToCart(id)}}/> :
                    <div className="food-item-counter">
                        <img src={assets.remove_icon_red} alt="minus" onClick={()=>{removeFromCart(id)}} />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} alt="" onClick={()=>{addToCart(id)}} />
                        </div>
    
                }
        </div>
        <div className="food-item-info">
            <div className="food-item name rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">
                {description}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
    </div>
  )
}

export default FoodItem