import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
    })
   const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]:value}))
   }

   const placeOrder = async (e) =>{
    e.preventDefault();
    // userId :{type: String, required: true},
    // items:{type: Array, required: true},
    // amount:{type: Number, required: true},
    // address:{type: Object, required: true},
    // status:{type: String, default: "Food Processing"},
    // date:{type: Date, default: Date.now()},
    // payment:{type: Boolean, default: false}
    // for items it's array so we make it
    let orderItems = [];

    food_list.map((item) =>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    // console.log(orderItems);
    //we make ready to send data as all the required fields
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    let response = await axios.post(`${url}api/order/place`, orderData, {withCredentials: true});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert(response.data.message);
    }

   }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required name= 'firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name= 'lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name= 'email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <input required name= 'street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name= 'city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name= 'state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name= 'zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name= 'country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name= 'phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone  ' />
      </div>
      <div className='place-order-right'>
      <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                <div className='cart-total-details' >
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <p>Delivery Fee</p>
                        <p>
                            {getTotalCartAmount() > 0?'+$2':'$0'}
                        </p>
                    </div>
                    <hr />
                    <div className='cart-total-details'>
                        <b>Total</b>
                        <b>{getTotalCartAmount() > 0 ? getTotalCartAmount()+2: '$0'}</b>
                    </div>
                    <hr />
                </div>
                <button type='submit' >PROCEED TO CHECKOUT</button>
            </div>
      </div>
    </form >
  )
}

export default PlaceOrder