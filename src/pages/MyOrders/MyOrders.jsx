import React, {useEffect, useState} from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { set } from 'mongoose'


const MyOrders = () => {

    const [data, setData] = useState([]);
    const {token, url} = useContext(StoreContext);

    const fetchOrders = async () =>{
        const response = await axios.post(`${url}api/order/userorders`, {}, {withCredentials: true});
        if(response.data.success){
            setData(response.data.orders)
        }
    }
//fetching our orders
    useEffect(()=>{
        fetchOrders();
    },[])
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders