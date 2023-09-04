import React, { useEffect, useState } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCartAction } from '../../redux/actions/cartActions';
import { useAlert } from 'react-alert';
export default function OrderComp(props) {
    let dispatch=useDispatch()
    let [itemQuentity,setItemQuentity]=useState(props.order.quentity);
   let  {cart}= useSelector((d)=>d.CartReducer)
   let alert=useAlert();
    //use to increase the quentity
    
let increase=()=>{
if (props.order.stock>itemQuentity) {
    

    setItemQuentity(++itemQuentity);
    // console.log(itemQuentity-props.order.quentity);
    let orderQuantity=itemQuentity-props.order.quentity
    dispatch(addToCart(orderQuantity,props.order.productId))
} else{
    alert.error(`There are only ${itemQuentity} products in stock`)
} 
}
//use to decrease the quentity
let decrease=()=>{
    if (itemQuentity!==1) {
        
        setItemQuentity(--itemQuentity);
        let orderQuantity=props.order.quentity-itemQuentity;
        // console.log(orderQuantity);
        //why -orderQuantity
        //we are sending -ve value beause we eant to decrease it
        // in reducer has +ve  quentity and will received as -ve then susbstract them
        dispatch(addToCart(-orderQuantity,props.order.productId))
    }else{
        
        alert.error(`Quentity can't be less then 1`)
    }

}


useEffect(()=>{
   
    setItemQuentity(props.order.quentity)
},[dispatch,cart,props.order.quentity])
  return (
    <>
    
 { cart && <div className='order_box'>
                <div className='orderCart'>
<img src={props.order.image} alt="product" />
<div>
    <b>{props.order.name.length>50? `${props.order.name.slice(0,50)}...`:props.order.name}</b>
    
    <p>Price : {props.order.price}</p>
    <button className='removeProductBtn' onClick={()=>dispatch(removeToCartAction(props.order.productId))}>Remove</button>
</div>
                </div>
                <div className='orderQuantity'>
                
            <button onClick={decrease}>-</button>
            <input type="number"  value={itemQuentity}  readOnly/>
            <button onClick={increase}>+</button>
      

                </div>
                <div className='orderSubPrice'>
                  <p>Rs: {itemQuentity*props.order.price}</p>
                </div>
            </div>}
            </>
  )
}
