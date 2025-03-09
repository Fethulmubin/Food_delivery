import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { food_list } from '../assets/assets/frontend_assets/assets'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = 'http://localhost:9000/'
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    // console.log(cartItems)
    const addToCart = (itemId)=>{
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
}
    const removeFromCart = (itemId)=>{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    // useEffect(()=>{
    //     for (const item in cartItems){
    //         console.log(item)
    //     }
    // },[cartItems])

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
        else{
            alert("error")
        }
    }
    catch(err){
        console.log(err)
    }
}

useEffect(()=>{
    Validate();
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
