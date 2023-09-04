import React, { useEffect, useState } from 'react'
import MetaData from '../../metaData'
import Sidebar from '../AdminSideBar/sidebar'
import {  useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { orderDetailAction, orderUpdateAction } from '../../redux/actions/orderAction'
import './adminDetailOrder.css'
import { AiOutlinePartition } from 'react-icons/ai'
import { useAlert } from 'react-alert'
import { AdminDelClearSms_error } from '../../redux/actions/productAction'
export default function AdminUpdateOrder() {
  let mypath=useParams()
  let dispatch=useDispatch()
 let alert=useAlert()
 let {order}= useSelector((e)=>e.getOrderDetailReducer)
 let {sms,error}= useSelector((e)=>e.AdminUpdateOrderReducer)
 let [statusOfOrder,setOrderStatus]=useState(order?.orderStatus)


 let SubmitHandler=(e)=>{
e.preventDefault();
let {orderStatus}=Object.fromEntries(new FormData(e.target))

dispatch(orderUpdateAction(orderStatus,mypath.id))

 }
 useEffect(()=>{
  setOrderStatus(order.orderStatus)
 },[order])
  useEffect(()=>{
    if (error) {
      alert.error(error)
      
    }
    if (sms) {
      alert.success(sms);

      
    }
  
    dispatch(AdminDelClearSms_error())
  dispatch(orderDetailAction(mypath.id))
  },[dispatch,sms,error,alert,mypath.id])


  return (
    <>
    <MetaData title='Update Order'/>
   <div className='orderUpdatePg'>
    <div className='borderRight'>
    <Sidebar active='orders'/>
    </div>
   
  {order?.user && <div className='orderUpdateMain'>
<div className='adminOrderDetail '>
<div className='shipping_cartInfo borderRight pTop-50'>
        <div>
            <h3>ShippingInfo</h3>
            <div className='shipping_cartInfo_box '>
                <p><b>Name: </b> {order.user.name}</p>
                <p><b>Phone:</b> {order.shipingInfo.phNO}</p>
                <p><b>Address:</b> {order.shipingInfo.address},{order.shipingInfo.city},{order.shipingInfo.state}</p>
            </div>
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
        <div className=''>
            <h3>Your Cart items:</h3>
            <div className='shipping_cartInfo_items_container'>
                {
               order.orderItems.map((e,index)=>{
return   <div key={index} className='shipping_cartInfo_item'>
<div style={{display:'flex'}}><img src={e.image} alt="" /><p>{e.name}</p></div>
<div>{e.quentity}{'X'}{e.price}={e.price*e.quentity}</div>
</div>
                    })
                }
           
            </div>
        </div>
    </div>
</div>
   
<div className='adminOrderUpdate pTop-50'>
<form action=""  onSubmit={SubmitHandler}>
                <p>Process Order</p>
                <div>
                <AiOutlinePartition/>
                <select name="orderStatus" disabled={(order.orderStatus==='Delivered')? true:false} value={statusOfOrder} onChange={(e)=>setOrderStatus(e.target.value)} id="" required>
                    
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    
                </select>
                </div>
               
             
                <div style={{border:'none'}}>
              <button className={`ad_create_btn ${order.orderStatus==='Delivered'? 'disabledBtn':''}`} disabled={(order.orderStatus==='Delivered')? true:false}>Process</button>
                </div>
            </form>
    
</div>
</div>}
    </div>

   
    </>
  )
}
