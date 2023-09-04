import React from 'react'
import OrderStepper from './OrderStepper'

import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import MetaData from '../../metaData';

function OrderConfirmPage() {
    let itemsPrice,taxPrice;
    
   let {cart,shippingInfo} =useSelector((e)=>e.CartReducer);
   let {user}=useSelector((e)=>e.loadUserReducer)
   if (cart.length !==0) {
    
   
 itemsPrice=cart.reduce((sub,e)=>sub+(e.quentity*e.price),0);
 taxPrice=(itemsPrice/100)*5
// console.log(shippingInfo);
   }
   let shippingPrice=itemsPrice >5000? 0:1000;
   let totalPrice=itemsPrice+taxPrice+shippingPrice

   //save in localstorage
   let totalPriceSave=()=>{
    let orderInfoObj={itemsPrice,taxPrice,shippingPrice,totalPrice}
    window.localStorage.setItem('orderInfo',JSON.stringify(orderInfoObj))
   }
  return (
    <>
    <MetaData title='confirm Order'/>
    {shippingInfo.address ==='' && <Navigate to={'/user/orders/address'}/>}
    
    <div className='shipping_confirm_page'>
<OrderStepper currentStep={1}/>
{cart.length !==0 && <div className='shipping_confirm_container'>
    <div className='shipping_cartInfo'>
        <div>
            <h3>ShippingInfo</h3>
            <div className='shipping_cartInfo_box'>
                <p><b>Name: </b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phNO}</p>
                <p><b>Address:</b> {shippingInfo.address},{shippingInfo.city},{shippingInfo.state}</p>
            </div>
        </div>
        <div className=''>
            <h3>Your Cart items:</h3>
            <div className='shipping_cartInfo_items_container'>
                {
                cart && cart.map((e,index)=>{
return   <div key={index} className='shipping_cartInfo_item'>
<div style={{display:'flex'}}><img src={e.image} alt="" /><p>{e.name.length>50? `${e.name.slice(0,50)}...`:e.name}</p></div>
<div>{e.quentity}{'X'}{e.price}={e.price*e.quentity}</div>
</div>
                    })
                }
           
            </div>
        </div>
    </div>
    <div className='confirm_order_form'>
        <div className='confirm_order_form_box'>
        <h3>Order Summery</h3>
        <div >
            <div><p>Items Price:</p> <p>{itemsPrice}</p></div>
            <div><p>Shipping Price:</p> <p>{shippingPrice}</p></div>
            <div><p>tax Price:</p> <p>{taxPrice}</p></div>
            <div className='confirm_order_form_total_p'><b>Total Price:</b> <p>{totalPrice}</p></div>

        </div>
        <div className='paymentBtn'>

       <Link to='/user/orders/payment'><button onClick={totalPriceSave}>Proceed to Payment</button></Link> 
        </div>
    </div>
          
    </div>
</div>}
    </div>
    </>
  )
}

export default OrderConfirmPage