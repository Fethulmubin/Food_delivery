import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { food_list } from '../assets/assets/frontend_assets/assets'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = 'http://localhost:9000/'
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [food_list , setFoodList ] = useState([])
    const addToCart = async (itemId)=>{
        //example how the code below works
// const itemId = "apple";
// const prev = { banana: 2 };
// const newState = { ...prev, [itemId]: 1 };
// console.log(newState); // Output: { banana: 2, apple: 1 }

    if(!cartItems[itemId]){
            setCartItems(prev=>({...prev, [itemId]:1}))
    }
    else{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
        const response = await axios.post(`${url}api/cart/add`, {itemId},{withCredentials:true})
        console.log(response)
    }
}

    const removeFromCart = async (itemId)=>{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    
    if(token){
        await axios.post(`${url}api/cart/remove`, {itemId},{withCredentials:true})
    }
}

    const getTotalCartAmount = ()=>{

        let totalAmount = 0;
        for (const item in cartItems){
            if(cartItems[item]  > 0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount = itemInfo.price*cartItems[item] + totalAmount; 
            }
                
       
        }
        return totalAmount;
    }
    const Validate = async () =>{
        try{
        const response = await axios.get(`${url}api/user/validate`,{withCredentials:true})
        if(response.data.success){
        setToken(response.data.token);
        }
    }
    catch(err){
        console.log(err)
    }
}
//fetching food list for admin and front end
const fetchFoodList = async() =>{
    const response =  await axios.get(`${url}api/food/list`);
    if(response.data.success){
        setFoodList(response.data.foods);
    }
}
//losding cart data from users adding

const loadCartData = async () =>{
    const response = await axios.post(`${url}api/cart/get`,{}, {withCredentials:true})
    console.log(response);
    if(response.data.success){
    setCartItems(response.data.cartData);
    }
}

useEffect(()=>{
    fetchFoodList();
    Validate();
    loadCartData();
},[])

    const contexValue = {
        url,
        food_list,
        cartItems,
        token,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        setToken
         
    }
    return (
        <StoreContext.Provider value={contexValue}>
            {props.children}
        </StoreContext.Provider>
    )
    

}
export default StoreContextProvider;
