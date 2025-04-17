import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets/frontend_assets/assets'
const ExploreMenu = ({catagory, setCatagory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>
        We offer a wide selection of mouth-watering dishes crafted to satisfy every craving. Whether you’re in the mood for something hearty or light, we’ve got you covered. Our meals are prepared daily to ensure top-notch quality and flavor. Enjoy a delightful dining experience every time you order.
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item, index)=>{
                return(
                  <div onClick={()=>{setCatagory(prev=>prev===item.menu_name?"All":item.menu_name)}} key = {index} className="explore-menu-list-item">
                    <img className={catagory===item.menu_name?'active':''} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                  </div>  
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu