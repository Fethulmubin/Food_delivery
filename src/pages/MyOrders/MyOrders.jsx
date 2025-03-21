import React, {useEffect, useState} from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useContext } from 'react'
import { assets } from '../../assets/assets/frontend_assets/assets'



const MyOrders = () => {

    const [data, setData] = useState([]);
    const {token, url} = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState({});

    //fetching our orders

    const fetchOrders = async () =>{
        setLoading(true);
        const response = await axios.post(`${url}api/order/userorders`, {}, {withCredentials: true});
        if(response.data.success){
            setData(response.data.orders)
            setLoading(false);
        }
    }
//fetching our orders
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data?.map((order, index) =>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items?.map((item, index) => {
                             if(index === order.items.length-1){
                                return item.name + " x " + item.quantity
                             }
                             else{
                                return item.name + " x " + item.quantity + " , "
                             }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>

                        {/* User clicks “Track Order” button for index 1
                        setChange(prev => ({ ...prev, [1]: true }));
                        This updates the change object to: { 1: true }
                        Only index 1 is loading. Other indexes are untouched.    */}
                        
                        {change[index] ? <div className="spinner"></div> :
                        <button onClick={() => {
                            setChange(prev => ({ ...prev, [index]: true }));
                            fetchOrders().finally(() => {
                                setChange(prev => ({ ...prev, [index]: false }));
                            });
                        }}>Track Order</button>}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders