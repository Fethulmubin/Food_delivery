import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
// import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'


const Verify = () => {
    const navigate = useNavigate();
    const {url} = useContext(StoreContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId =  searchParams.get('orderId');

    const verifyPayment = async() =>{
        const response = await axios.post(`${url}api/order/verify`, {success, orderId})
        if(response.data.success){
            navigate('/myorders')
        }
        else{
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <Spinner/>
    </div>
  )
}

export default Verify