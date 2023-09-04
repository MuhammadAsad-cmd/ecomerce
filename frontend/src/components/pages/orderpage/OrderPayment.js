import React, { useEffect, useRef, useState } from 'react'
import './orderPayment.css'

import {CardNumberElement,useStripe, useElements} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../metaData'
import axios from 'axios'
import OrderStepper from './OrderStepper'

import CardElement from './paymeny.cardElement'
import { useAlert } from 'react-alert'
import { newOrderAction } from '../../redux/actions/orderAction'
import { Navigate, useNavigate } from 'react-router-dom'
import Loader from '../../layout/loader/loader'
import { AdminDelClearSms_error } from '../../redux/actions/productAction'
import { clearCart } from '../../redux/actions/cartActions'
export default function OrderPayment() {
  let alert=useAlert()
 let dispatch= useDispatch()
 let navigate=useNavigate()
let paymentBtn=useRef()
  let stripe=useStripe();
  let elements=useElements()
  let {user}=useSelector((e)=>e.loadUserReducer)
  let {error,sms}=useSelector((e)=>e.createOrderReducer)
  let {shippingInfo} =useSelector((e)=>e.CartReducer);
  let [myLoading,setMyLoading]=useState(false);
let orderInfo=JSON.parse(window.localStorage.getItem('orderInfo'));
let orderItems=JSON.parse(window.localStorage.getItem('cartItems'));

  let submitHandler=async (e)=>{
e.preventDefault();   
paymentBtn.current.disabled=true;
// making loading true
setMyLoading(true)

let myOrder={
shipingInfo:shippingInfo,
orderItems,
itemsPrice:orderInfo.itemsPrice,
taxPrice:orderInfo.taxPrice,
shipingPrice: orderInfo.shippingPrice,
totalPrice:orderInfo.totalPrice,
paidAt:Date.now()
}
  
let paymentData={
  amount:orderInfo.totalPrice
}
let headerInfo={
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
}
try{
let {data} =await axios.post('http://localhost:1300/api/v1/payment',paymentData,headerInfo);

if (!stripe || !elements) return;
const result = await stripe.confirmCardPayment(data.client_secret, {
  payment_method: {
    card: elements.getElement(CardNumberElement),
    billing_details: {
      name: user.name,
      email: user.email,
      address: {
        line1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.pinCode,
        country: shippingInfo.country,
      },
    },
  },
});
// console.log(result);
if (result.error) {
  paymentBtn.current.disabled=false;
alert.error(result.error.message)
  
}
if (result.paymentIntent.status==='succeeded') {

  myOrder.paymentInfo={
    id: result.paymentIntent.id ,
    status:result.paymentIntent.status 
}

dispatch(newOrderAction(myOrder))
}

}catch(err){
  alert.error(err.response?.data.sms || err.message);
  setMyLoading(false)
  paymentBtn.current.disabled=false;
}


  }
  useEffect(()=>{
   if (error) {
    setMyLoading(false)
    alert.error(error)
   }
   if (sms) {
    setMyLoading(false)
    // alert.success(sms);
    dispatch(clearCart())
    dispatch(AdminDelClearSms_error())

    navigate('/user/order/success')
    // window.location.href='/user/order/success'
    
   }
  },[dispatch,error,sms,alert,navigate])
  return (
    <>
{myLoading && <Loader/>}
 <MetaData title='payment'/>
  <OrderStepper currentStep={2}/>

   {orderInfo===null? <Navigate to={'/user/orders/confirm'}/>:<div className="paymentContainer">
    <form className="paymentForm"  onSubmit={submitHandler}>
    <CardElement/>
    <div>
          <button type='submit' ref={paymentBtn} disabled={!stripe} style={{opacity: !stripe ? 0.3:1}} className='paymentFormBtn'>Pay - RS: {orderInfo.totalPrice}</button>
          </div>
    </form>
      </div>}
    </>
  )
  }

























