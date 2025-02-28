import React from 'react'
import './FoodDisplay.css'
import {useContext} from 'react'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../context/StoreContext'
const FoodDisplay = ({catagory}) => {

    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-displa' id='food-display'>
        <h2>Top dishes near to you</h2>
        <div className="food-display-list">
            {food_list.map((item, index)=>{
              if(catagory==='All' || item.category===catagory) {
                {console.log(item.category)}
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              }
              // else{
              //       return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
              // }
                // return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                
            })}
        </div>
    </div>
  )
}

export default FoodDisplay