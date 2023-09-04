import React, { useState } from 'react'
import { AiOutlineHome, } from 'react-icons/ai'
import { FaCity, FaGlobe} from 'react-icons/fa'
import {Country,State} from 'country-state-city'
import {BiLocationPlus,BiPhoneCall } from 'react-icons/bi'
import './Orderpage.css'
import OrderStepper from './OrderStepper'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfoAction } from '../../redux/actions/cartActions'
import { useAlert } from 'react-alert'
import { Navigate, useNavigate } from 'react-router-dom'
import MetaData from '../../metaData'

function ShippingDetail() {
    let alert=useAlert()
    let navigate=useNavigate()
   let {shippingInfo,cart} =useSelector((e)=>e.CartReducer);
let dispatch=useDispatch()
   let [country,setCountry] =useState(shippingInfo.country)
   let [address,setAddress] =useState(shippingInfo.address)
   let [pinCode,setPinCode] =useState(shippingInfo.pinCode)
   let [city,setCity] =useState(shippingInfo.city)
   let [phNO,setPhNo] =useState(shippingInfo.phNO)
   let [state,setSate] =useState(shippingInfo.state)

    let setStateFn=(e)=>{
        setCountry(e.target.value);
        setSate('')
    }

    //submit form
    let shippingFormSubmit=(e)=>{
        e.preventDefault();
       
        if (phNO.length !==10) {
            return alert.error('phone number is invalid')
        }
        if (!country || !address || !pinCode || !city || !phNO ) {
            return alert.error('fill the form first')
        }
       if (State.getStatesOfCountry(country).length !==0) {
        if (state==='') {
            return alert.error('please select state')   
        } }else{
            setSate('null')
        }
        dispatch(saveShippingInfoAction({address,country,pinCode,city,phNO,state}));
       
      navigate('/user/orders/confirm');
    }


  

  return (
    <>
    <MetaData title='Address'/>
    {cart.length ===0 && <Navigate to={'/user/cart'}/>}
    <div className='shipping_detail_form_container'>
        <div style={{width:'90%'}}>
            
            <OrderStepper currentStep={0}/>
            </div>
        <div>
            <form action="" className='shipping_detail_form' onSubmit={shippingFormSubmit}>
                <header>
                    <p>Shipping detail</p>
                </header>
                <div className="shipping_detail_form_field">
                <div>
 <AiOutlineHome className='shipping_detail_form_icon'/>
                <input type="text" required placeholder='Address' value={address} onInput={(e)=>setAddress(e.target.value)}/>
                </div>
                <div>
 <FaCity className='shipping_detail_form_icon'/>
                <input type="text" required placeholder='City' value={city} onInput={(e)=>setCity(e.target.value)}/>
                </div>
                <div>
 <BiLocationPlus className='shipping_detail_form_icon'/>
                <input type="number" required placeholder='Pin Code' value={pinCode} onInput={(e)=>setPinCode(e.target.value)}/>
                </div>
                <div>
 <BiPhoneCall className='shipping_detail_form_icon'/>
                <input type="number" required placeholder='Phone Number' value={phNO} onInput={(e)=>setPhNo(e.target.value)}/>
                </div>
                <div>
 <FaGlobe className='shipping_detail_form_icon'/>
                <select name="Counrty" value={country} id="" onInput={setStateFn}>
                    <option value="0" >Select Country</option>
{Country.getAllCountries().map((e)=>{
    
    return <option key={e.isoCode}  value={e.isoCode}>{e.name}</option>
})}
                </select>
                </div>
              
            {State.getStatesOfCountry(country).length !==0 && <div >
 <AiOutlineHome className='shipping_detail_form_icon'/>
                <select name="state"  value={state}  id="" onInput={(e)=>setSate(e.target.value)} >
                <option  value=''>select state</option>
                {State.getStatesOfCountry(country).map((e,i)=>{
              
    return <option key={e.isoCode}  value={e.isoCode}>{e.name}</option>
})}
                </select>
                </div>}

                <div className='btn_box'>
                    <button>Continue</button>
                </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default ShippingDetail