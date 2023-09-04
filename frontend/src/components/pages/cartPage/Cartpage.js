import React, { useEffect, useState } from 'react'
import './Cartpage.css'

import {TbShoppingCartX} from 'react-icons/tb'
import {  useSelector } from 'react-redux';
import OrderComp from './CartComp';
import { Link } from 'react-router-dom';
import MetaData from '../../metaData';
export default function CartPage() {
let [totalPrice,setTotalPrice]=useState(0)
   let  {cart}= useSelector((d)=>d.CartReducer)

useEffect(()=>{
if(cart){

  setTotalPrice(cart.reduce((acc,e)=>acc+(e.price*e.quentity),0))
}
},[cart])
  return (
    <>
     <MetaData title={'Cart page'}/>
    {(cart.length <=0)? (
    <div className='emptyCartContainer'>
<div className='emptycartIcon'><TbShoppingCartX/></div>

<h5>No item in cart</h5>
<Link to='/products'><button>Find Products</button></Link>
    </div>) : 
  
    (<div className='Orderpage'>
        <header>
            <div className='h_Product'>Product</div>
            <div className='h_Quantity'>Quantity</div>
            <div className='h_SubPrice'>SubPrice</div>
        </header>
        
      {cart &&  <div className='Orderpage_main'>
            { cart.map((e,i)=>{

                return <OrderComp order={e} key={i}/>
            })}
        </div>}
   {cart && <div className='cartPage_footer'>
          <div className='cartPage_footer_price_sec'>
            <p>Gross Total</p>
            <p>Rs: {totalPrice}</p>
          </div>
          <Link to='/user/orders/address'>Check Out</Link>
          
        </div>
}


    </div>)
 } </>
  )
}
