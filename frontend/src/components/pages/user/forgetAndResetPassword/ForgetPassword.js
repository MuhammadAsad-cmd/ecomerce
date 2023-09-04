import React, { useEffect, useState } from 'react'
import {  AiOutlineMail } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { forgetpasswordAction } from '../../../redux/actions/userAction'
import { useAlert } from 'react-alert'
import { Navigate } from 'react-router-dom'
import MetaData from '../../../metaData'
import Loader from '../../../layout/loader/loader'
export let ForgetPassword=()=>{
let dispatch=useDispatch()
let {isAuthentic,loading}=useSelector((e)=>e.loadUserReducer);
let {error,sms,message,loading:loading2}=useSelector((s)=>s.forgetPasswordReducer)

    let [email,setEmail]=useState('aliwd5@gmail.com')
    let alert=useAlert();
    let updateFormField=(e)=>{
     setEmail(e.target.value)
    }
    let SubmitEmailFn=(e)=>{
        e.preventDefault();
  dispatch(forgetpasswordAction(email))
   }
    useEffect(()=>{
        if (error) alert.error(error)

        if (sms) alert.success(sms)  
        
    },[dispatch,sms,error,alert,message])
    return(
    <>
    <MetaData title={'forget password'}/>
        {isAuthentic && <Navigate to={'/products'}/>}
  {loading2 && <Loader/>}

   {loading===false && <form onSubmit={SubmitEmailFn} className='changePassPage' >
    
    
        <div className="changePassContainer" style={{minHeight:"300px"}}>
            <div className='chPass_header' style={{marginBottom:"10px"}}>
                <p>
                    Forget Password</p>
            </div>
            <div className='chPass_oldPass'>
                <AiOutlineMail className='userIcon' />
                <input type="email" name="email" onInput={updateFormField} value={email} placeholder='Enter your Email' />
            </div>
          
            <div className='chPass_btn'> <button>Sent Email</button></div>
        </div>
        </form>
}
        </>
    
    )
}