import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { orderDetailAction } from '../../redux/actions/orderAction';
import { useAlert } from "react-alert";
import './orderDetailPage.css'

import Loader from '../../layout/loader/loader';
import MetaData from '../../metaData';

function OrderDetailPage() {
  let alert=useAlert()
 let parm=useParams()
 let dispatch=useDispatch()
 let {order,error,loading}=useSelector((e)=>e.getOrderDetailReducer)
 let {user}=useSelector((e)=>e.loadUserReducer)
 useEffect(()=>{
  if (error) {
    alert.error(error)
  }
  dispatch(orderDetailAction(parm.id));

  
 },[dispatch,error,alert,parm.id])

  return (
    <>
    <MetaData title={'Order Detail'}/>
   {loading? <Loader/>: <div className="order_detail_page">
      <div className='id_sec'>
        <h3>Order #{order._id}</h3>
      </div>
      <div className='order_shipping_box'>
        <h3>Shipping info</h3>
        <div><b>Name:</b>{user.name}</div>
        <div><b>Phone:</b>{order.shipingInfo.phNO}</div>
        <div><b>Address:</b>{order.shipingInfo.address}</div>
      </div>
      <div className='order_payment_box'>
      <h3>Payment</h3>
         <div><b>Status:</b><span style={{color:(order.paymentInfo.status==='succeeded')? "green":'red'}}>{order.paymentInfo.status}</span></div>
          <div><b>Amount:</b>{order.totalPrice}</div>
      </div>
      <div className='order_status_box'>
      <h3>Order status</h3>
      <div><b>Status:</b><span style={{color:(order.orderStatus==='Delivered')? "green":'red'}}>{order.orderStatus}</span></div>
      </div>
      <div className='order_detail_items'>
        <div>

        
      <h3>Order Items:</h3>
      {
                 order.orderItems.map((e,index)=>{
return   <div key={index} className='shipping_cartInfo_item'>
<div style={{display:'flex'}}><img src={e.image} alt="orderimg" /><p>{e.name.length>50? `${e.name.slice(0,50)}...`:e.name}</p></div>
<div>{e.quentity}{'X'}{e.price}={e.price*e.quentity}</div>
</div>
                    })
                }
      </div>
      </div>
    </div>
}
    </>
  )
}

export default OrderDetailPage